"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { server } from "@/utils/axios";

export default function App() {
  const [email, setEmail] = useState("glockerswork@gmail.com");
  const navigate = useRouter();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      await server.post("/customer", {
        email,
      });

      navigate.push("/plan");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    try {
      await server.get("/customer", {
        params: {
          email,
        },
      });

      navigate.replace("/plan");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Вход в систему</h1>

      <form onSubmit={handleRegister}>
        <label>
          Email
          <input
            className="border border-indigo-500 rounded-md p-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <div className="flex gap-4">
          <button
            className="bg-slate-400 rounded-lg p-3"
            type="submit"
            onClick={handleRegister}
          >
            Регистрация
          </button>
          <button
            className="bg-slate-400 rounded-lg p-3"
            type="button"
            onClick={handleSignIn}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}
