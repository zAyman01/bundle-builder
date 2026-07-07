import { Minus, Plus } from "./icons";

type Props = {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  disabled?: boolean;
  size?: "card" | "review";
  label: string;
};

export const QuantityStepper = ({
  qty,
  onIncrement,
  onDecrement,
  min = 0,
  disabled = false,
  size = "card",
  label,
}: Props) => {
  const atMin = qty <= min;
  const isCard = size === "card";

  return (
    <div
      className={`flex items-center ${isCard ? "w-20 gap-0 py-1" : "w-18 gap-0 py-1"} justify-between`}
    >
      <button
        type="button"
        aria-label={`Decrease quantity of ${label}`}
        onClick={onDecrement}
        disabled={disabled || atMin}
        className={
          isCard
            ? `flex w-6 h-6 items-center justify-center rounded border-2 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e2fd2] ${
                atMin ? "bg-[#f0f4f7] border-transparent" : "bg-white border-[#ced6de] hover:bg-gray-100"
              } disabled:cursor-not-allowed`
            : `flex w-6 h-6 items-center justify-center rounded cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e2fd2] ${
                disabled ? "bg-[#f1f1f2] border border-[#ced6de]" : "bg-white hover:bg-gray-100"
              } disabled:cursor-not-allowed`
        }
      >
        <Minus className="w-2.5 h-2.5" color={disabled ? "#575757" : "#575757"} />
      </button>

      <div
        aria-live="polite"
        className="w-7 text-center font-normal text-[#0B0D10] text-base tabular-nums"
      >
        {qty}
      </div>

      <button
        type="button"
        aria-label={`Increase quantity of ${label}`}
        onClick={onIncrement}
        disabled={disabled}
        className={`flex w-6 h-6 items-center justify-center rounded cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e2fd2] ${
          disabled
            ? "bg-[#f1f1f2] border border-[#ced6de]"
            : isCard
              ? qty > 0
                ? "bg-[#e3e8ee] hover:bg-[#d0d7e0]"
                : "bg-[#f0f4f7] hover:bg-[#e3e8ee]"
              : "bg-white hover:bg-gray-100"
        } disabled:cursor-not-allowed`}
      >
        <Plus className="w-2.5 h-2.5" color="#525963" />
      </button>
    </div>
  );
};
