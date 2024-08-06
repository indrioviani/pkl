import React from 'react';
import AbsenImage from '../assets/img/absen.png';
import '../style/css/Login.css';

 // Pastikan untuk mengganti path dengan path gambar yang benar

function LoginPage() {
  return (
    <div className="login-container">
      <div className="image-container">
      <img src={AbsenImage} alt="absen-img" />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
