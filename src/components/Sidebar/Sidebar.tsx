import { Home, Users, Package, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { name: "Início", icon: <Home className="w-5 h-5 text-blue-600" />, path: "/dashboard/home" },
    { name: "Usuários", icon: <Users className="w-5 h-5 text-blue-600" />, path: "/dashboard/users" },
    { name: "Produtos", icon: <Package className="w-5 h-5 text-blue-600" />, path: "/dashboard/products" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 shadow-md transition-all duration-300 flex flex-col`}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between p-4">
        {isOpen ? (
          <h1 className="text-xl font-bold text-blue-600">Empilhacom</h1>
        ) : (
          <h1 className="text-xl font-bold px-2 text-blue-600">E</h1>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg font-medium transition ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
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
