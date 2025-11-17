import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import type { User } from "../../types/User/User";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    userData: {
      name: string;
      email: string;
      sector: string;
      role: string;
      image: string;
    };
    accessData: {
      username: string;
      password: string;
    };
  }) => void;
  initialData?: User;
}

export function UserModal({ isOpen, onClose, onSave, initialData }: UserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sector, setSector] = useState("");
  const [role, setRole] = useState("gerente");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Carrega dados ao abrir o modal
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setSector(initialData.sector);
      setRole(initialData.role);
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setSector("");
      setRole("gerente");
      setPassword("");
    }

    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "O nome é obrigatório.";
    if (!email.trim()) newErrors.email = "O e-mail é obrigatório.";
    if (!sector.trim()) newErrors.sector = "A filial é obrigatória.";
    if (!role.trim()) newErrors.role = "O tipo de usuário é obrigatório.";
    if (!initialData && !password.trim())
      newErrors.password = "A senha é obrigatória ao cadastrar.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

    const dataToSend = {
      userData: {
        name,
        email,
        sector,
        role,
        image: imageUrl,
      },
      accessData: {
        username: email,
        password,
      },
    };

    onSave(dataToSend);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {initialData ? "Editar Usuário" : "Novo Usuário"}
        </h2>

        <div className="space-y-4">
          <FormField label="Nome" error={errors.name}>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome"
            />
          </FormField>

          <FormField label="E-mail" error={errors.email}>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o e-mail"
            />
          </FormField>

          <FormField label="Senha" error={errors.password}>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={initialData ? "Deixe vazio para não alterar" : "Digite a senha"}
            />
          </FormField>

          <FormField label="Filial" error={errors.branch}>
            <Select
              name="sector"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              options={[
                { value: "", label: "Selecione" },
                { value: "Empilhacom", label: "Empilhacom" },
                { value: "Empilhatec", label: "Empilhatec" },
              ]}
            />
          </FormField>

          <FormField label="Tipo de Usuário" error={errors.role}>
            <Select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: "", label: "Selecione" },
                { value: "gerente", label: "Gerente" },
                { value: "estoquista", label: "Estoquista" },
              ]}
            />
          </FormField>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button text="Cancelar" variant="secondary" onClick={onClose} />
          <Button
            text={initialData ? "Salvar Alterações" : "Cadastrar Usuário"}
            variant="primary"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
