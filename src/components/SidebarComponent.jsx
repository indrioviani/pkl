import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faClock, faUserTimes, faClipboard } from '@fortawesome/free-solid-svg-icons';
import AbsenImage from '../assets/img/absen.png';
import '../dist/css/Sidebar.css';

const SidebarComponent = ({ isOpen }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="profile-section">
                <img src={AbsenImage} alt="absen-img" />
                
            </div>
            <h1>SI'ABSENSI</h1>
            <ul>
                <li><NavLink to="/Dashboard" activeClassName="active"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</NavLink></li>
                <li><NavLink to="/KaryawanPage" activeClassName="active"><FontAwesomeIcon icon={faUsers} /> Karyawan</NavLink></li>
                <li><NavLink to="/absensi" activeClassName="active"><FontAwesomeIcon icon={faClock} /> Absensi</NavLink></li>
                <li><NavLink to="/registrasi" activeClassName="active"><FontAwesomeIcon icon={faUserTimes} /> Belum Terdaftar</NavLink></li>
                <li><NavLink to="/rekap" activeClassName="active"><FontAwesomeIcon icon={faClipboard} /> Rekap</NavLink></li>
            </ul>
        </div>
    );
};

export default SidebarComponent;
