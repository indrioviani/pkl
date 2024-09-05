import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate dari react-router-dom
import '../style/css/UserProfile.css';
import AbsenImage from '../assets/img/absen.png';
import { FaUser, FaCalendarCheck, FaHistory, FaMapMarkerAlt, FaSignInAlt, FaSignOutAlt, FaHome, FaCalendar, FaCamera, FaFile } from 'react-icons/fa';

const UserProfile = () => {
  const navigate = useNavigate(); // Mendapatkan fungsi navigate

  const handleLogout = () => {
    // Menghapus token autentikasi dari penyimpanan lokal
    localStorage.removeItem('authToken'); // Ganti dengan nama token yang Anda simpan

    // Mengarahkan pengguna ke halaman login atau halaman utama
    navigate('/'); // Ganti dengan rute yang sesuai
  };

  return (
    <div className="user-profile">
      <div className="profile-container">
        <img
          src={AbsenImage} // Ganti dengan path gambar yang sesuai
          alt="Foot Profile"
          className="profile-img"
        />
        <div className="profile-texts">
          <div className="profile-header">
            <h1>Adam Abdi Al A'la</h1>
            <FaSignOutAlt className="logout-icon" onClick={handleLogout} />
            <h2>Head of IT</h2>
          </div>
          
        </div>
      </div>
      <div className="icons-container">
        <div className="icons">
          <div className="icon"><FaUser /> </div>
          <div className="icon"><FaCalendarCheck /> </div>
          <div className="icon"><FaHistory /> </div>
          <div className="icon"><FaMapMarkerAlt /> </div>
        </div>
      </div>
      <div className="attendance">
        <div className="attendance-item btn-green"><FaSignInAlt /> Masuk 07:00</div>
        <div className="attendance-item btn-red"><FaSignOutAlt /> Pulang 12:00</div>
      </div>
    </div>
  );
};

export default UserProfile;
