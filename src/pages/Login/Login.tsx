import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { FormContainer } from "../../components/FormContainer/FormContainer";
import { SideImage } from "../../components/SideImage/SideImage";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@empresa.com" && password === "123456") {
      navigate("/dashboard");
    } else {
      alert("E-mail ou senha incorretos!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SideImage title="Bem-vindo ao Sistema de Gestão" />

      <FormContainer>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Acesso ao Sistema
        </h2>
        <Input
          id="email"
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" text="Entrar" onClick={() => handleLogin} />
      </FormContainer>
    </div>
  );
}
