'use client';

import {
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { toast } from '@/lib/toast';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          toast.success("Payment succeeded!")
          break;
        case "processing":
          toast.info("Your payment is processing.")
          break;
        case "requires_payment_method":
          toast.error("Your payment wasn't successful, please try again.")
          break;
        default:
          toast.error("Something went wrong.")
          break;
      }
    });
  }, [stripe]);

  const handleConfirm = async () => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      }
    });

    if (result.error) {
      console.error(result.error.message);
      toast.error(result.error.message || "An error occurred")
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      }
    });

    if (result.error) {
      console.error(result.error.message);
      toast.error(result.error.message || "An error occurred")
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Checkout</h2>

      <div className="mb-6" style={{ minHeight: '100px' }}>
        <ExpressCheckoutElement onConfirm={handleConfirm} />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center mb-4">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase mb-6">
          <span className="bg-card px-2 text-muted-foreground">Or pay with card</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement />

        <button
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isLoading ? "Processing..." : "Pay now"}
        </button>

        {/* Status shown via toast notifications */}
      </form>
    </div>
  );
};

export default CheckoutForm;
