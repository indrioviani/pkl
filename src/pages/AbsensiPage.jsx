import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Table, Pagination, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../style/css/Absensi.css';

function AbsensiPage() {
  const [karyawan, setKaryawan] = useState([]);
  const [absensi, setAbsensi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(''); // State untuk pencarian
  const [filteredKaryawan, setFilteredKaryawan] = useState([]);

  useEffect(() => {
    // Ambil data karyawan dari API
    axios.get('/api/user')
      .then(response => {
        setKaryawan(response.data);
        setFilteredKaryawan(response.data); // Set filteredKaryawan saat data karyawan didapat
      });

    // Ambil data absensi dari API
    axios.get('/api/absensi')
      .then(response => {
        setAbsensi(response.data);
      });
  }, []);

  useEffect(() => {
    // Filter karyawan berdasarkan searchTerm
    setFilteredKaryawan(
      karyawan.filter((item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1); // Reset halaman ke 1 setiap kali ada pencarian baru
  }, [searchTerm, karyawan]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAbsenMasuk = async (userId) => {
    try {
      const response = await axios.post('/api/absen-masuk', { user_id: userId });
      setAbsensi([...absensi, response.data]);
      Swal.fire(
        'Berhasil',
        'Absen masuk berhasil dicatat',
        'success'
      );
    } catch (error) {
      Swal.fire(
        'Gagal!',
        'Terjadi kesalahan saat mencatat absen masuk.',
        'error'
      );
    }
  };

  const handleAbsenPulang = async (userId) => {
    try {
      const response = await axios.post('/api/absen-pulang', { user_id: userId });
      const updatedAbsensi = absensi.map((item) =>
        item.id === response.data.id ? response.data : item
      );
      setAbsensi(updatedAbsensi);
      Swal.fire(
        'Berhasil',
        'Absen pulang berhasil dicatat',
        'success'
      );
    } catch (error) {
      Swal.fire(
        'Gagal!',
        'Terjadi kesalahan saat mencatat absen pulang.',
        'error'
      );
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKaryawan.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='absensi-page'>
      <div className="header">
        <h1>Absensi Karyawan</h1>
        <div className='controls'>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          
        </div>
      </div>
      <Table striped bordered hover className="absensi-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Tanggal</th>
            <th>Jam Masuk</th>
            <th>Jam Pulang</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((karyawan) => {
            const karyawanAbsensi = absensi.find(item => item.user_id === karyawan.id);
            return (
              <tr key={karyawan.id}>
                <td>{karyawan.id}</td>
                <td>{karyawan.nama}</td>
                <td>
                  {karyawanAbsensi ? 
                    new Date(karyawanAbsensi.jam_masuk).toLocaleDateString() : '-'}
                </td>
                <td>
                  {karyawanAbsensi ? 
                    new Date(karyawanAbsensi.jam_masuk).toLocaleTimeString() : '-'}
                </td>
                <td>
                  {karyawanAbsensi ? 
                    new Date(karyawanAbsensi.jam_pulang).toLocaleTimeString() : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination className="pagination-container">
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
}

export default AbsensiPage;
