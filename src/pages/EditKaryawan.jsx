import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../style/css/TambahKaryawan.css';

function EditKaryawan() {
  const [formData, setFormData] = useState({
    nama: '',
    nomorHp: '',
    email: '',
    rfid: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logika pengiriman data form
    console.log('Form Data Submitted:', formData);
    
    // Simulasi logika pengiriman data ke server
    const isSuccess = true; // Ubah sesuai dengan logika keberhasilan pengiriman data

    if (isSuccess) {
      Swal.fire({
        title: 'Berhasil!',
        text: 'Data karyawan berhasil ditambahkan.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Gagal!',
        text: 'Data karyawan gagal ditambahkan.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="karyawan-container">
      <h1>Edit Karyawan</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNama">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formNomorHp">
          <Form.Label>Nomor HP</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nomor HP"
            name="nomorHp"
            value={formData.nomorHp}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Masukkan email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRfid">
          <Form.Label>RFID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan RFID"
            name="rfid"
            value={formData.rfid}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditKaryawan;
