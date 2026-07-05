import type { Product } from "../types";
import { QuantityStepper } from "./QuantityStepper";

type Props = {
  product: Product;
  qty: number; // active variant's quantity
  activeVariantId?: string;
  onSelectVariant: (variantId: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  /** The lone trailing card in an odd-count row (e.g. Battery Cam Pro) — fixed ~360px, not stretched. */
  wide?: boolean;
};

export const ProductCard = ({
  product,
  qty,
  activeVariantId,
  onSelectVariant,
  onIncrement,
  onDecrement,
  wide = false,
}: Props) => {
  const selected = qty > 0;

  return (
    <article
      className={`flex flex-col sm:flex-row gap-3 sm:gap-4.75 p-2.75 relative bg-white rounded-[10px] overflow-hidden border-2 h-full sm:items-center ${
        wide ? "w-full md:max-w-90" : "flex-1 min-w-65"
      } ${selected ? "border-[#4e2fd2b2]" : "border-transparent"}`}
    >
      <div className="flex items-center justify-center w-full h-28 sm:w-25 sm:h-32.5 rounded-[5px] shrink-0 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      {product.saveLabel && (
        <span className="absolute top-2 left-2 z-10 flex items-center justify-center px-2 py-1 bg-[#4e2fd2] rounded-[10px]">
          <span className="text-white text-[10px] font-medium leading-none">
            {product.saveLabel}
          </span>
        </span>
      )}

      <div className="flex flex-col items-start gap-2.5 flex-1 min-w-0">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <h3 className="text-[#1f1f1f] text-base font-semibold tracking-[0.6px] leading-4">
            {product.name}
          </h3>
          <p className="text-xs leading-[15.6px] tracking-[0.6px]">
            <span className="text-[#1f1f1fbf]">{product.description} </span>
            {product.learnMore && (
              <a href="#" className="text-[#0000ee] underline hover:text-[#4e2fd2] transition-colors" onClick={(e) => e.preventDefault()}>
                Learn More
              </a>
            )}
          </p>

          {product.variants && (
            <div className="flex items-center gap-1">
              {product.variants.map((v) => {
                const isSelected = activeVariantId === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => onSelectVariant(v.id)}
                    aria-pressed={isSelected}
                    aria-label={`${product.name} ${v.label}`}
                    className={`flex h-7 items-center gap-1 px-1.5 rounded-sm border-[0.5px] cursor-pointer transition-colors ${
                      isSelected ? "bg-[#1df0bb0a] border-[#0aa288]" : "bg-white border-[#cccccc] hover:bg-gray-50 hover:border-[#999]"
                    }`}
                  >
                    <img
                      src={v.swatch}
                      alt=""
                      className="w-5 h-5 rounded-[3px] object-cover"
                    />
                    <span className="text-[#1f1f1f] text-[10px] tracking-[0.6px] leading-none whitespace-nowrap">
                      {v.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-3 self-stretch w-full mt-auto">
          <QuantityStepper
            qty={qty}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            label={product.name}
            size="card"
          />
          <div className="flex flex-col items-end gap-0.75 flex-1">
            {product.originalPrice && (
              <div className="text-[#d8392b] text-base text-right tracking-[0.6px] leading-4 line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
            <div className="text-[#575757] text-base text-right tracking-[0.6px] leading-4">
              ${product.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
