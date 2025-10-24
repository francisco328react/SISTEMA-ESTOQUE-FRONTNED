interface UserFilterProps {
  search: string;
  setSearch: (value: string) => void;
  filter: "todos" | "gerente" | "estoquista";
  setFilter: (value: "todos" | "gerente" | "estoquista") => void;
}

export function UserFilter({ search, setSearch, filter, setFilter }: UserFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Pesquisar usuário..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value as "todos" | "gerente" | "estoquista")
        }
        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      >
        <option value="todos">Todos</option>
        <option value="gerente">Gerentes</option>
        <option value="estoquista">Estoquistas</option>
      </select>
    </div>
  );
}
