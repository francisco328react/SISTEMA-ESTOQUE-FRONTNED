interface ButtonProps {
  text: string;
}

export function Button({ text }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
    >
      {text}
    </button>
  );
}