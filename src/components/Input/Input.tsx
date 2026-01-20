interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  name,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      aria-required
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
      required={required}
    />
  </div>
);
