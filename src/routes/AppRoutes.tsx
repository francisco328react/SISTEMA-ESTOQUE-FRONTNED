import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Login } from '../pages/Login/Login'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { Register } from '../pages/Register/Register'

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}