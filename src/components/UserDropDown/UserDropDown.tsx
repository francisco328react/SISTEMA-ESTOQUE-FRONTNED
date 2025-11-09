import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";

interface UserDropdownProps {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui pode limpar localStorage, cookies, etc.
    navigate("/");
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão de perfil */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 focus:outline-none hover:bg-gray-100 rounded-lg px-2 py-1 transition cursor-pointer"
      >
        <div className="text-right hidden sm:block">
          <p className="text-gray-800 font-semibold text-sm">{user.name}</p>
          <p className="text-gray-500 text-xs">{user.role}</p>
        </div>
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fadeIn">
          <div className="py-1">
            <Button 
              variant="danger" 
              onClick={handleLogout} 
              className="cursor-pointer"
            >
              Sair
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
