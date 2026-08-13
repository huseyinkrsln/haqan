"use client";

import { useState } from "react";
import Link from "next/link";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/context/CartContext";

export default function OdemePage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const { totalPrice } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
        <span>›</span>
        <Link href="/sepet" className="hover:text-gray-700">Sepet</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">Ödeme</span>
      </nav>

      <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Ödeme
      </h1>

      {/* Steps */}
      <div className="mb-10">
        <CheckoutSteps currentStep={currentStep} />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Form area */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <CheckoutForm
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>

        {/* Sticky summary on desktop */}
        <div className="lg:self-start lg:sticky lg:top-24">
          <CartSummary subtotal={totalPrice} showCheckoutButton={false} />
        </div>
      </div>
    </div>
  );
}
