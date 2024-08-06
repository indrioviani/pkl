import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SidebarComponent from './components/SidebarComponent';
import NavbarComponent from './components/NavbarComponent';
import DashboardPage from './pages/DashboardPage';
import KaryawanPage from './pages/KaryawanPage';
import AbsensiPage from './pages/AbsensiPage';
import RegistrasiPage from './pages/RegistrasiPage';
import RekapPage from './pages/RekapPage';
import TambahKaryawan from './pages/TambahKaryawan';
import EditKaryawan from './pages/EditKaryawan';
import LoginPage from './pages/LoginPage';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const location = useLocation(); // Hook untuk mendapatkan rute saat ini

    const toggleSidebar = () => {
        if (isMobile) {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isLoginPage = location.pathname === '/';

    return (
        <div className="app">
            {!isLoginPage && (
                <>
                    <NavbarComponent toggleSidebar={toggleSidebar} />
                    <SidebarComponent isOpen={isSidebarOpen} />
                </>
            )}
            <div className="content">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/Dashboard" element={<DashboardPage />} />
                    <Route path="/KaryawanPage" element={<KaryawanPage />} />
                    <Route path="/absensi" element={<AbsensiPage />} />
                    <Route path="/registrasi" element={<RegistrasiPage />} />
                    <Route path="/rekap" element={<RekapPage />} />
                    <Route path="/TambahKaryawan" element={<TambahKaryawan />} />
                    <Route path="/EditKaryawan" element={<EditKaryawan />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
