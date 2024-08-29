"use client";
import { server } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Plan = {
  id: string;
};

type Props = {
  prices: Plan[];
};

export function PlanPage({ prices }: Props) {
  const router = useRouter();
  const [errMessage, setErrMessage] = useState("");

  const createSubscription = async (priceId: string) => {
    const currentPath = window.location.pathname;

    if (!priceId) {
      return setErrMessage("Никаких планов нет");
    }

    try {
      const { subscriptionId, clientSecret } = await server
        .post("/subscription", {
          priceId,
        })
        .then((r) => r.data);

      router.push(
        `/subscribe?from=${encodeURIComponent(
          currentPath
        )}&subscriptionId=${subscriptionId}&clientSecret=${clientSecret}`
      );
    } catch (err: any) {
      console.log(err);
      setErrMessage("Возникла непредвиденная ошибка");
    }
  };

  return (
    <div>
      <h1>Выберите план</h1>

      <p>{errMessage ?? ""}</p>
      <div className="flex gap-20">
        {prices.map(({ id }) => {
          return (
            <div key={id}>
              id: {id}
              <br />
              <button
                className="bg-slate-400 rounded-lg p-3"
                onClick={() => createSubscription(id)}
              >
                Подписаться
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
