"use client";

import { server } from "@/utils/axios";
import { useEffect, useState } from "react";

type Plans = Array<{
  id: string;
  customerId: string;
  priceId: string;
  startDate: Date;
  endDate: Date;
}>;

export function DashboardPage() {
  const [plans, setPlans] = useState<Plans>([]);

  useEffect(() => {
    server
      .get("/subscription/access")
      .then((e) => {
        setPlans(e.data);
      })
      .catch(() => setPlans([]));
  }, []);

  return (
    <div>
      {plans.length !== 0 ? (
        plans.map(({ startDate, priceId, id, endDate }) => (
          <div key={id}>
            <p>name: {priceId}</p>
            <p>start date: {new Date(startDate).toLocaleDateString()}</p>
            <p>end date: {new Date(endDate).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>У вас нет доступа к одному из плану</p>
      )}
    </div>
  );
}
