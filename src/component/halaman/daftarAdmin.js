import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"; 
import { Input, Button } from "antd"; 
import "../../assets/style/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/Logo.png'

const DaftarAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDaftar = async (e) => {
    e.preventDefault(); // cegah reload default form
    setLoading(true);
    try {
      const response = await axios.post(
        "https://84a67d6d7383.ngrok-free.app/auth/admin/register",
        { email, password, name }
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard"); // langsung ke dashboard
      } else {
        alert("Pendaftaran berhasil, silakan login.");
        navigate("/login"); // fallback kalau API tidak kasih token
      }
    } catch (error) {
      console.error("Pendaftaran gagal:", error);
      alert("Pendaftaran gagal! Silakan cek kembali data Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <img src={logo} className="logo" alt="Logo" />
      <div className="login-container">
        <h2>Daftar Akun</h2>

        {/* Form wrapper biar Enter bisa jalan */}
        <form onSubmit={handleDaftar}>
          <div className="input-group">
            <label>Nama Lengkap</label>
            <Input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group password-container">
            <label>Password</label>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              required
            />
          </div>

          <Button
            type="primary"
            className="login-button"
            htmlType="submit" // supaya Enter bisa submit
            loading={loading}
            block
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DaftarAdmin;
