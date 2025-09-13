import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, notification } from "antd";
import bcrypt from 'bcryptjs';  // Hapus import bcrypt karena tidak digunakan lagi

function PenggunaForm(props, ref) {
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
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [NoTelp, setNoTelp] = useState("");
    const [Alamat, setAlamat] = useState("");
    const [Rt, setRT] = useState("");
    const [Rw, setRw] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`https://84a67d6d7383.ngrok-free.app/data/auth/${idData}`, {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            });

            if (res.data && res.data.user) { // Pastikan data dan user ada
                setNamaLengkap(res.data.user.nama_lengkap);
                setPassword(res.data.user.password); // Set password langsung tanpa hashing
                setNoTelp(res.data.user.nomor_telepon);
                setEmail(res.data.user.email);
                setAlamat(res.data.user.alamat_rumah);
                setRT(res.data.user.rt);
                setRw(res.data.user.rw);
                console.log(res.data.user);
            } else {
                console.error("Data user tidak ditemukan:", res.data);
                // Handle jika data tidak sesuai, misalnya tampilkan pesan error
                openNotificationWithIcon("error", "Error", "Data pengguna tidak ditemukan.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            openNotificationWithIcon("error", "Error", "Gagal mengambil data.");
        }
    };


    const handleSubmit = async () => {
        const body = {
            nama_lengkap: NamaLengkap,
            password: Password, // Kirim password apa adanya (tanpa hashing)
            email: Email,
            nomor_telepon: NoTelp,
            alamat_rumah: Alamat,
            rt: Rt,
            rw: Rw,
        };

        const headersLogin = {
            "ngrok-skip-browser-warning": "69420",
            "Content-type": "application/json",
            Accept: "application/json",
        };

        if (mode === "edit") {
            try {
                const res = await axios.put(
                    `https://84a67d6d7383.ngrok-free.app/data/editauth/${idData}`,
                    JSON.stringify(body),
                    {
                        headers: headersLogin,
                    }
                );

                openNotificationWithIcon("success", "Data berhasil diperbarui");
                setTimeout(() => {
                    navigate("/data/user");
                }, 1000);

            } catch (error) {
                console.error("Error updating data:", error);
                openNotificationWithIcon("error", "Error", "Gagal memperbarui data.");
            }
        }
    };

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
            >
                <Form.Item label="Nama Lengkap" rules={[{ required: true }]} className="form-item">
                    <Input
                        name="NamaLengkap"
                        value={NamaLengkap}
                        onChange={(e) => setNamaLengkap(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Email" rules={[{ required: true }]} className="form-item">
                    <Input
                        name="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Nomor Telepon" rules={[{ required: true }]} className="form-item">
                    <Input
                        name="nomor_telepon"
                        value={NoTelp}
                        onChange={(e) => setNoTelp(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Alamat Rumah" rules={[{ required: true }]} className="form-item">
                    <Input
                        name="alamat_rumah"
                        value={Alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Rukun Tetangga" rules={[{ required: true }]} className="form-item">
                    <Input name="rt" value={Rt} onChange={(e) => setRT(e.target.value)} />
                </Form.Item>

                <Form.Item label="Rukun Warga" rules={[{ required: true }]} className="form-item">
                    <Input name="rw" value={Rw} onChange={(e) => setRw(e.target.value)} />
                </Form.Item>

                <Form.Item label="Password" rules={[{ required: true }]} className="form-item">
                    <Input
                        name="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                </Form.Item>
            </Form>
        </div>
    );}

const ForwardedPenggunaForm = React.forwardRef(PenggunaForm);
export default ForwardedPenggunaForm;