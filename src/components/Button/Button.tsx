interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, type = "button", onClick }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
  >
    {text}
  </button>
);
