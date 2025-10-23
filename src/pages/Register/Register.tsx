import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { Button } from "../../components/Button/Button";

import type { User } from "../../types/User/User";

interface RegisterProps {
  isModal?: boolean;
  onSave?: (user: User) => void;
}

export function Register({ isModal = false, onSave }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    branch: "",
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

    const newUser: User = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      branch: formData.branch,
      role: formData.role as "gerente" | "estoquista",
      createdAt: new Date().toISOString(),
      image: `https://ui-avatars.com/api/?name=${formData.name}`,
    };

    if (onSave) onSave(newUser);

    console.log("Usuário cadastrado:", newUser);

    if (!isModal) navigate("/");
  };

  return (
    <div className={`${isModal ? "" : "flex items-center justify-center h-screen bg-gray-50"}`}>
      <div className={`flex ${isModal ? "" : "w-full md:w-1/2 items-center justify-center p-6"}`}>
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-8"
        >

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
              id="branch"
              label="Filial"
              value={formData.branch}
              onChange={handleChange}
              options={[
                { value: "empilhatec", label: "Empilhatec" },
                { value: "empilhacom", label: "Empilhacom" },
              ]}
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

          {!isModal && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Já tem conta?{" "}
              <a href="/" className="text-blue-600 hover:underline font-medium">
                Fazer login
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
