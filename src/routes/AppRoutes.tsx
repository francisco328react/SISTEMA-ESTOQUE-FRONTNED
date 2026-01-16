import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Login/Login";

import { Users } from "../pages/Dashboard/Users";
import { Materials } from "../pages/Materials";
import { MaterialForm } from "../pages/Materials/materialForm";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard principal com rotas aninhadas */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />

          {/* Rotas de Materiais */}
          <Route path="materials" element={<Materials />} />
          <Route path="materials/new" element={<MaterialForm />} />
          <Route path="materials/edit/:id" element={<MaterialForm />} />

          {/* <Route path="products" element={<Products />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
