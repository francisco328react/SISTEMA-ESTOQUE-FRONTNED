interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: (e: React.FormEvent) => void;
  children?: React.ReactNode;
  variant?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  children,
  variant,
}) => (
  <button
    type={type}
    onClick={onClick} // <-- ESSENCIAL: precisa estar aqui
    className={`w-full ${
      variant === "primary"
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : variant === "secondary"
        ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
        : "bg-red-600 hover:bg-red-700 text-white"
    } py-2 rounded transition cursor-pointer`}
  >
    {children || text}
  </button>
);
