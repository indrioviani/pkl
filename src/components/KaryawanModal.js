import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from '../api/axios';
import Swal from 'sweetalert2';

function KaryawanModal({ show, handleClose, karyawan }) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [jabatan, setJabatan] = useState('');

  useEffect(() => {
    if (karyawan) {
      setNama(karyawan.nama);
      setEmail(karyawan.email);
      setJabatan(karyawan.jabatan);
    } else {
      setNama('');
      setEmail('');
      setJabatan('');
    }
  }, [karyawan]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (karyawan) {
        // Edit Karyawan
        const response = await axios.put(`/api/user/${karyawan.id}`, { nama, email, jabatan });
        handleClose(response.data);
        Swal.fire('Berhasil!', 'Karyawan berhasil diperbarui.', 'success');
      } else {
        // Tambah Karyawan
        const response = await axios.post('/api/user', { nama, email, jabatan });
        handleClose(response.data);
        Swal.fire('Berhasil!', 'Karyawan berhasil ditambahkan.', 'success');
      }
    } catch (error) {
      Swal.fire('Gagal!', 'Terjadi kesalahan saat menyimpan karyawan.', 'error');
    }
  };

  return (
    <Modal show={show} onHide={() => handleClose(null)}>
      <Modal.Header closeButton>
        <Modal.Title>{karyawan ? 'Edit Karyawan' : 'Tambah Karyawan'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Jabatan</Form.Label>
            <Form.Control type="text" value={jabatan} onChange={(e) => setJabatan(e.target.value)} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(null)}>
            Batal
          </Button>
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default KaryawanModal;
