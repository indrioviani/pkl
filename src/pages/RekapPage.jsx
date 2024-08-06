import React, { useState } from 'react';
import { Form, Button, Table, Pagination } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/css/Rekap.css';
import { FaCalendarAlt } from 'react-icons/fa';

function RekapPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const data = [
    { id: 1, rfid: '123456789', nama: 'John Doe', waktuMasuk: '08:00', waktuKeluar: '17:00' },
    { id: 2, rfid: '987654321', nama: 'Jane Smith', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 3, rfid: '987654322', nama: 'Alice Johnson', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 4, rfid: '987654323', nama: 'Bob Brown', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 5, rfid: '987654324', nama: 'Charlie Davis', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 6, rfid: '987654325', nama: 'David Evans', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 7, rfid: '987654326', nama: 'Eve Foster', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 8, rfid: '987654327', nama: 'Frank Green', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 9, rfid: '987654328', nama: 'Grace Harris', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 10, rfid: '987654329', nama: 'Henry Ivers', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 11, rfid: '987654330', nama: 'Ivy Johnson', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 12, rfid: '987654331', nama: 'Jack King', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 13, rfid: '987654332', nama: 'Kelly Lee', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 14, rfid: '987654333', nama: 'Liam Moore', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    { id: 15, rfid: '987654334', nama: 'Mia Nelson', waktuMasuk: '08:15', waktuKeluar: '17:15' },
    // Tambahkan data lainnya sesuai kebutuhan
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset halaman ke 1 setiap kali ada pencarian baru
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleDownload = () => {
    alert('Download rekap Excel');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = searchTerm ? filteredData : filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="rekap-page">
      <h1>Rekap Absen</h1>
      <div className="header">
        <Form.Control
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="primary" className="search-button">
          Search
        </Button>
        <div className="calendar-container">
          <Button
            variant="light"
            className="calendar-button"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <FaCalendarAlt /> Kalender
          </Button>
          {showCalendar && (
            <div className="calendar-popup">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>
          )}
        </div>
        <Button variant="success" className="download-button" onClick={handleDownload}>
          Download Rekap Excel
        </Button>
      </div>
      <Table striped bordered hover className="rekap-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>RFID Tag</th>
            <th>Nama</th>
            <th>Waktu Masuk</th>
            <th>Waktu Keluar</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.rfid}</td>
              <td>{item.nama}</td>
              <td>{item.waktuMasuk}</td>
              <td>{item.waktuKeluar}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default RekapPage;
