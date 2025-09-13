import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './component/sidebar/sideBarComp';
import DashboardPage from './component/halaman/Dashboard';
import DataWarga from './component/halaman/DataWarga';
import EditData from './component/halaman/editData';
import DataPengguna from './component/halaman/dataPengguna';
import EditPengguna from './component/halaman/editPengguna';
import LoginAdmin from './component/halaman/loginAdmin';
import DaftarAdmin from './component/halaman/daftarAdmin';
import "./App.css";

// Komponen ProtectedRoute untuk halaman yang butuh login
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default root diarahkan ke login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Halaman publik */}
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/daftar" element={<DaftarAdmin />} />

        {/* Halaman yang butuh login */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<SideBar><DashboardPage /></SideBar>} />}
        />
        <Route
          path="/datawarga"
          element={<ProtectedRoute element={<SideBar><DataWarga /></SideBar>} />}
        />
        <Route
          path="/data/editData/:id"
          element={<ProtectedRoute element={<SideBar><EditData /></SideBar>} />}
        />
        <Route
          path="/data/editPengguna/:id"
          element={<ProtectedRoute element={<SideBar><EditPengguna /></SideBar>} />}
        />
        <Route
          path="/data/user"
          element={<ProtectedRoute element={<SideBar><DataPengguna /></SideBar>} />}
        />

        {/* Jika path tidak ditemukan, redirect ke login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
