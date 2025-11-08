import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { Button } from "../../components/Button/Button";
import { AuthLayout } from "../../components/Auth/AuthLayout";
import { AuthCard } from "../../components/Auth/AuthCard";
import { FormSection } from "../../components/Auth/FormSection";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    if (!isModal) navigate("/");
  };

  // Se for modal, renderiza sem layout de tela cheia
  if (isModal) {
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-8"
      >
        <FormSection>
          <Input
            id="name"
            name="name"
            label="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            id="email"
            name="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            id="password"
            name="password"
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar senha"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Select
            id="branch"
            name="branch"
            label="Filial"
            value={formData.branch}
            onChange={handleChange}
            options={[
              { value: "Selecione", label: "..." },
              { value: "empilhatec", label: "Empilhatec" },
              { value: "empilhacom", label: "Empilhacom" },
            ]}
          />
          <Select
            id="role"
            name="role"
            label="Tipo de usuário"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: "Selecione", label: "..." },
              { value: "estoquista", label: "Estoquista" },
              { value: "gerente", label: "Gerente" },
            ]}
          />
        </FormSection>
        <Button text="Cadastrar" variant="primary" />
      </form>
    );
  }

  // Se for página normal
  return (
    <AuthLayout title="Sistema de Gestão" subtitle="Cadastre um novo usuário">
      <AuthCard title="Cadastro de Usuário">
        <form onSubmit={handleSubmit}>
          <FormSection>
            <Input
              id="name"
              name="name"
              label="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              id="email"
              name="email"
              label="E-mail"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              id="password"
              name="password"
              label="Senha"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar senha"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Select
              id="branch"
              name="branch"
              label="Filial"
              value={formData.branch}
              onChange={handleChange}
              options={[
                { value: "Selecione", label: "..." },
                { value: "empilhatec", label: "Empilhatec" },
                { value: "empilhacom", label: "Empilhacom" },
              ]}
            />
            <Select
              id="role"
              name="role"
              label="Tipo de usuário"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: "Selecione", label: "..." },
                { value: "estoquista", label: "Estoquista" },
                { value: "gerente", label: "Gerente" },
              ]}
            />
          </FormSection>

          <Button text="Cadastrar" variant="primary" />
          <p className="text-center text-sm text-gray-500 mt-4">
            Já tem conta?{" "}
            <a href="/" className="text-blue-600 hover:underline font-medium">
              Fazer login
            </a>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
