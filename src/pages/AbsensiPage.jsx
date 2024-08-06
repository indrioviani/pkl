import React, { useState } from 'react';
import { Form, Table, Button, Pagination } from 'react-bootstrap';
import '../dist/css/Absensi.css';

// Contoh data absensi
const data = [
  { id: 1, rfid: '123456789', name: 'John Doe', checkIn: '08:00', checkOut: '17:00', hasCheckedIn: true },
  { id: 2, rfid: '987654321', name: 'Jane Smith', checkIn: '08:15', checkOut: '17:15', hasCheckedIn: true },
  { id: 3, rfid: '987654322', name: 'Alice Johnson', checkIn: '', checkOut: '', hasCheckedIn: false },
  { id: 4, rfid: '987654323', name: 'Bob Brown', checkIn: '', checkOut: '', hasCheckedIn: false },
  // Tambahkan lebih banyak data jika perlu
];

const ITEMS_PER_PAGE = 10;

function AbsensiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCheckedIn, setShowCheckedIn] = useState(true);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowCheckedIn = () => {
    setShowCheckedIn(true);
    setCurrentPage(1); // Reset ke halaman pertama saat berpindah tampilan
  };

  const handleShowNotCheckedIn = () => {
    setShowCheckedIn(false);
    setCurrentPage(1); // Reset ke halaman pertama saat berpindah tampilan
  };

  const filteredData = data.filter(row =>
    row.id.toString().includes(searchTerm) ||
    row.rfid.includes(searchTerm) ||
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedData = filteredData.filter(row => row.hasCheckedIn === showCheckedIn);

  const totalPages = Math.ceil(displayedData.length / ITEMS_PER_PAGE);
  const currentData = displayedData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="absensi-page">
      <h1>Absensi Karyawan</h1>
      <div className="filter-container">
        <Button
          variant={showCheckedIn ? 'primary' : 'light'}
          onClick={handleShowCheckedIn}
          className="filter-button"
        >
          Sudah Absen
        </Button>
        <Button
          variant={!showCheckedIn ? 'primary' : 'light'}
          onClick={handleShowNotCheckedIn}
          className="filter-button"
        >
          Belum Absen
        </Button>
      </div>
      <div className="search-container">
        <Form.Control
          type="text"
          placeholder="Search by ID, RFID, or Name..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button className="search-button" onClick={handleSearch}>Search</Button>
      </div>
      <Table striped bordered hover className="absensi-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>RFID</th>
            <th>Nama</th>
            <th>Waktu Masuk</th>
            <th>Waktu Keluar</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.rfid}</td>
                <td>{row.name}</td>
                <td>{row.checkIn}</td>
                <td>{row.checkOut}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination className="pagination12">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default AbsensiPage;
