import { LayoutDashboard, Package, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5 text-primary-600" />,
      path: "/home",
    },
    {
      name: "Usuários",
      icon: <Users className="w-5 h-5 text-primary-600" />,
      path: "/users",
    },
    {
      name: "Materiais",
      icon: <Package className="w-5 h-5 text-primary-600" />,
      path: "/materials",
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 shadow-md transition-all duration-300 flex flex-col`}
    >
      {/* Cabeçalho com espaço maior e efeito slide */}
      <div className="flex items-center justify-center p-6 h-24 overflow-hidden border-b border-gray-100">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Logo completa - slide from left */}
          <img
            src="/europa-orange.svg"
            alt="Europa"
            className={`h-20 absolute transition-all duration-300 ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 pointer-events-none"
            }`}
          />

          {/* Ícone - slide from right */}
          <img
            src="/europa-icon-orange.svg"
            alt="Europa"
            className={`w-12 h-12 absolute transition-all duration-300 ${
              !isOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2 mt-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center ${
                  isOpen ? "gap-3 justify-start" : "justify-center"
                } p-3 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-primary-50"
                }`}
              >
                {item.icon}
                {isOpen && (
                  <span className="transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
