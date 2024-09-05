import React, { useState } from 'react';
import AbsenImage from '../assets/img/absenn.png';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../style/css/Login.css';

function LoginPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validation, setValidation] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
  
    try {
      const response = await axios.post('/api/login', formData);
      const { token, role, user_id, nama, jabatan } = response.data; // Tambahkan user_id, nama, dan jabatan

      console.log('Response Data:', response.data); // Debugging: Periksa data yang diterima
  
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id); // Simpan user_id ke localStorage
      localStorage.setItem('nama', nama); // Simpan nama ke localStorage
      localStorage.setItem('jabatan', jabatan); // Simpan jabatan ke localStorage
  
      // Redirect berdasarkan role
      if (role === 'karyawan') {
        navigate('/UserProfile');
      } else if (role === 'admin') {
        navigate('/dashboard');
      } else {
        console.error('Role tidak dikenali:', role); // Debugging: Periksa role yang tidak dikenali
        setValidation('Role tidak dikenali');
      } 
    } catch (error) {
      console.error(error);
      setValidation('Email atau password salah');
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={AbsenImage} alt="absenn-img" />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Silahkan Masukkan Email Anda'
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Silahkan Masukkan Password Anda'
              required 
            />
          </div>
          {/* <div className="form-group">
            <label>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div>  */}
          {validation && (
            <div className="alert alert-danger">
              {validation}
            </div>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
