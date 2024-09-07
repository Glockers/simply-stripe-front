"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { server } from "@/utils/axios";
import { Button } from "@/components/Button";

export default function App() {
  const [email, setEmail] = useState("glockerswork@gmail.com");
  const [message, setMessage] = useState("");
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
      setMessage("Ошибка регистрации в приложение");
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
      setMessage("Ошибка входа в приложение");
    }
  }

  return (
    <div>
      <h1>Вход в систему</h1>
      {message ? message : <></>}
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
          <Button type="submit" onClick={handleRegister}>
            Регистрация
          </Button>
          <Button type="button" onClick={handleSignIn}>
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
}
