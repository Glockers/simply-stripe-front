"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: Props) {
  return (
    <button className="bg-slate-400 rounded-lg p-3" {...props}>
      {children}
    </button>
  );
}
