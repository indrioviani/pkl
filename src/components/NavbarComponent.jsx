import React from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../style/css/Navbar.css';

const NavbarComponent = ({ toggleSidebar }) => {
    const handleLogout = () => {
        Swal.fire({
            title: 'Apakah yakin ingin keluar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, keluar',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Lakukan aksi logout disini
                console.log('User logged out');
                // Contoh: Anda bisa mengarahkan pengguna ke halaman login
                window.location.href = '/login';
            }
        });
    };

    return (
        <nav className="navbar">
            <button className="toggle-button" onClick={toggleSidebar}>
                <FaBars /> {/* Ikon toggle */}
            </button>
            <button className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt /> {/* Ikon logout */}
            </button>
        </nav>
    );
};

export default NavbarComponent;
