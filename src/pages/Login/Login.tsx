import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui futuramente chamaremos a API de autenticação
    if (email && password) {
      console.log("Login efetuado com:", email);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo (cinza escuro) */}
      <div className="hidden md:flex w-1/2 bg-gray-800 items-center justify-center text-gray-200">
        <h1 className="text-3xl font-bold">Sistema de Estoque</h1>
      </div>

      {/* Lado direito (formulário) */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-11/12 max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            Login
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 mb-1"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
