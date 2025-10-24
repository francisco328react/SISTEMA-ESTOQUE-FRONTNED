import type { User } from "../../types/User/User";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
      <div className="flex items-center gap-4">
        <img
          src={user.image}
          alt={user.name}
          className="w-14 h-14 rounded-full border-2 border-blue-100"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
          <p
            className={`text-sm font-medium capitalize ${
              user.role === "gerente" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {user.role}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Criado em:{" "}
        <span className="font-medium">
          {new Date(user.createdAt).toLocaleDateString("pt-BR")}
        </span>
      </p>
    </div>
  );
}
