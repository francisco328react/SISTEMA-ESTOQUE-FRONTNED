import { Sidebar } from "../../components/Sidebar/Sidebar"
import { Navbar } from "../../components/Navbar/Navbar"

export function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
           <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                    <p>Bem-vindo ao sistema!</p>
                </main>
           </div>
        </div>
    )
}