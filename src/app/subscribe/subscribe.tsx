"use client";
import getStripe from "@/utils/get-stripejs";
import CheckoutForm from "./form";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";

export function SubscribtionPage() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("clientSecret");

  return (
    <Elements stripe={getStripe()}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}
