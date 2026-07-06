import type { ReactElement } from "react";
import type { Step, StepId } from "../types";
import type { BundleState } from "../hooks/useBundleState";
import { ProductCard } from "./ProductCard";
import {
  CameraIcon,
  ChevronDown,
  ChevronUp,
  PlanIcon,
  ProtectionIcon,
  SensorIcon,
  WyzeShield,
} from "./icons";

const stepIcon: Record<StepId, (className?: string) => ReactElement> = {
  cameras: (c) => <CameraIcon className={c} />,
  plan: (c) => <PlanIcon className={c} />,
  sensors: (c) => <SensorIcon className={c} />,
  protection: (c) => <ProtectionIcon className={c} />,
};

const nextLabel: Record<StepId, string | null> = {
  cameras: "Next: Choose your plan",
  plan: "Next: Choose your sensors",
  sensors: "Next: Add extra protection",
  protection: null,
};

type Props = {
  step: Step;
  totalSteps: number;
  state: BundleState;
};

export const StepAccordion = ({ step, totalSteps, state }: Props) => {
  const isOpen = state.openStep === step.id;
  const count = state.selectedCountForStep(step.id);
  const panelId = `panel-${step.id}`;

  return (
    <div
      className={`flex flex-col gap-1.25 w-full ${
        isOpen ? "bg-[#edf4ff] rounded-[10px] pt-3.75" : ""
      }`}
    >
      <div className="px-3.75">
        <div className="text-[#484848] text-[12px] sm:text-xs tracking-[1.6px] leading-3">
          STEP {step.stepNumber} OF {totalSteps}
        </div>
      </div>

      <button
        type="button"
        onClick={() => state.toggleStep(step.id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`flex items-center gap-2 px-3.75 py-5 w-full text-left cursor-pointer transition-colors ${
          isOpen ? "border-t-[0.5px]" : "border-t-[0.5px] border-b-[0.5px]"
        } border-[#1f1f1f] hover:bg-[#edf4ff]/50`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {stepIcon[step.id]("w-[26px] h-[26px] shrink-0")}
          <h2 className="flex-1 text-[#0B0D10] text-lg sm:text-[22px] font-medium tracking-normal leading-5.5 truncate">
            {step.title}
          </h2>
        </div>
        <span className="flex items-center gap-1 shrink-0">
          {isOpen ? (
            <>
              <span className="text-[#4e2fd2] text-sm leading-4 font-normal">{count} selected</span>
              <ChevronUp />
            </>
          ) : (
            <ChevronDown />
          )}
        </span>
      </button>

      {isOpen && (
        <div id={panelId} className="flex flex-col gap-3.75 px-3.75 pb-5">
          {step.products && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.75">
              {step.products.map((product, i) => {
                const activeVariantId = state.getActiveVariantId(product.id);
                const qty = state.getVariantQty(product.id, activeVariantId);
                const isTrailingLone =
                  i === step.products!.length - 1 && step.products!.length % 2 === 1;
                return (
                  <div
                    key={product.id}
                    className={isTrailingLone ? "md:col-span-2 md:flex md:justify-center" : "h-full"}
                  >
                    <ProductCard
                      product={product}
                      qty={qty}
                      activeVariantId={activeVariantId}
                      onSelectVariant={(variantId) => state.selectVariant(product.id, variantId)}
                      onIncrement={() => state.bumpActive(product.id, 1)}
                      onDecrement={() => state.bumpActive(product.id, -1)}
                      wide={isTrailingLone}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {step.plans && (
            <div className="flex flex-col sm:flex-row gap-3.75">
              {step.plans.map((plan) => {
                const isSelected = state.planId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => state.setPlanId(plan.id)}
                    aria-pressed={isSelected}
                    className={`flex-1 text-left p-4 rounded-[10px] bg-white border-2 cursor-pointer transition-colors ${
                      isSelected ? "border-[#4e2fd2b2]" : "border-transparent hover:border-[#4e2fd2]/30"
                    }`}
                  >
                      {plan.id === "cam-unlimited" && <WyzeShield className="w-10 h-10 shrink-0" />}
                      <div className="text-[#1f1f1f] text-base font-bold">{plan.name}</div>
                    <p className="text-[#1f1f1fbf] text-xs mt-1">{plan.description}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      {plan.originalPriceMonthly && (
                        <span className="text-[#767676] text-sm line-through">
                          ${plan.originalPriceMonthly.toFixed(2)}/mo
                        </span>
                      )}
                      <span className="text-[#4e2fd2] text-sm font-semibold">
                        {plan.priceMonthly > 0 ? `$${plan.priceMonthly.toFixed(2)}/mo` : "Free"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {nextLabel[step.id] && (
            <button
              type="button"
              onClick={() => state.goToNextStep(step.id)}
              className="self-center inline-flex h-9.75 items-center justify-center px-6 rounded-[7px] border border-[#4e2fd2] cursor-pointer transition-colors hover:bg-[#4e2fd2]/10"
            >
              <span className="text-[#4e2fd2] text-base sm:text-lg font-semibold leading-6">
                {nextLabel[step.id]}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
