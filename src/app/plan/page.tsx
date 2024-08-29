import { PlanPage } from "./plan";
import { server } from "@/utils/axios";

export default async function Plan() {
  const prices = await (await server.get("/subscription/plans")).data;

  return <PlanPage prices={prices.data} />;
}
