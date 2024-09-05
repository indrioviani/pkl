import React, { useState } from 'react';
import '../style/css/Pengajuan.css';
import { Pagination } from 'react-bootstrap';

const PengajuanPage = () => {
    const [pengajuan, setPengajuan] = useState([
        { id: 1, nama: 'John Doe', tanggal_mulai: '2024-08-25', tanggal_akhir: '2024-08-30', alasan: 'Alasan pribadi', status: '' },
        { id: 2, nama: 'Jane Smith', tanggal_mulai: '2024-08-20', tanggal_akhir: '2024-08-22', alasan: 'Sakit', status: '' },
        { id: 3, nama: 'Mike Johnson', tanggal_mulai: '2024-08-15', tanggal_akhir: '2024-08-18', alasan: 'Cuti tahunan', status: '' },
        { id: 4, nama: 'Emily Davis', tanggal_mulai: '2024-08-10', tanggal_akhir: '2024-08-12', alasan: 'Liburan', status: '' },
        { id: 5, nama: 'Anna Brown', tanggal_mulai: '2024-08-01', tanggal_akhir: '2024-08-05', alasan: 'Perawatan keluarga', status: '' },
        { id: 6, nama: 'Chris Wilson', tanggal_mulai: '2024-08-21', tanggal_akhir: '2024-08-25', alasan: 'Sakit', status: '' },
        // Tambahkan data lebih banyak jika perlu
    ]);

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredPengajuan = pengajuan.filter(p =>
        p.nama.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentPengajuan = filteredPengajuan.slice(indexOfFirst, indexOfLast);

    const handleApproval = (id, status) => {
        setPengajuan(prevPengajuan =>
            prevPengajuan.map(p =>
                p.id === id ? { ...p, status } : p
            )
        );
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset halaman ke 1 saat melakukan pencarian
    };

    const totalPages = Math.ceil(filteredPengajuan.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="pengajuan-page">
            <h2>Persetujuan Cuti Karyawan</h2>
            <div className="table-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Cari berdasarkan nama..."
                    value={search}
                    onChange={handleSearchChange}
                />
                <table className="pengajuan-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Karyawan</th>
                            <th>Tanggal Mulai</th>
                            <th>Tanggal Akhir</th>
                            <th>Alasan</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPengajuan.map((p, index) => (
                            <tr key={p.id}>
                                <td>{indexOfFirst + index + 1}</td>
                                <td>{p.nama}</td>
                                <td>{p.tanggal_mulai}</td>
                                <td>{p.tanggal_akhir}</td>
                                <td>{p.alasan}</td>
                                <td>{p.status || 'Menunggu'}</td>
                                <td>
                                    <button
                                        className="approve-button"
                                        onClick={() => handleApproval(p.id, 'approved')}
                                        disabled={p.status === 'approved'}
                                    >
                                        Setujui
                                    </button>
                                    <button
                                        className="reject-button"
                                        onClick={() => handleApproval(p.id, 'rejected')}
                                        disabled={p.status === 'rejected'}
                                    >
                                        Tolak
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        </div>
    );
};

export default PengajuanPage;
