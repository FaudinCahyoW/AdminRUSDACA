import "../../assets/style/datawarga.css";
import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Tooltip, Modal, notification, Input } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ExportToExcel } from "../../exportExcel/xlsx";
import { useNavigate } from "react-router-dom";

const DataWarga = () => {
    const { Search } = Input;
    const [searchText, setSearchText] = useState("");
    const [dataRumahSehat, setDataRumahSehat] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [excel, getDataExcel] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [api, contextHolder] = notification.useNotification();

    // Modal Delete
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idDataDelete, setIdDataDelete] = useState("");
    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true); // Set loading to true before fetching data
            const response = await axios.get('https://84a67d6d7383.ngrok-free.app/data/ambildata', {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    "Content-type": "application/json",
                    Accept: "application/json"
                }
            });

            const dataWithIds = response.data.data.map(item => ({
                ...item,
                nik: item.nik
            }));
            setDataRumahSehat(dataWithIds);
            setFilteredData(dataWithIds);

            const datas = response.data.data;
            const convert = datas?.map((item, index) => ({
                No: index + 1,
                NamaLengkap: item.nama_lengkap,
                LuasRumah: item.luas_rumah,
                JmlPenghuni: item.jml_penghuni,
                JnsToilet: item.sdia_toilet,
                JnsKamarMandi: item.jns_kmrMandi,
                JnsRangkaDinding: item.rngka_dinding,
                JnsLantai: item.jns_lantai,
                StatusRumah: item.status
            }));
            getDataExcel(convert);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // Set loading to false after fetching data
        }
    };

    function onShowSizeChange(current, pageSize) {
        setPageSize(pageSize);
    }

    // Real-time Search handler
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const filtered = dataRumahSehat.filter((item) =>
            item.nama_lengkap.toLowerCase().includes(value.toLowerCase()) ||
            item.nik.toLowerCase().includes(value.toLowerCase()) ||
            item.status.toLowerCase().includes(value.toLowerCase()) // You can add more fields here for search
        );
        setFilteredData(filtered);
    };

    // Navigation Edit Data
    const editData = (record) => {
        const id = record.rand;
        navigate(`/data/editData/${id}`);
    };

    // Export
    const exportData = <ExportToExcel apiData={excel} fileName="Data Rumah Desa Candinata" />;

    const handleOk = async () => {
        try {
            await axios.delete(`https://84a67d6d7383.ngrok-free.app/data/hapusdata/${idDataDelete}`, {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    "Content-type": "application/json",
                    Accept: "application/json"
                }
            });

            setIdDataDelete("");
            setIsModalOpen(false);

            // Success notification
            openNotificationWithIcon("success", "Data Berhasil Dihapus", "Data berhasil dihapus");

            fetchData(); // Refresh data after successful deletion
        } catch (error) {
            console.error(error);

            // Error notification
            openNotificationWithIcon("error", "Error Hapus Data", "Terjadi kesalahan saat menghapus data.");
        }
    };

    const handleCancel = () => {
        setIdDataDelete("");
        setIsModalOpen(false);
    };

    const openNotificationWithIcon = (type, title, desc) => {
        api[type]({
            message: title,
            description: desc
        });
    };

    const columns = [
        {
            title: "No",
            key: 'index',
            render: (text, record, index) => (page - 1) * pageSize + index + 1,
            width: "5%",
            align: 'center'
        },
        { title: 'Nama Lengkap', dataIndex: 'nama_lengkap', align: 'center', key: 'nama_lengkap' },
        { title: 'Luas Rumah (m²)', dataIndex: 'luas_rumah', align: 'center', key: 'luas_rumah' },
        { title: 'Jumlah Penghuni', dataIndex: 'jml_penghuni', align: 'center', key: 'jml_penghuni' },
        { title: 'Toilet', dataIndex: 'sdia_toilet', align: 'center', key: 'sdia_toilet' },
        { title: 'Jenis Kamar Mandi', dataIndex: 'jenis_kmrMandi', align: 'center', key: 'jenis_kmrMandi' },
        { title: 'Rangka Dinding', dataIndex: 'rngka_dinding', align: 'center', key: 'rngka_dinding' },
        { title: 'Jenis Lantai', dataIndex: 'jns_lantai', align: 'center', key: 'jns_lantai' },
        { title: 'Status Rumah', dataIndex: 'status', align: 'center', key: 'status' },
        {
            title: 'Action',
            align: 'center',
            render: (record) => (
                <Space size="small" className="container-button">
                    <Tooltip title="Edit Data">
                        <Button className="edit-icon" onClick={() => editData(record)} style={{ width: "30px" }}>
                            <EditOutlined />
                        </Button>
                    </Tooltip>
                    {/* Delete */}
                    <Tooltip title="Hapus Data">
                        <Button className="delete-icon" style={{ width: "30px" }}
                            onClick={() => {
                                setIdDataDelete(record._id);
                                showModal(record);
                            }}
                        >
                            <DeleteOutlined />
                        </Button>
                    </Tooltip>
                </Space>
            )
        }
    ];

    return (
        <div>
            {contextHolder}
            <Modal title="Apakah yakin menghapus data ini?"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {/* Modal content here */}
            </Modal>
            <div className="toolbar">
                <div className="export-button">
                    {exportData}
                </div>
                <div>
                  <h2>Daftar Rumah Warga</h2>
                </div>
                <div className="search-container">
                    <Search
                        placeholder="Search by name, NIK or status"
                        onChange={handleSearch}
                        style={{ width: 300}}
                        enterButton
                    />
                </div>
            </div>
            <Table
                className="ant-table"
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    onChange(current) {
                        setPage(current);
                    },
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                }}
                scroll={{ x: 190, y: 360 }}
            />
        </div>
    );
};

export default DataWarga;
