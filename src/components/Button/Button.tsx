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
    "w-full text-left px-4 py-2 text-sm rounded-md transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger: "text-red-600 hover:bg-red-50",
    ghost: "text-gray-700 hover:bg-gray-100",
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
