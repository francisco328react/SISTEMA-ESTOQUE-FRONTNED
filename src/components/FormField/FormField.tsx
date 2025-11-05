import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  error: string
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}
