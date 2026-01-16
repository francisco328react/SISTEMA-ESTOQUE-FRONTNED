import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { FormContainer } from "../../components/FormContainer/FormContainer";
import { Input } from "../../components/Input/Input";
import { SideImage } from "../../components/SideImage/SideImage";
import { loginUser } from "../../services/authService";

export function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);

      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SideImage title="Projeto Europa" />

      <FormContainer onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Acesso ao Sistema
        </h2>
        <Input
          id="username"
          label="Usuário"
          name="username"
          type="text"
          placeholder="Digite seu nome"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <Input
          id="password"
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          text="Entrar"
          className="bg-primary hover:bg-primary-400"
        />
      </FormContainer>
    </div>
  );
}
