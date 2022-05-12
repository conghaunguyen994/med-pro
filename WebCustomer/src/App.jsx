import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import DepartmentPage from "./pages/DepartmentPage";
import DoctorPage from "./pages/DoctorPage";
import CustomerFormPage from "./pages/CustomerFormPage";

export default function App() {
  return (
    <Router>
      <div>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chuyen-khoa/:id" element={<DepartmentPage />} />
            <Route path="/bac-si/:id" element={<DoctorPage />} />
            <Route path="/xac-nhan" element={<CustomerFormPage />} />
          </Routes>
        </AppLayout>
      </div>
    </Router>
  );
}
