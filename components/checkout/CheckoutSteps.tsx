interface CheckoutStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: "Adres" },
  { number: 2, label: "Teslimat" },
  { number: 3, label: "Ödeme" },
];

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, index) => {
        const isDone = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isDone
                    ? "bg-[#4A5D3E] text-white"
                    : isActive
                    ? "bg-[#4A5D3E] text-white ring-4 ring-[#4A5D3E]/20"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isDone ? "✓" : step.number}
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-[#4A5D3E]" : isDone ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 md:w-24 h-0.5 mb-4 mx-2 transition-all ${
                  isDone ? "bg-[#4A5D3E]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
