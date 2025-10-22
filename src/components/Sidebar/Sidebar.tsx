import { Home, Menu, ClipboardList, Settings } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-900 h-screen text-gray-100 transition-all duration-300 flex flex-col`}
    >
      {/* Botão de abrir/fechar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-4 text-gray-300 hover:text-white cursor-pointer"
      >
        <Menu size={24} />
        {isOpen && <span className="text-lg font-semibold">Menu</span>}
      </button>

      {/* Itens do menu */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          <li className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer">
            <Home size={20} />
            {isOpen && <span>Início</span>}
          </li>
          <li className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer">
            <ClipboardList size={20} />
            {isOpen && <span>Tarefas</span>}
          </li>
          <li className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer">
            <Settings size={20} />
            {isOpen && <span>Configurações</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
}
