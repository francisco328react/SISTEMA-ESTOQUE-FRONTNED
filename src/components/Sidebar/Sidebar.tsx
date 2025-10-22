import { Home, Users, Package, LogOut, Menu } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 shadow-md transition-all duration-300 flex flex-col`}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between p-4">
        {isOpen ? (
          <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
        ) : (
          <h1 className="text-xl font-bold text-blue-600">D</h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-gray-100 transition"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
            >
              <Home className="w-5 h-5 text-blue-600" />
              {isOpen && <span>Início</span>}
            </a>
          </li>
          <li>
            <a
              href="/usuarios"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
            >
              <Users className="w-5 h-5 text-blue-600" />
              {isOpen && <span>Usuários</span>}
            </a>
          </li>
          <li>
            <a
              href="/produtos"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
            >
              <Package className="w-5 h-5 text-blue-600" />
              {isOpen && <span>Produtos</span>}
            </a>
          </li>
        </ul>
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition w-full">
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
