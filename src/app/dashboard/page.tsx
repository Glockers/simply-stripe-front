import { server } from "@/utils/axios";
import { DashboardPage } from "./dashboard";

export default async function Dashboard() {
  const result = await server
    .get("/subscription/access")
    .then((e) => e.data)
    .catch((err) => {
      return [];
    });

  return <DashboardPage plans={result} />;
}
