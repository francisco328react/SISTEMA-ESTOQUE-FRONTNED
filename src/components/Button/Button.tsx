interface ButtonProps {
  text?: string;
  type?: "button" | "submit";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  children,
  variant = "primary",
  className = "",
}) => {
  const baseStyle =
    "w-full px-4 py-2 text-sm text-center rounded-md transition";

  const variants = {
    primary: "bg-blue-600 text-center text-white hover:bg-blue-700 transition cursor-pointer",
    secondary: "bg-gray-100 text-center text-gray-800 hover:bg-gray-200 transition cursor-pointer",
    danger: "text-red-600 text-center hover:bg-red-50 transition cursor-pointer",
    ghost: "text-gray-700 text-center hover:bg-gray-100 transition cursor-pointer",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children || text}
    </button>
  );
};
