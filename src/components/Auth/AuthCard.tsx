interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

export function AuthCard({ children, title }: AuthCardProps) {
  return (
    <form className="bg-white shadow-md rounded-lg p-8 w-11/12 max-w-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {title}
      </h2>
      {children}
    </form>
  );
}
