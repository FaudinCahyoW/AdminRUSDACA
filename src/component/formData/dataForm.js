import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Input, notification, Select, Image } from "antd";
// import "../../assets/style/edit.css";

const { Option } = Select;

function DataForm(props, ref) {
  const mode = props.typeForm;
  const idData = props.idData;

  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, title, desc) => {
    api[type]({
      message: title,
      description: desc,
    });
  };

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit,
  }));

  const [NamaLengkap, setNamaLengkap] = useState("");
  const [LuasRumah, setLuasRumah] = useState("");
  const [JmlPenghuni, setJmlPenghuni] = useState("");
  const [JnsToilet, setJnsToilet] = useState("");
  const [JnsKamarMandi, setJnsKamarMandi] = useState("");
  const [JnsRangkaDinding, setJnsRangkaDinding] = useState("");
  const [JnsLantai, setJnsLantai] = useState("");
  const [StatusRumah, setStatusRumah] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`https://84a67d6d7383.ngrok-free.app/data/ambildata/${idData}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-type": "application/json",
          Accept: "application/json",
        },
      });

      const data = response.data.data;
      if (data) {
        setNamaLengkap(data.nama_lengkap || "");
        setLuasRumah(data.luas_rumah || "");
        setJmlPenghuni(data.jml_penghuni || "");
        setJnsToilet(data.sdia_toilet || "");
        setJnsKamarMandi(data.jenis_kmrMandi || "");
        setJnsRangkaDinding(data.rngka_dinding || "");
        setJnsLantai(data.jns_lantai || "");
        setStatusRumah(data.status || "");

        console.log("Data setelah set state:", {
          NamaLengkap,
          LuasRumah,
          JmlPenghuni,
          JnsToilet,
          JnsKamarMandi,
          JnsRangkaDinding,
          JnsLantai,
          StatusRumah,
        });
      } else {
        console.error("Data tidak ditemukan di respons server");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error);
      openNotificationWithIcon("error", "Error", "Gagal mengambil data");
    }
  };

  async function handleSubmit() {
    const body = {
      nama_lengkap: NamaLengkap,
      luas_rumah: LuasRumah,
      jumlah_penghuni: JmlPenghuni,
      sdia_toilet: JnsToilet,
      jenis_kmrMandi: JnsKamarMandi,
      rngka_dinding: JnsRangkaDinding,
      jns_lantai: JnsLantai,
      status: StatusRumah,
    };
    const headersLogin = {
      "ngrok-skip-browser-warning": "69420",
      "Content-type": "application/json",
      Accept: "application/json",
    };
    if (mode === "edit") {
      await axios
        .put(`https://84a67d6d7383.ngrok-free.app/data/editdata/${idData}`, JSON.stringify(body), {
          headers: headersLogin,
        })
        .then(() => {
          openNotificationWithIcon("success", "Data berhasil diperbarui");
          setTimeout(() => {
            navigate("/datawarga");
          }, 1000);
        })
        .catch((err) => {
          openNotificationWithIcon("error", "Error", "Gagal memperbarui data");
        });
    }
  }

  return (
    <div>
      {contextHolder}
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        labelAlign="left"
        colon={false}
        requiredMark={false}
        style={{ flex: 1 }}
      >
        <Form.Item
          label="Nama Lengkap"
          rules={[
            {
              required: true,
            },
          ]}
          className="form-item"
          style={{ marginBottom: '19px' }} 
        >
          <Input name="nama_lengkap" value={NamaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Luas Rumah"
          rules={[
            {
              required: true,
            },
          ]}
          className="form-item"
          style={{ marginBottom: '19px' }} 
        >
          <Input name="luas_rumah" value={LuasRumah} onChange={(e) => setLuasRumah(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Jumlah Penghuni"
          rules={[
            {
              required: true,
            },
          ]}
          className="form-item"
          style={{ marginBottom: '19px' }} 
        >
          <Input name="jml_penghuni" value={JmlPenghuni} onChange={(e) => setJmlPenghuni(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Ketersediaan Toilet"
          rules={[
            {
              required: true,
            },
          ]}
          className="form-item"
          style={{ marginBottom: '19px' }} 
        >
          <Select value={JnsToilet} onChange={(value) => setJnsToilet(value)}>
            <Option value="ada" name="ada">Ada</Option>
            <Option value="tidak ada" name="tidak ada">Tidak Ada</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Jenis Kamar Mandi"
          rules={[
            {
              required: true,
            },
          ]}
          className="form-item"
          style={{ marginBottom: '19px' }} 
        >
          <Select value={JnsKamarMandi} onChange={(value) => setJnsKamarMandi(value)}>
            <Option value="pribadi" name="pribadi">Pribadi</Option>
            <Option value="umum" name="umum">Umum</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Jenis Rangka Dinding"
          rules={[
            {
              required: true,
            },
          ]}
          className="form-item"
          style={{ marginBottom: '19px' }} 
        >
          <Select value={JnsRangkaDinding} onChange={(value) => setJnsRangkaDinding(value)}>
            <Option value="beton" name="beton">Beton</Option>
            <Option value="Lainnya" name="lainnya">Lainnya</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Jenis Lantai"
          rules={[
            {
              required: true,
            },
          ]}
          className="form-item"
          style={{ marginBottom: '19px' }} 
        >
          <Select value={JnsLantai} onChange={(value) => setJnsLantai(value)}>
            <Option value="marmer" name="marmer">Marmer</Option>
            <Option value="keramik" name="keramik">Keramik</Option>
            <Option value="lainnya" name="lainnya">Lainnya</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Status Rumah"
          rules={[
            {
              required: true,
            },
          ]}
          className="form-item"
          style={{ marginBottom: '19px' }} 
        >
          <Input name="status" value={StatusRumah} onChange={(e) => setStatusRumah(e.target.value)} />
        </Form.Item>
      </Form>
    </div>
  );
}

const ForwardedDataForm = React.forwardRef(DataForm);
export default ForwardedDataForm;
