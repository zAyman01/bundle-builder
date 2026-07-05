import { useBundleState } from "./hooks/useBundleState";
import { StepAccordion } from "./components/StepAccordion";
import { ReviewPanel } from "./components/ReviewPanel";

function App() {
  const state = useBundleState();

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 py-10 lg:py-12.25 flex flex-col lg:flex-row gap-8 lg:gap-7.25 items-start">
        <div className="flex flex-col gap-3.25 w-full lg:flex-1 min-w-0">
          <h1 className="lg:hidden text-[#1f1f1f] text-3xl font-extrabold tracking-normal leading-tight mb-1">
            Let&apos;s get started!
          </h1>
          {state.steps.map((step) => (
            <StepAccordion
              key={step.id}
              step={step}
              totalSteps={state.steps.length}
              state={state}
            />
          ))}
        </div>

        <ReviewPanel state={state} />
      </div>
    </main>
  );
}

export default App;
