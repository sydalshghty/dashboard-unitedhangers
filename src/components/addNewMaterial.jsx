import imgReturn from "../images/Group 429.svg";
//import UserName from "./userName";
import "../css/addNewMaterial.css";
import { useNavigate } from "react-router-dom";
import "../css/addNewSlider.css";
import { useState } from "react";
import { token } from "./token";
import { authFetch } from "./authFetch.js";

function AddNewMaterial() {

    const [namePlaceholder, setNamePlaceholder] = useState("Name");
    const [nameMaterial, setNameMaterial] = useState("");
    const [noColor, setNoColor] = useState(false); // ✅ حالة checkbox

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/RowMaterial");
    };

    const AddNewMaterial = async () => {
        if (!nameMaterial.trim()) {
            alert("⚠️ Please enter material name before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("name", nameMaterial);
        formData.append("no_color", noColor ? 1 : 0); // ✅ هنا بيتبعت 1 لو checked و 0 لو مش

        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/materials/new`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            console.log(data);
            alert("✅ Material added successfully!");
            handleNavigate();
        } catch (error) {
            console.error("Error: Not Found Data", error);
            alert("❌ Failed to add material. Please try again.");
        }
    };

    return (
        <div className="Add-New-Material-Departament">
            <div className="heading-AddNewMaterial">
                <div className="col-material">
                    <img onClick={handleNavigate} src={imgReturn} alt="imgReturn" />
                    <p>Add New Material</p>
                </div>
            </div>

            <div className="col-input-material">
                <p>Name</p>
                <input
                    onFocus={() => setNamePlaceholder("")}
                    onBlur={() => setNamePlaceholder("Name")}
                    onChange={(e) => setNameMaterial(e.target.value)}
                    type="text"
                    placeholder={namePlaceholder}
                    name="Name-Material"
                />
            </div>

            {/* ✅ Checkbox Section */}
            <div className="col-checkbox-material" style={{ marginTop: "15px", display: "flex", gap: "8px", paddingLeft: "40px" }}>
                <span>No Color:</span>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        checked={noColor}
                        onChange={() => setNoColor(!noColor)}
                        style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                        }}
                    />
                </label>
            </div>

            <div className="Cancel-And-Delete">
                <button className="cancel" onClick={handleNavigate}>Cancel</button>
                <button
                    className="submit"
                    onClick={AddNewMaterial}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AddNewMaterial;

