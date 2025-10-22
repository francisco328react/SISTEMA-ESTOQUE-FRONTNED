import perfil from '../../assets/Perfil-2.jpg'

export function Navbar() {
    return (
        <header className="w-full bg-gray-800 text-gray-100 flex items-center justify-between px-6 py-3 shadow">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-3">
                <img 
                    src={perfil} 
                    alt="Francisco Neto"
                    className="w-10 h-10 rounded-full border-2 border-gray-600"
                />
                <span className="font-medium">Francisco Neto</span>
            </div>
        </header>
    )
}