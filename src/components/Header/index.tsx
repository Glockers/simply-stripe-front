"use client";

export function Header() {
  return (
    <header className="bg-blue-600 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Simple app</div>
        <div className="flex space-x-4">
          <a href="/" className="text-white hover:text-gray-200">
            Home
          </a>
          <a href="/dashboard" className="text-white hover:text-gray-200">
            Dashboard
          </a>
          <a href="/plan" className="text-white hover:text-gray-200">
            Plans
          </a>
        </div>
      </nav>
    </header>
  );
}
