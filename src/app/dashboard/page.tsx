"use server";
import { cookies } from "next/headers";
import { DashboardPage } from "./dashboard";

export default async function Dashboard() {
  return <DashboardPage />;
}
