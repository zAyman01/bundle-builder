export type Variant = {
  id: string;
  label: string;
  swatch: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  learnMore?: boolean;
  saveLabel?: string;
  originalPrice?: number;
  price: number;
  variants?: Variant[];
};

export type PlanOption = {
  id: string;
  name: string;
  brand: string;
  highlight: string;
  description: string;
  priceMonthly: number;
  originalPriceMonthly?: number;
};

export type StepId = "cameras" | "plan" | "sensors" | "protection";

export type Step = {
  id: StepId;
  stepNumber: number;
  title: string;
  reviewCategory?: "Cameras" | "Sensors" | "Accessories";
  products?: Product[];
  plans?: PlanOption[];
};
