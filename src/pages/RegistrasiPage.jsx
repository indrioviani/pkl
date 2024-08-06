import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../dist/css/Registrasi.css';

const data = [
  { id: 1, rfid: 'Mark', scanTime: 'Otto' },
  { id: 2, rfid: 'Jacob', scanTime: 'Thornton' },
  { id: 3, rfid: 'Larry', scanTime: 'Bird' },
  { id: 4, rfid: 'Mark', scanTime: 'Otto' },
  { id: 5, rfid: 'Jacob', scanTime: 'Thornton' },
  { id: 6, rfid: 'Larry', scanTime: 'Bird' },
  { id: 7, rfid: 'Mark', scanTime: 'Otto' },
  { id: 8, rfid: 'Jacob', scanTime: 'Thornton' },
  { id: 9, rfid: 'Larry', scanTime: 'Bird' },
  { id: 10, rfid: 'Mark', scanTime: 'Otto' },
  { id: 11, rfid: 'Ja', scanTime: 'Thornton' },
  { id: 1, rfid: 'Mark', scanTime: 'Otto' },
  { id: 2, rfid: 'Jacob', scanTime: 'Thornton' },
  { id: 3, rfid: 'Larry', scanTime: 'Bird' },
  { id: 4, rfid: 'Mark', scanTime: 'Otto' },
  { id: 5, rfid: 'Jacob', scanTime: 'Thornton' },
  // Your existing data array
];

const ITEMS_PER_PAGE = 10;

function RegistrasiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredData = data.filter(row => 
    row.rfid.toLowerCase().includes(searchTerm) ||
    row.scanTime.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoToTambahKaryawan = () => {
    navigate('/TambahKaryawan');
  };

  const handleRegistrasiClick = () => {
    navigate('/TambahKaryawan');
  };

  return (
    <div className="registrasi-container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input" 
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      <Table striped bordered hover className="registrasi-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>RFID Tag</th>
            <th>Waktu Scan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.rfid}</td>
              <td>{row.scanTime}</td>
              <td>
                <Button onClick={handleRegistrasiClick} className="table-button">Registrasi</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-container">
        <Pagination>
          <Pagination.Prev 
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1} 
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages} 
          />
        </Pagination>
      </div>
    </div>
  );
}

export default RegistrasiPage;
