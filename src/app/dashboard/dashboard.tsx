"use strict";

type Props = {
  plans: Array<{
    id: string;
    customerId: string;
    priceId: string;
    startDate: Date;
    endDate: Date;
  }>;
};

export function DashboardPage({ plans }: Props) {
  return (
    <div>
      {plans.length !== 0 ? (
        plans.map((plan) => (
          <div key={plan.id}>
            <p>name: {plan.priceId}</p>
            <p>start date: {new Date(plan.startDate).toLocaleDateString()}</p>
            <p>end date: {new Date(plan.endDate).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>У вас нет доступа к одному из плану</p>
      )}
    </div>
  );
}
