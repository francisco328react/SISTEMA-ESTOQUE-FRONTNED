interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Lado esquerdo */}
      <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center">
        <div className="px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-700">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        {children}
      </div>
    </div>
  );
}
