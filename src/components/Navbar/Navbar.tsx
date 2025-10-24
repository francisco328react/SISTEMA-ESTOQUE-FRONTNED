interface NavbarProps {
  toggleSidebar: () => void;
}

import perfil from '../../assets/Perfil-2.jpg'

export function Navbar({ toggleSidebar }: NavbarProps) {
  const user = {
    name: "Francisco Severiano",
    role: "Gerente",
    avatar: perfil,
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 shadow-sm px-6 py-3">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded hover:bg-gray-100 cursor-pointer transition"
        aria-label="Alternar menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-gray-800 font-semibold text-sm">{user.name}</p>
          <p className="text-gray-500 text-xs">{user.role}</p>
        </div>
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>
    </header>
  );
}
