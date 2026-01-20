interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name: string;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  rightElement,
  name,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* WRAPPER RELATIVE */}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="
            w-full
            p-2
            pr-10
            border
            border-gray-300
            rounded
            focus:outline-none
            focus:ring-2
            focus:ring-gray-200
          "
        />

        {/* ÍCONE DENTRO DO INPUT */}
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};
