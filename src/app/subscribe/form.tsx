"use client";
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
      <h1>Заполните данные банковской карты</h1>

      <p>
        The successful test card: <span>4242424242424242</span>.
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <div className="w-[600px] mt-10">
          <CardElement
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

        <button>Подписаться</button>

        <div>{messages}</div>
      </form>
    </>
  );
};

export default CheckoutForm;
