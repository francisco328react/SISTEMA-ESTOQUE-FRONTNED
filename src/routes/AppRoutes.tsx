import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Login } from '../pages/Login/Login'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { Register } from '../pages/Register/Register'

import { Users } from '../pages/Dashboard/Users'

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                {/* Dashboard principal com rotas aninhadas */}
                <Route path="/dashboard" element={<Dashboard />}>
                    {/* <Route path="home" element={<Home />} /> */}
                    <Route path="users" element={<Users />} />
                    {/* <Route path="products" element={<Products />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}