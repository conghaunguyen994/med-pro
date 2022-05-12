import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import CreateDoctorPage from "./pages/CreateDoctorPage";
import DoctorPage from "./pages/DoctorPage";
import EditDoctorPage from "./pages/EditDoctorPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <div>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorPage />} />
            <Route path="/doctors/create" element={<CreateDoctorPage />} />
            <Route path="/doctors/:id/edit" element={<EditDoctorPage />} />
          </Routes>
        </AppLayout>
      </div>
    </Router>
  );
}
