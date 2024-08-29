import React from "react";
import App from "./App";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<>Loading...</>}>
        <App />
      </Suspense>
    </main>
  );
}
