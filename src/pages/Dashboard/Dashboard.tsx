import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Navbar } from "../../components/Navbar/Navbar";

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Painel Principal
          </h1>
          <p className="text-gray-600">
            Bem-vindo ao sistema! Aqui você pode gerenciar usuários, produtos e muito mais.
          </p>
        </main>
      </div>
    </div>
  );
}
