import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação simples de autenticação
    if (email === "admin@empresa.com" && password === "123456") {
      navigate("/dashboard");
    } else {
      alert("E-mail ou senha incorretos!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Lado esquerdo - cinza claro */}
      <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-700 text-center px-8">
          Bem-vindo ao Sistema de Gestão
        </h1>
      </div>

      {/* Lado direito - formulário */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded-lg p-8 w-11/12 max-w-sm border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Acesso ao Sistema
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Não tem uma conta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
