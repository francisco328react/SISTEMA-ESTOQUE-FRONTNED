import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../pages/Login/Login";

import { Dashboard } from "../pages/Dashboard/Dashboard";
import { DashboardHome } from "../pages/Dashboard/DashboardHome";
import { Materials } from "../pages/Materials";
import { MaterialForm } from "../pages/Materials/materialForm"; // ← Verifique se é MaterialForm ou materialForm
import { Users } from "../pages/Users";
import { UserForm } from "../pages/Users/UserForm";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard é apenas o LAYOUT, não faz parte da URL */}
        <Route element={<Dashboard />}>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />

          <Route path="/materials" element={<Materials />} />
          <Route path="/materials/new" element={<MaterialForm />} />
          <Route path="/materials/edit/:id" element={<MaterialForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
