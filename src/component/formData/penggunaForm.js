import React, {useEffect, useState, useImperativeHandle, forwardRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Input, notification } from "antd";
// import "../../assets/style/edit.css"

function PenggunaForm (props, ref) {
    const mode = props.typeForm
    const idData = props.idData

    const [api, contextHolder] = notification.useNotification()
    const navigate = useNavigate()

    const openNotificationWithIcon = (type, title, desc) => {
        api[type]({
            message: title,
            description: desc
        })
    }

    useImperativeHandle(ref, () => ({
        handleSubmit: handleSubmit,
    }))

    const [NamaLengkap, setNamaLengkap] = useState("")
    const [NIK, setNIK] = useState("")
    const [Email, setEmail] = useState("")
    const [NoTelp, setNoTelp] = useState("")
    const [Alamat, setAlamat] = useState("")
    const [Rt, setRT] = useState("")
    const [Rw, setRw] = useState("")

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        axios.get(`https://6a34-103-162-112-254.ngrok-free.app/data/auth/${idData}`, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-type": "application/json",
                Accept: "application/json"
            }
        })
        .then((res) => {
            setNamaLengkap(res.data.user.nama_lengkap)
            setNIK(res.data.user.nik)
            setNoTelp(res.data.user.nomor_telepon)
            setEmail(res.data.user.email)
            setAlamat(res.data.user.alamat_rumah)
            setRT(res.data.user.rt)
            setRw(res.data.user.rw)
            console.log(res.data.user)
        })
    }

    async function handleSubmit(){
        const body = {
            nama_lengkap: NamaLengkap,
            nik: NIK,
            email:Email,
            nomor_telepon: NoTelp,
            alamat_rumah: Alamat
        }
        const headersLogin = {
            "ngrok-skip-browser-warning": "69420",
            "Content-type": "application/json",
            Accept: "application/json"
        }
        if (mode === "edit"){
            await axios.put(`https://6a34-103-162-112-254.ngrok-free.app/data/editauth/${idData}`, JSON.stringify(body),{
                headers: headersLogin
            })
            .then(() => {
                openNotificationWithIcon("success", "Data berhasil diperbarui")
                setTimeout(() => {
                    navigate("/data/user")
                }, 1000)
            })
            .catch((err) => {
                openNotificationWithIcon("error", "Error", "Gagal")
            })
        }
    }

return(
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
            
            colon= {false}
            requiredMark= {false}
        >
                <Form.Item
                    label="Nama Lengkap"
                    
                    rules={[
                      {
                        required: true,
                        
                      },
                    ]}
                    className="form-item"
                >
                    <Input  name= "NamaLengkap"
                        value={NamaLengkap}
                        onChange={(e) => setNamaLengkap(e.target.value)}
                        
                    />

                </Form.Item>

                <Form.Item
                    label="Nomor NIK"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    className="form-item"

                >
                    <Input  name="nik"
                        value={NIK}
                        onChange={(e) => setNIK(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    className="form-item"

                >
                    <Input  name="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Nomor Telepon"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    className="form-item"

                >
                    <Input  name="nomor_telepon"
                        value={NoTelp}
                        onChange={(e) => setNoTelp(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Alamat Rumah"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    className="form-item"

                >
                    <Input name= "alamat_rumah"
                        value={Alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                    />
                </Form.Item>  
                <Form.Item
                    label="Rukun Tetangga"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    className="form-item"

                >
                    <Input name= "rt"
                        value={Rt}
                        onChange={(e) => setRT(e.target.value)}
                    />
                </Form.Item>  
                <Form.Item
                    label="Rukun Warga"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    className="form-item"

                >
                    <Input name= "rw"
                        value={Rw}
                        onChange={(e) => setRw(e.target.value)}
                    />
                </Form.Item>  
        </Form>
    </div>
    )
}

const ForwardedPenggunaForm = React.forwardRef(PenggunaForm)
export default ForwardedPenggunaForm;