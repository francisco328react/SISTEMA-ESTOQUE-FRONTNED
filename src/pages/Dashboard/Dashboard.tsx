import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header (opcional) */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {/* <Header /> */}

        {/* Área de conteúdo das rotas filhas */}
        <main className="flex-1 overflow-y-auto">
          <Outlet /> {/* ← ISSO É ESSENCIAL! */}
        </main>
      </div>
    </div>
  );
}
