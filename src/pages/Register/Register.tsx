import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { Button } from "../../components/Button/Button";
import { AuthLayout } from "../../components/Auth/AuthLayout";
import { AuthCard } from "../../components/Auth/AuthCard";
import { FormSection } from "../../components/Auth/FormSection";
import { createUser } from "../../services/userService";
import { createAccess } from "../../services/accessService";

interface RegisterProps {
  isModal?: boolean;
  onSave?: () => void; // callback para atualizar lista de usuários
}

export function Register({ isModal = false, onSave }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    sector: "",
    role: "estoquista",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // Cria o usuário
      const createdUser = await createUser({
        name: formData.name,
        email: formData.email,
        sector: formData.sector,  // seu "branch" vira "sector"
        role: formData.role,
      });

      // Cria a credencial de acesso
      await createAccess({
        username: formData.email,
        password: formData.password, // backend fará hash
        userId: createdUser.id,
      });

      if (onSave) onSave(); // atualizar lista de usuários no modal
      if (!isModal) navigate("/users"); // se for página normal, vai para lista de usuários
    } catch (error) {
      console.error("Erro ao cadastrar usuário/credencial:", error);
      alert("Erro ao salvar dados!");
    }
  };

  const formContent = (
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
        id="sector"
        name="sector"
        label="Filial"
        value={formData.sector}
        onChange={handleChange}
        options={[
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
          { value: "estoquista", label: "Estoquista" },
          { value: "gerente", label: "Gerente" },
        ]}
      />
    </FormSection>
  );

  if (isModal) {
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-8"
      >
        {formContent}
        <Button text="Cadastrar" variant="primary" />
      </form>
    );
  }

  return (
    <AuthLayout title="Sistema de Gestão" subtitle="Cadastre um novo usuário">
      <AuthCard title="Cadastro de Usuário">
        <form onSubmit={handleSubmit}>
          {formContent}
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
