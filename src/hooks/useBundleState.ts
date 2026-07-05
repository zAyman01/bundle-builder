import { useCallback, useEffect, useMemo, useState } from "react";
import {
  seedActiveVariant,
  seedPlanId,
  seedQuantities,
  senseHub,
  steps,
} from "../data/bundle";
import type { StepId } from "../types";

const STORAGE_KEY = "bundle-builder:saved-system-v1";

type SavedSystem = {
  quantities: Record<string, number>;
  activeVariant: Record<string, string>;
  planId: string;
  savedAt: string;
};

type LineKey = string;

function lineKey(productId: string, variantId?: string): LineKey {
  return `${productId}:${variantId ?? "default"}`;
}

export function useBundleState() {
  const [quantities, setQuantities] = useState<Record<string, number>>(seedQuantities);
  const [activeVariant, setActiveVariant] = useState<Record<string, string>>(seedActiveVariant);
  const [planId, setPlanId] = useState<string>(seedPlanId);
  const [openStep, setOpenStep] = useState<StepId | null>("cameras");
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as SavedSystem;
      setQuantities(saved.quantities ?? seedQuantities);
      setActiveVariant(saved.activeVariant ?? seedActiveVariant);
      setPlanId(saved.planId ?? seedPlanId);
    } catch {
    }
  }, []);

  const allProducts = useMemo(
    () => steps.flatMap((s) => s.products ?? []),
    [],
  );

  const getProductById = useCallback(
    (productId: string) => allProducts.find((p) => p.id === productId),
    [allProducts],
  );

  const getVariantQty = useCallback(
    (productId: string, variantId?: string) => quantities[lineKey(productId, variantId)] ?? 0,
    [quantities],
  );

  const getProductQty = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      if (!product) return 0;
      if (!product.variants) return getVariantQty(productId);
      return product.variants.reduce(
        (sum, v) => sum + getVariantQty(productId, v.id),
        0,
      );
    },
    [getProductById, getVariantQty],
  );

  const selectVariant = useCallback((productId: string, variantId: string) => {
    setActiveVariant((prev) => ({ ...prev, [productId]: variantId }));
  }, []);

  const getActiveVariantId = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      if (!product?.variants) return undefined;
      return activeVariant[productId] ?? product.variants[0].id;
    },
    [activeVariant, getProductById],
  );

  const setQty = useCallback(
    (productId: string, variantId: string | undefined, qty: number) => {
      setQuantities((prev) => ({
        ...prev,
        [lineKey(productId, variantId)]: Math.max(0, qty),
      }));
    },
    [],
  );

  const bumpActive = useCallback(
    (productId: string, delta: number) => {
      const variantId = getActiveVariantId(productId);
      const current = getVariantQty(productId, variantId);
      setQty(productId, variantId, current + delta);
    },
    [getActiveVariantId, getVariantQty, setQty],
  );

  const bumpLine = useCallback(
    (productId: string, variantId: string | undefined, delta: number) => {
      const current = getVariantQty(productId, variantId);
      setQty(productId, variantId, current + delta);
    },
    [getVariantQty, setQty],
  );

  const selectedCountForStep = useCallback(
    (stepId: StepId) => {
      const step = steps.find((s) => s.id === stepId);
      if (step?.plans) return 1;
      if (!step?.products) return 0;
      return step.products.filter((p) => getProductQty(p.id) > 0).length;
    },
    [getProductQty],
  );

  const toggleStep = useCallback((stepId: StepId) => {
    setOpenStep((prev) => (prev === stepId ? null : stepId));
  }, []);

  const goToNextStep = useCallback((currentId: StepId) => {
    const idx = steps.findIndex((s) => s.id === currentId);
    const next = steps[idx + 1];
    if (next) setOpenStep(next.id);
  }, []);

  const selectedPlan = useMemo(
    () => steps.find((s) => s.id === "plan")?.plans?.find((p) => p.id === planId),
    [planId],
  );



  const reviewLines = useMemo(() => {
    return steps
      .filter((s) => s.products)
      .map((step) => {
        const lines = (step.products ?? []).flatMap((product) => {
          if (!product.variants) {
            const qty = getVariantQty(product.id);
            if (qty <= 0) return [];
            return [
              {
                key: lineKey(product.id),
                productId: product.id,
                variantId: undefined as string | undefined,
                name: product.name,
                image: product.image,
                qty,
                unitPrice: product.price,
                unitOriginalPrice: product.originalPrice,
              },
            ];
          }
          return product.variants
            .map((v) => {
              const qty = getVariantQty(product.id, v.id);
              if (qty <= 0) return null;
              return {
                key: lineKey(product.id, v.id),
                productId: product.id,
                variantId: v.id,
                name: `${product.name} (${v.label})`,
                image: product.image,
                qty,
                unitPrice: product.price,
                unitOriginalPrice: product.originalPrice,
              };
            })
            .filter((x): x is NonNullable<typeof x> => x !== null);
        });
        return { step, lines };
      });
  }, [getVariantQty]);

  const sensorsSelected = useMemo(
    () => (reviewLines.find((r) => r.step.id === "sensors")?.lines.length ?? 0) > 0,
    [reviewLines],
  );

  const oneTimeTotal = useMemo(() => {
    let current = 0;
    let original = 0;
    for (const { lines } of reviewLines) {
      for (const line of lines) {
        current += line.unitPrice * line.qty;
        original += (line.unitOriginalPrice ?? line.unitPrice) * line.qty;
      }
    }
    if (sensorsSelected) {
      original += senseHub.originalPrice;
    }
    return { current, original };
  }, [reviewLines, sensorsSelected]);

  const planMonthly = selectedPlan?.priceMonthly ?? 0;
  const planMonthlyOriginal = selectedPlan?.originalPriceMonthly ?? planMonthly;

  const grandTotal = {
    current: oneTimeTotal.current + planMonthly,
    original: oneTimeTotal.original + planMonthlyOriginal,
  };
  const savings = Math.max(0, grandTotal.original - grandTotal.current);
  const financingMonthly = grandTotal.current / 12;



  const saveForLater = useCallback(() => {
    const payload: SavedSystem = {
      quantities,
      activeVariant,
      planId,
      savedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setJustSaved(true);
      window.setTimeout(() => setJustSaved(false), 2500);
    } catch {
    }
  }, [activeVariant, planId, quantities]);

  return {
    steps,
    openStep,
    toggleStep,
    goToNextStep,
    selectedCountForStep,
    getProductQty,
    getVariantQty,
    getActiveVariantId,
    selectVariant,
    bumpActive,
    bumpLine,
    planId,
    setPlanId,
    selectedPlan,
    reviewLines,
    sensorsSelected,
    grandTotal,
    savings,
    financingMonthly,
    saveForLater,
    justSaved,
  };
}

export type BundleState = ReturnType<typeof useBundleState>;
