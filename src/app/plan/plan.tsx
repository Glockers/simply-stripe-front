"use client";
import { Button } from "@/components/Button";
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
      const request = await server
        .post("/subscription", {
          priceId,
        })
        .then((r) => r.data);

      if (!request) {
        return setErrMessage("У вас уже есть подписка на это план");
      }

      router.push(
        `/subscribe?from=${encodeURIComponent(currentPath)}&clientSecret=${
          request.clientSecret
        }`
      );
    } catch (err) {
      console.log(err);
      setErrMessage("Возникла непредвиденная ошибка");
    }
  };

  return (
    <div>
      <h1 className="mb-10 text-center text-red-500 mt-10 text-4xl">
        Каталог планов
      </h1>

      <p>{errMessage ?? ""}</p>
      <div className="flex gap-20">
        {prices.map(({ id }) => {
          return (
            <div key={id}>
              id: {id}
              <br />
              <Button onClick={() => createSubscription(id)}>
                Подписаться
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
