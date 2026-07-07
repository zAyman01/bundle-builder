import { useState } from "react";
import type { BundleState } from "../hooks/useBundleState";
import { QuantityStepper } from "./QuantityStepper";
import { ShippingIcon, WyzeShield } from "./icons";

type Props = { state: BundleState };

const categoryLabel: Record<string, string> = {
  cameras: "CAMERAS",
  sensors: "SENSORS",
  protection: "ACCESSORIES",
};

export const ReviewPanel = ({ state }: Props) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [saving, setSaving] = useState(false);
  const { reviewLines, sensorsSelected, selectedPlan, senseHub, grandTotal, savings, financingMonthly } =
    state;
  const hasItems =
    reviewLines.some(({ lines }) => lines.length > 0) ||
    (selectedPlan?.priceMonthly ?? 0) > 0;

  return (
    <aside
      className="flex flex-col gap-1.25 w-full xl:w-95 shrink-0 bg-[#edf4ff] rounded-[10px] pt-3.75 xl:sticky xl:top-6 xl:self-start"
      aria-label="Your security system review"
    >
      <div className="px-3.75">
        <div className="text-[#484848] text-xs tracking-[1.6px] leading-3">REVIEW</div>
      </div>

      <div className="flex flex-col gap-2.5 pt-5 pb-8 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-x-6 gap-y-2.5">
            <div className="flex flex-col gap-2.5 min-w-0">
              <header className="flex flex-col gap-1.25">
                <h2 className="text-[#1f1f1f] text-[22px] font-medium tracking-[0.6px] leading-5.5">
                  Your security system
                </h2>
                <p className="text-[#1f1f1fbf] text-[14px] tracking-[0.6px] leading-4 font-normal">
                  Review your personalized protection system designed to keep what matters most safe.
                </p>
              </header>

              {!hasItems ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <p className="text-[#1f1f1fbf] text-sm leading-5">
                    No items selected yet. Start by choosing your cameras above.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
              {reviewLines
                .filter(({ lines }) => lines.length > 0)
                .map(({ step, lines }) => (
                  <div key={step.id} className="flex flex-col gap-2 pt-3.75 border-t border-[#A8B2BD]">
                    <div className="text-[#A8B2BD] text-xs tracking-[0.36px] leading-4">
                      {categoryLabel[step.id]}
                    </div>
                    <div className="flex flex-col gap-3">
                      {lines.map((line) => (
                        <div key={line.key} className="flex items-center gap-4 w-full">
                            <div className="w-10.25 h-10.25 rounded-[5px] shrink-0 overflow-hidden bg-white">
                              <img
                                src={line.image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 text-[#0B0D10] text-[14px] tracking-[0.07px] leading-4 font-normal">
                              {line.name}
                            </div>
                            <QuantityStepper
                              qty={line.qty}
                              onIncrement={() => state.bumpLine(line.productId, line.variantId, 1)}
                              onDecrement={() => state.bumpLine(line.productId, line.variantId, -1)}
                              label={line.name}
                              size="review"
                            />
                          <div className="flex flex-col items-end shrink-0">
                            {line.unitOriginalPrice && (
                              <div className="text-[#6F7882] text-sm text-right tracking-[0.07px] leading-4 line-through">
                                ${(line.unitOriginalPrice * line.qty).toFixed(2)}
                              </div>
                            )}
                            <div className="text-[#4E2FD2] text-sm text-right tracking-[0.07px] leading-4 font-semibold">
                              ${(line.unitPrice * line.qty).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}

                      {step.id === "sensors" && sensorsSelected && (
                        <div className="flex items-center gap-4 w-full">
                            <div className="w-10.25 h-10.25 rounded-[5px] shrink-0 overflow-hidden bg-white">
                              <img
                                src={senseHub.image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 text-[#0B0D10] text-[14px] tracking-[0.07px] leading-4 font-normal">
                              {senseHub.name}
                            </div>
                            <QuantityStepper
                              qty={1}
                              min={1}
                              disabled
                              onIncrement={() => {}}
                              onDecrement={() => {}}
                              label={senseHub.name}
                              size="review"
                            />
                          <div className="flex flex-col items-end shrink-0">
                            <div className="text-[#767676] text-sm text-right leading-4 line-through">
                              ${senseHub.originalPrice.toFixed(2)}
                            </div>
                            <div className="text-[#4e2fd2] text-sm text-right leading-4 font-semibold">
                              FREE
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {selectedPlan && (
                <div className="flex flex-col gap-2 pt-3.75 border-t border-[#A8B2BD]">
                  <div className="text-[#A8B2BD] text-xs tracking-[0.36px] leading-4">PLAN</div>
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-2">
                      {selectedPlan.id === "cam-unlimited" && <WyzeShield className="w-8 h-8 shrink-0" />}
                      <div className="text-base leading-4 tracking-[-0.03px]">
                        <span className="text-black font-bold">{selectedPlan.brand} </span>
                        <span className="text-[#4e2fd2] font-bold">{selectedPlan.highlight}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {selectedPlan.originalPriceMonthly && (
                        <div className="text-[#767676] text-sm text-right leading-4 line-through">
                          ${selectedPlan.originalPriceMonthly.toFixed(2)}/mo
                        </div>
                      )}
                      <div className="text-[#4e2fd2] text-sm text-right leading-4 font-semibold">
                        {selectedPlan.priceMonthly > 0
                          ? `$${selectedPlan.priceMonthly.toFixed(2)}/mo`
                          : "Free"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 pt-3.75 border-t border-[#ced6de]">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10.25 h-10.25 rounded-[5px] bg-white flex items-center justify-center shrink-0">
                    <ShippingIcon className="w-7.25 h-7.25" />
                  </div>
                  <div className="flex-1 text-[#1f1f1f] text-sm leading-4">Fast Shipping</div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <div className="text-[#767676] text-sm text-right leading-4 line-through">$5.99</div>
                  <div className="text-[#4e2fd2] text-sm text-right leading-4 font-semibold">FREE</div>
                </div>
              </div>
              </div>
              )} {/* end hasItems ternary */}
            </div>

          <div className="flex flex-col gap-3 pt-2 md:pt-0 xl:pt-2">
            <div className="flex items-center gap-3">
              <img src="/wyze-guarantee.png" alt="wyze guarantee image" className="w-20 h-20 md:w-30 md:h-30 lg:w-20 lg:h-20 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[#1f1f1f] text-[18px] font-medium leading-4 mb-4 tracking-[0.6px]">
                  30-day hassle-free returns
                </span>
                <p className="text-[#1f1f1fbf] text-[14px] font-normal leading-4">
                  If you&apos;re not totally in love with the product, we will refund you 100%.
                </p>
              </div>
            </div>

            {hasItems && (
              <>
                <div className="flex items-center justify-between w-full pt-3 border-t border-[#ced6de]">
                  <div className="inline-flex items-center px-2 py-1.25 bg-[#4e2fd2] rounded-[3px]">
                    <span className="text-white text-[10px] tracking-[-0.6px]">
                      as low as ${financingMonthly.toFixed(2)}/mo
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[#767676] text-lg text-center tracking-[0.04px] leading-5 line-through">
                      ${grandTotal.original.toFixed(2)}
                    </span>
                    <span className="text-[#4e2fd2] text-2xl font-bold tracking-[-0.03px] leading-8">
                      ${grandTotal.current.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  {savings > 0 && (
                    <p className="text-[#0AA288] text-xs text-center font-semibold tracking-[-0.06px] leading-3">
                      Congrats! You&apos;re saving ${savings.toFixed(2)} on your security bundle!
                    </p>
                  )}
                    <button
                    type="button"
                    onClick={() => {
                      setCheckingOut(true);
                      setTimeout(() => {
                        setCheckingOut(false);
                        setCheckedOut(true);
                      }, 1500);
                      setTimeout(() => {
                        setCheckedOut(false);
                        state.resetAll();
                      }, 4500);
                    }}
                    disabled={checkingOut || checkedOut}
                    className="flex items-center justify-center gap-2 px-4 py-3.25 w-full bg-[#4e2fd2] rounded text-white text-[17px] font-bold cursor-pointer transition-colors hover:bg-[#3d23a8] disabled:opacity-60 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {checkingOut ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : checkedOut ? (
                      "Thanks for your order!"
                    ) : (
                      "Checkout"
                    )}
                  </button>
                </div>
              </>
            )}

            <button
              type="button"
              onClick={() => {
                setSaving(true);
                state.saveForLater();
                setTimeout(() => setSaving(false), 1500);
              }}
              disabled={saving}
              className="w-full text-center text-[#484848] text-sm italic tracking-[-0.02px] leading-[16.8px] underline cursor-pointer transition-colors hover:text-[#4e2fd2] disabled:opacity-60 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e2fd2]"
            >
              {saving ? "Saving..." : state.justSaved ? "Saved! Come back anytime." : "Save my system for later"}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
