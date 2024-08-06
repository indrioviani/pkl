import React, { useState } from 'react';
import { Button, Form, Table, Pagination } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../style/css/Karyawan.css';

function KaryawanPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddKaryawan = () => {
    navigate('/TambahKaryawan');
  };

  const handleEdit = (id) => {
    navigate(`/EditKaryawan/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda tidak dapat mengembalikan data yang telah dihapus!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Hapus karyawan dengan ID: ${id}`);
        Swal.fire(
          'Terhapus!',
          'Data karyawan telah dihapus.',
          'success'
        );
      }
    });
  };

  const karyawanData = [
    { id: 1, name: 'John Doe', rfid: '123456789', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', rfid: '987654321', email: 'jane@example.com' },
    { id: 3, name: 'Jack Smith', rfid: '123123123', email: 'jack@example.com' },
    { id: 4, name: 'Jill Johnson', rfid: '321321321', email: 'jill@example.com' },
    { id: 5, name: 'Joe Brown', rfid: '456456456', email: 'joe@example.com' },
    { id: 6, name: 'Jake White', rfid: '654654654', email: 'jake@example.com' },
    // Tambahkan data lainnya sesuai kebutuhan
  ];

  const filteredData = karyawanData.filter(
    (karyawan) =>
      karyawan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      karyawan.rfid.includes(searchTerm) ||
      karyawan.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="karyawan-page">
      <div className="header">
        <h1>Daftar Karyawan</h1>
        <Button variant="primary" className="add-button" onClick={handleAddKaryawan}>
          <FaPlus /> Tambah Karyawan
        </Button>
      </div>
      <div className="filter-container">
        <Form.Control
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Table striped bordered hover className="karyawan-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>RFID</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((karyawan) => (
            <tr key={karyawan.id}>
              <td>{karyawan.id}</td>
              <td>{karyawan.name}</td>
              <td>{karyawan.rfid}</td>
              <td>{karyawan.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(karyawan.id)} className="me-2">
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(karyawan.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="pagination-container">
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
       
      </Pagination>
    </div>
  );
}

export default KaryawanPage;
