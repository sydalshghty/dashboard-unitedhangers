import UserName from "./userName";
import "../css/AddNewEmail.css";
import { useState } from "react";
import { token } from "./token";
import { authFetch } from "./authFetch.js";
import { useNavigate } from "react-router-dom";
import imgReturn from "../images/Group 429.svg";

function AddNewEmail() {
    const navigate = useNavigate("");
    const handleNavigate = () => {
        navigate("/Email")
    }
    const [value, setValue] = useState("");

    const SendNewEmail = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("value", value);

            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/emails/new`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("✅ Email added successfully");
                setValue("");
                handleNavigate();
            } else {
                alert("❌ Failed to add Email. Please try again");
            }
        } catch (error) {
            console.error("Error Not Found Data", error);
            alert("❌ Failed to add Email. Please try again");
        }
    };

    return (
        <div className="sizes-Departament">
            <div className="heading-sizes">
                <div className="add-new-Email">
                    <img src={imgReturn} alt="img-return" onClick={handleNavigate} style={{ cursor: "pointer" }} />
                    <p className="p-title">Add New Email</p>
                </div>
                <div className="col-userName">
                    <UserName />
                </div>
            </div>
            <form className="content-Add-new-Email" onSubmit={SendNewEmail}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="email"
                    placeholder="Enter New Email"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddNewEmail;
