interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  children?: React.ReactNode;
  variant: string;
}

export const Button: React.FC<ButtonProps> = ({ text, type = "button", onClick, children }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition cursor-pointer my-10"
  >
    {children || text}
  </button>
);
