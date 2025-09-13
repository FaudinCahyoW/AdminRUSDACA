import "../../assets/style/daftarpengguna.css"
import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Tooltip, Modal, notification, Input } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ExportToExcel } from "../../exportExcel/xlsx";
import { useNavigate } from "react-router-dom";

const DataPengguna = () => {
    const {Search} = Input
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [daftarPengguna, setDaftarPengguna] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [excel, getDataExcel] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [api, contextHolder] = notification.useNotification()


     //Modal Delete
     const [isModalOpen, setIsModalOpen] = useState(false)
     const [idDataDelete, setIdDataDelete] = useState("")
     const showModal = () => {
       setIsModalOpen(true)
     }

    useEffect(()=>{
      fetchData()
    },[])
      const fetchData = async () => {
        try {
          const response = await axios.get('https://84a67d6d7383.ngrok-free.app/data/auth', {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-type": "application/json",
              Accept: "application/json"
            }
          });
  
          const dataWithIds = response.data.user.map(item => ({
            ...item,
            id: item._id
          }));
          setDaftarPengguna(dataWithIds);
          setFilteredData(dataWithIds);
  
          const datas = response.data.user;
          const convert = datas?.map((item, index) => ({
            No: index + 1,
            Email: item.email,
            LuasRumah: item.luas_rumah,
            NamaLeDataPenggunangkap: item.nama_lengkap,
            NoTelp: item.nomor_telepon,
            Alamat: item.alamat_rumah,
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
      const filtered = daftarPengguna.filter((item) =>
          item.nama_lengkap.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    };

    // Navigasi Edit Data
    const editData = (record) => {
      const id = record._id;
      navigate(`/data/editPengguna/${id}`)
    }

    //Export
    const exportData = <ExportToExcel apiData={excel} fileName="Daftar Warga Desa Candinata"/>

    const handleOk = async () => {
      try {
          await axios.delete(`https://84a67d6d7383.ngrok-free.app/data/hapusauth/${idDataDelete}`, {
              headers: {
                  "ngrok-skip-browser-warning": "69420",
                  "Content-type": "application/json",
                  Accept: "application/json"
              }
          });
  
          setIdDataDelete("");
          setIsModalOpen(false);
  
          openNotificationWithIcon("success", "Data Berhasil Dihapus", "Data berhasil dihapus");
  
          fetchData(); 
      } catch (error) {
          console.error(error);
  
          openNotificationWithIcon("error", "Error Hapus Data", "Terjadi kesalahan saat menghapus data.");
      }
  };

    const handleCancel = () => {
      setIdDataDelete("")
      setIsModalOpen(false)
    }

    const openNotificationWithIcon = (type, title, desc) => {
      api[type]({
          messsage:title,
          description: desc
      })
     }

    const columns = [
      {
        title: "No",
        key: 'index',
        render: (text, record, index) => (page - 1) * pageSize + index + 1 ,
        width: "5%",
        align: 'center' 
      },
      { title: 'Email', dataIndex: 'email', align: 'center', key:'email' },
      { title: 'Nama Lengkap', dataIndex: 'nama_lengkap', align: 'center', key:'nama_lengkap'},
      { title: 'Nomor Telp', dataIndex: 'nomor_telepon', align: 'center', key:'nomor_telepon' },
      { title: 'Alamat ', dataIndex: 'alamat_rumah', align: 'center', key:'alamat_rumah'},
      {title:'Action',align: 'center', render: (record) => (
      <Space size="small" className="container-button">

      <Tooltip title="Edit Data">
        <Button className="edit-icon" onClick={() => editData(record)} style={{
          width:"30px"
        }}>
            <EditOutlined/>
        </Button>
       </Tooltip>
       {/* Delete */}
      <Tooltip title="Hapus Data">
        <Button className="delete-icon" style={{
          width:"30px"
        }}
          onClick={() =>{
            setIdDataDelete(record._id)
            showModal(record)
          }}
        >
          <DeleteOutlined/>
        </Button>
      </Tooltip>


      </Space>
      )}
    ];

    return (
    <div>
      {contextHolder}

      <Modal title="Apakah yakin menghapus data ini?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      </Modal>
      <div className="toolbar">
                <div className="export-button">
                    {exportData}
                </div>
                <div>
                  <h2>Daftar Akun Pengguna</h2>
                </div>
                <div className="search-container">
                    <Search
                        placeholder="Search by Nama"
                        onChange={handleSearch}
                        style={{ width: 300}}
                        enterButton
                    />
                </div>
            </div>
      <Table
        className="ant-table"
        columns={columns}xy
        dataSource={filteredData}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChange,
        }}
        scroll={{x:190,  y: 370 }}
      />
    </div>
    );
};

export default DataPengguna;