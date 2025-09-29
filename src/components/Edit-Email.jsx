import imgReturn from "../images/Group 429.svg";
import UserName from "./userName";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { token } from "./token";
import { authFetch } from "./authFetch.js";
function EditEmail() {
    const navigate = useNavigate("");
    const handleNavigate = () => {
        navigate("/Email");
    }

    const { EmailID } = useParams();
    const [email, setEmail] = useState([]);
    const getEmailInformation = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/emails/${EmailID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then(data => setEmail(data.email))
        }
        catch (error) {
            console.error("Error Not Found Data", error)
        }
    }

    useEffect(() => {
        getEmailInformation();
    }, []);

    // Edit Email
    const [changeEmail, setChangeEmail] = useState("");
    const formData = new FormData();
    formData.append("value", changeEmail);
    const EditEmail = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/emails/${EmailID}`, {
                method: "Put",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
                .then((response) => response.json())
                .then(data => {
                    console.log(data);
                    alert("Email updated successfully ✅.");
                    handleNavigate();
                })
        }
        catch (error) {
            console.error("Error Not Found Data", error);
            alert("Failed to update email. Please try again.");
        }
    }

    return (
        <div className="sizes-Departament EditEmail">
            <div className="heading-sizes">
                <div className="add-new-Email">
                    <img src={imgReturn} alt="img-return" style={{ cursor: "pointer" }} onClick={handleNavigate} />
                    <p className="p-title">Edit Email</p>
                </div>
                <div className="col-userName">
                    <UserName />
                </div>
            </div>
            {!email ?
                <h1>loading ...</h1>
                :
                <form className="col-Edit-Email" onSubmit={(e) => {
                    e.preventDefault();
                    EditEmail();
                }
                }>
                    <input type="text" placeholder={email.value}
                        required
                        onChange={(e) => {
                            setChangeEmail(e.target.value);
                        }}
                    />
                    <button type="submit">Edit</button>
                </form>
            }
        </div>
    )
}
export default EditEmail;