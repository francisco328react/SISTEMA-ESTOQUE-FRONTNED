import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { FormContainer } from "../../components/FormContainer/FormContainer";
import { Input } from "../../components/Input/Input";
import { SideImage } from "../../components/SideImage/SideImage";
import { loginUser } from "../../services/authService";
import { Link } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);

      localStorage.setItem("token", response.token);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SideImage title="Projeto Europa" />

      {/* FORM */}
      <FormContainer onSubmit={handleLogin}>
        <div className="space-y-1 py-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Olá, bem-vindo 👋
          </h2>
          <p className="text-sm text-gray-500">
            Entre com sua conta para continuar
          </p>
        </div>

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
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center justify-center h-full px-2 text-gray-400 hover:text-gray-600"
              aria-label="Mostrar ou ocultar senha"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        {/* Opções */}
        <div className="flex justify-between py-4 static">
          <div className="flex items-center gap-2">
            <input type="checkbox" name="" id="" />
            <p>Manter conectado</p>
          </div>

          <Link href="#" size="sm" className="text-orange-500 font-medium">
            Recuperar senha
          </Link>
        </div>

        <Button
          type="submit"
          text="Entrar"
          className="bg-primary hover:bg-primary-400"
        />

        {/* Rodapé */}
        <p className="text-center text-sm text-gray-500 py-6">
          Não possui uma conta?{" "}
          <Link href="#" className="text-orange-500 font-medium">
            Solicitar acesso
          </Link>
        </p>

        <hr className="border-gray-200" />

        <p className="text-center text-xs text-gray-400 leading-relaxed py-6">
          Ao continuar, você concorda com nossos{" "}
          <Link href="#" className="text-orange-500">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link href="#" className="text-orange-500">
            Política de Privacidade
          </Link>
        </p>
      </FormContainer>
    </div>
  );
}
