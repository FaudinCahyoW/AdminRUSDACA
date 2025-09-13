import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import "../../assets/style/login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from '../../assets/images/Logo.png'

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // cegah reload halaman default form
    setLoading(true);
    try {
      const response = await axios.post(
        "https://84a67d6d7383.ngrok-free.app/auth/admin/login",
        { email, password }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login gagal:", error);
      alert("Login gagal! Periksa kembali email dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <img src={logo} className="logo" alt="Logo" />
      <div className="login-container">
        <h2>Login Admin</h2>
        
        <form onSubmit={handleLogin}>
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
            htmlType="submit" // bikin bisa Enter
            loading={loading}
            block
          >
            {loading ? "Mohon Tunggu..." : "Login"}
          </Button>
        </form>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Tidak Punya Akun?{" "}
          <Link
            to="/daftar"
            style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}
          >
            Silahkan klik disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;
