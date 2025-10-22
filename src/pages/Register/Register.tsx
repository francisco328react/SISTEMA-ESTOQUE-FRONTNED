import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("estoquista");
  const [branch, setBranch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const newUser = { name, email, password, role };
    console.log("Usuário cadastrado:", newUser);

    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Lado esquerdo */}
      <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center text-gray-700">
        <h1 className="text-3xl font-bold text-center px-8">
          Crie sua conta e gerencie o sistema
        </h1>
      </div>

      {/* Lado direito */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 w-11/12 max-w-sm border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Cadastro de Usuário
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="branch" className="block text-gray-700 mb-1">
              Filial
            </label>
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="empilhatec">Empilhatec</option>
              <option value="empilhacom">Empilhacom</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 mb-1">
              Tipo de Usuário
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="estoquista">Estoquista</option>
              <option value="gerente">Gerente</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Cadastrar
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Já tem conta?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Fazer login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
