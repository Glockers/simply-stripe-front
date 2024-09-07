import { cookies } from "next/headers";
import { PlanPage } from "./plan";
import { server } from "@/utils/axios";

export default async function Plan() {
  const prices = (await server.get("/subscription/plans")).data;

  return <PlanPage prices={prices} />;
}
