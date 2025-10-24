interface UserHeaderProps {
  onNewUser: () => void;
}

export function UserHeader({ onNewUser }: UserHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>
      <button
        onClick={onNewUser}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow transition-all cursor-pointer"
      >
        + Novo Usuário
      </button>
    </div>
  );
}
