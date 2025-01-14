import React, { useRef} from "react";
import { useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import { Button, Card, notification, Image } from "antd";
import PenggunaForm from "../formData/penggunaForm"
import "../../assets/style/editPengguna.css"

const EditPengguna = () => {
    const { id } = useParams();
    const formRef = useRef()

   const [api, contextHolder] = notification.useNotification()
   const navigate = useNavigate()

   const openNotificationWithIcon = (type, title, desc) => {
    api[type]({
        messsage:title,
        description: desc
    })
   }

   const handleSave = async () => {
    if (formRef.current){
        const formEdit = await formRef.current.handleSubmit()
        if(formEdit){
            const headersLogin = {
                "ngrok-skip-browser-warning": "69420",
                "Content-type": "application/json",
                Accept: "application/json"
            }
            try{
                if (formEdit.mode === "edit"){
                    await axios.put(`https://6a34-103-162-112-254.ngrok-free.app/data/editauth/${id}`, JSON.stringify(formEdit.body), {
                        headers: headersLogin
                    })
                    openNotificationWithIcon("success", "Data edit successfully");
                    setTimeout(() => {
                        navigate("/data/user");
                    }, 1000);
                    }
                }catch (error){
                    openNotificationWithIcon("error", "Error", "Gagal")
                }
            }
        }
    }

    return(
        <div className="container" style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
            {contextHolder}
            <Card className="container-card">
                <PenggunaForm typeForm={"edit"} idData={id} ref={formRef}/>
                <Button
                    size="medium"
                    onClick={handleSave}
                    style={{
                        width: "400px",
                        backgroundColor: "green",
                        color: "white",
                        marginLeft: "200px"
                    }}
                >
                Simpan Pembaruan
                </Button>
            </Card>
            <Image src={require("../../assets/images/undraw_data_input_fxv2.png")} preview={false} style={{ maxWidth: '400px', marginTop:"80px", marginLeft:"100px" }} />

        </div>
    )
}



export default EditPengguna
