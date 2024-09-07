"use client";
import { Button } from "@/components/Button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  clientSecret: string | null;
};

const CheckoutForm = ({ clientSecret }: Props) => {
  const [name, setName] = useState("Maxim");
  const [messages, _setMessages] = useState("");

  const elements = useElements();
  const stripe = useStripe();
  const router = useRouter();

  const setMessage = (message: string) => {
    _setMessages(`${messages}\n\n${message}`);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return "";
    }

    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement as any,
        billing_details: {
          name: name,
        },
      },
    });

    if (error) {
      if (error?.message) setMessage(error.message);
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Заполните данные банковской карты
      </h1>

      <p className="mb-6 text-gray-600">
        The successful test card:{" "}
        <span className="font-semibold">4242424242424242</span>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-lg font-medium">
          Full name
          <input
            type="text"
            id="name"
            className="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <div className="w-[400px] mt-6">
          <CardElement
            className="p-3 border border-gray-300 rounded-md shadow-sm"
            options={{
              style: {
                base: {
                  color: "black",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },

                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
            }}
          />
        </div>

        <Button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Подписаться
        </Button>

        <div>{messages}</div>
      </form>
    </>
  );
};

export default CheckoutForm;
