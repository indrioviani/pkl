import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Table, Pagination, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import * as XLSX from 'xlsx'; // Import library xlsx
import '../style/css/Rekap.css'; // Perbarui import CSS

function RekapPage() {
  const [karyawan, setKaryawan] = useState([]);
  const [absensi, setAbsensi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(''); // State untuk pencarian
  const [filteredKaryawan, setFilteredKaryawan] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State untuk tanggal

  useEffect(() => {
    // Ambil data karyawan dari API
    axios.get('/api/user')
      .then(response => {
        setKaryawan(response.data);
        setFilteredKaryawan(response.data); // Set filteredKaryawan saat data karyawan didapat
      });

    // Ambil data absensi berdasarkan tanggal yang dipilih
    const fetchData = async () => {
      try {
        const date = selectedDate ? moment(selectedDate).format('Y-M-D') : '';
        const response = await axios.get('/api/absensi/rekap', {
          params: { date }
        });
        setAbsensi(response.data);
      } catch (error) {
        console.error('Error fetching absensi data:', error);
      }
    };

    fetchData();
  }, [selectedDate]); // tambahkan selectedDate sebagai dependency

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

  // Filter absensi berdasarkan tanggal yang dipilih
  const filteredAbsensi = selectedDate ? absensi.filter(item =>
    moment(item.jam_masuk).format('Y-M-D') === moment(selectedDate).format('Y-M-D')
  ) : absensi;

  // Pagination logic
  const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKaryawan.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDownload = () => {
    // Siapkan data untuk di-download
    const data = filteredAbsensi.map(item => ({
      ID: item.user_id,
      Nama: karyawan.find(k => k.id === item.user_id)?.nama || '-',
      Tanggal: item.jam_masuk ? moment(item.jam_masuk).format('Y-M-D') : '-',
      Jam_Masuk: item.jam_masuk ? moment(item.jam_masuk).format('HH:mm:ss') : '-',
      Jam_Pulang: item.jam_pulang ? moment(item.jam_pulang).format('HH:mm:ss') : '-'
    }));

    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap Absensi');

    // Generate buffer and create download link
    XLSX.writeFile(workbook, `Rekap_Absensi_${moment().format('Y-M-D')}.xlsx`);
  };

  return (
    <div className='rekap-page'>
      <h1>Rekap Karyawan</h1>
      <div className="controls">
        <Form.Control
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="date-picker"
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date"
        />
        <Button variant="primary" className="search-button" onClick={handleDownload}>
          Download Rekap
        </Button>
      </div>
      <Table striped bordered hover className="rekap-table">
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
            const karyawanAbsensi = filteredAbsensi.find(item => item.user_id === karyawan.id);
            return (
              <tr key={karyawan.id}>
                <td>{karyawan.id}</td>
                <td>{karyawan.nama}</td>
                <td>
                  {karyawanAbsensi ? moment(karyawanAbsensi.jam_masuk).format('Y-M-D') : '-'}
                </td>
                <td>
                  {karyawanAbsensi ? moment(karyawanAbsensi.jam_masuk).format('HH:mm:ss') : '-'}
                </td>
                <td>
                  {karyawanAbsensi ? moment(karyawanAbsensi.jam_pulang).format('HH:mm:ss') : '-'}
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

export default RekapPage;
