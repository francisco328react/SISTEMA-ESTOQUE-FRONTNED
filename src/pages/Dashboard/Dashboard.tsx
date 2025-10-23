import { useState } from "react";
import { Outlet } from 'react-router-dom'
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}
