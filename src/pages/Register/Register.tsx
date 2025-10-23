import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { Button } from "../../components/Button/Button";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "estoquista",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log("Usuário cadastrado:", formData);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      
      {/* Lado direito */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Cadastro de Usuário
          </h2>

          {/* Campo genérico */}
          <div className="space-y-4">
            <Input
              id="name"
              label="Nome"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              id="email"
              label="E-mail"
              type="email"
              placeholder="seuemail@empresa.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              id="password"
              label="Senha"
              type="password"
              placeholder="Crie uma senha"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              id="confirmPassword"
              label="Confirmar senha"
              type="password"
              placeholder="Repita a senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <Select
              id="role"
              label="Tipo de usuário"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: "estoquista", label: "Estoquista" },
                { value: "gerente", label: "Gerente" },
              ]}
            />
          </div>

          <Button text="Cadastrar" />

          <p className="text-center text-sm text-gray-500 mt-4">
            Já tem conta?{" "}
            <a href="/" className="text-blue-600 hover:underline font-medium">
              Fazer login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}