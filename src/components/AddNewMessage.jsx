import imgMessage from "../images/Group 429.svg";
import UserName from "./userName";
import "../css/AddNewMessage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function AddNewMessage() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/Messages");
    }

    // validation-Send-New-Message
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [message, setmessage] = useState("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("message", message);

    const PostMessageData = async () => {
        try {
            await fetch(`https://united-hanger-2025.up.railway.app/api/questions/new`, {
                method: "Post",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert("✅ Data has been sent successfully!");
                    handleNavigate();
                })
        }
        catch (error) {
            console.error("Error: Not Send Data");
            alert("❌ Failed to send data.");
        }
    };

    const SendData = () => {
        PostMessageData();
    }
    return (
        <div className="AddNewMessage-Departament">
            <div className="heading-AddNewMessage">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgMessage} alt="imgMessage" />
                    <p>Add New Message</p>
                </div>
                <div className="col-userName">
                    <UserName />
                </div>
            </div>
            <form action={""} onSubmit={(e) => {
                e.preventDefault();
                SendData();
            }}>
                <div className="content-Message">
                    <div className="Name-Phone-Col">
                        <div className="col-Name">
                            <p>Name</p>
                            <input
                                onChange={(e) => {
                                    setname(e.target.value);
                                }}
                                type="text" placeholder="Name" required />
                        </div>
                        <div className="col-Phone">
                            <p>Phone</p>
                            <input
                                onChange={(e) => {
                                    setphone(e.target.value);
                                }}
                                type="number" placeholder="Phone" required />
                        </div>
                    </div>
                    <div className="Email-Message-Col">
                        <div className="Email-Col">
                            <p>Email</p>
                            <input
                                onChange={(e) => {
                                    setemail(e.target.value);
                                }}
                                type="email" placeholder="Email" required />
                        </div>
                        <div className="Message-Col">
                            <p>Message</p>
                            <input
                                onChange={(e) => {
                                    setmessage(e.target.value);
                                }}
                                type="text" placeholder="Message . . ." required />
                        </div>
                    </div>
                </div>
                <div className="Cancel-And-Delete">
                    <button className="cancel">Cancel</button>
                    <input type="Submit" className="submit" />
                </div>
            </form>
        </div>
    )
}
export default AddNewMessage;