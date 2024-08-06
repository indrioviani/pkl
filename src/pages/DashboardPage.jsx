import React from 'react';
import { FaChartBar, FaUsers, FaUserAltSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ReactApexChart from 'react-apexcharts';
import '../dist/css/App.css'; // Pastikan Anda mengimpor file CSS

const DashboardPage = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  // Data untuk grafik pie
  const pieData = {
    Expenses: 125000,
    Sales: 45000,
  };

  const pieOptions = {
    labels: Object.keys(pieData),
    colors: ["#FF4560", "#008FFB"],
    legend: {
      position: "bottom",
    },
  };

  const pieSeries = Object.values(pieData);

  // Data untuk grafik garis
  const lineData = [
    { dollars: 10, sales: 20 },
    { dollars: 40, sales: 24 },
    { dollars: 60, sales: 30 },
    { dollars: 80, sales: 38 },
    { dollars: 100, sales: 40 },
    { dollars: 200, sales: 45 },
    { dollars: 300, sales: 46 },
    { dollars: 400, sales: 34 },
    { dollars: 500, sales: 28 },
    { dollars: 600, sales: 26 },
    { dollars: 700, sales: 26 },
    { dollars: 800, sales: 30 },
    { dollars: 900, sales: 40 },
    { dollars: 1000, sales: 35 },
    { dollars: 1100, sales: 30 },
    { dollars: 1200, sales: 50 },
  ];

  const lineOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: lineData.map((item) => item.dollars),
      title: {
        text: "Dollars",
      },
    },
    yaxis: {
      title: {
        text: "Sales",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const lineSeries = [
    {
      name: "Sales",
      data: lineData.map((item) => item.sales),
    },
  ];
  const handleRegistrasiClick = () => {
    navigate('/TambahKaryawan'); // Navigasi ke halaman TambahKaryawan
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome To Dashboard Admin</h1>
      <div className="box-container">
        <div className="box">
          <FaUsers className="box-icon" />
          <div className="box-content">
            <span className="box-number">0</span>
            <span className="box-label">Total Karyawan</span>
          </div>
        </div>
        <div className="box">
          <FaChartBar className="box-icon" />
          <div className="box-content">
            <span className="box-number">0</span>
            <span className="box-label">Sudah Absen</span>
          </div>
        </div>
        <div className="box">
          <FaUserAltSlash className="box-icon" />
          <div className="box-content">
            <span className="box-number">0</span>
            <span className="box-label">Belum Absen</span>
          </div>
        </div>
      </div>
      <div className='chart-container'> 
        <div className='chart activity-chart'>
          <h3 className='chart-title'>Activities</h3>
          <ReactApexChart
            options={lineOptions}
            series={lineSeries}
            type="line"
            height={350}
          />
        </div>
        <div className="pending">
            <h2>Akun Belum Terdaftar</h2>
          <p>belum terdafar baru-baru ini</p>
          <div className="account-row">
            <span className="rfid">RFID</span>
            <span className="action">Aksi</span>
          </div>
          <div className="account-row">
            <span className="rfid">123456789</span>
            <button className="action-button" onClick={handleRegistrasiClick}>Registrasi</button>
          </div>
          </div>
      </div>
    </div>
  );
};

export default DashboardPage;
