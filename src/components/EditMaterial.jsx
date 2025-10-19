/*import imgMaterial from "../images/Group 429.svg";
import UserName from "./userName";
import "../css/EditMaterial.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { token } from "./token";
import Loading from "./Loading";
import { authFetch } from "./authFetch.js";
function EditMaterial() {
    const { MaterialID } = useParams();

    const [namePlaceholder, setNamePlaceholder] = useState("Name");

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/RowMaterial");
    }

    const [Material, setMaterial] = useState([]);

    const getMaterial = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app//api/materials/${MaterialID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => response.json())
                .then(data => setMaterial(data.material))
        }
        catch (error) {
            console.error("Error: Not Found Data", error)
        }
    }

    useEffect(() => {
        getMaterial();
    }, [])

    const [newName, setNewName] = useState("");

    const PutMaterial = () => {

        const formData = new FormData();
        formData.append("name", newName);

        try {
            authFetch(`https://united-hanger-2025.up.railway.app//api/materials/${MaterialID}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            }).then((response) => response.json())
                .then(data => console.log(data))
        }
        catch (error) {
            console.error("Error: Not Found Data", error)
        }
    }

    return (
        <div className="Edit-Material-Departament">
            <div className="Edit-Material-Heading">
                <div className="col-material">
                    <img onClick={handleNavigate} src={imgMaterial} alt="img-Material" />
                    <p>Material</p>
                </div>
                <div className="col-userName">
                    <UserName />
                </div>
            </div>
            {!Material ? <Loading />
                :
                <>
                    <div className="col-input-material">
                        <p>Name</p>
                        <input
                            onFocus={() => {
                                setNamePlaceholder("")
                            }}
                            onBlur={() => {
                                setNamePlaceholder("Name")
                            }}
                            onChange={(e) => {
                                setNewName(e.target.value);
                            }}
                            type="text" placeholder={Material.name} name="Name-Material" />
                        <div className="visibility-buttons visible-materials">
                            <button className="Edit" onClick={async () => {
                                PutMaterial();
                                handleNavigate();
                            }} style={{
                                width: "200px",
                                height: "40px",
                                cursor: "pointer",
                                border: "none",
                                backgroundColor: "#5A67BA",
                                color: "white",
                                borderRadius: "4px"
                            }}>Edit</button>
                            <button
                                type="button"
                                className={`btn btn-visible`}
                            >
                                Visible
                            </button>

                            <button
                                type="button"
                                className={`btn btn-hidden`}
                            >
                                Hidden
                            </button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
export default EditMaterial;*/

import imgMaterial from "../images/Group 429.svg";
import UserName from "./userName";
import "../css/EditMaterial.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { token } from "./token";
import Loading from "./Loading";
import { authFetch } from "./authFetch.js";

function EditMaterial() {
    const { MaterialID } = useParams();
    const navigate = useNavigate();

    const [material, setMaterial] = useState(null);
    const [newName, setNewName] = useState("");

    const handleNavigate = () => {
        navigate("/RowMaterial");
    };

    /* Get Material Data */
    const getMaterial = async () => {
        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/materials/${MaterialID}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setMaterial(data.material);
        } catch (error) {
            console.error("Error: Not Found Data", error);
        }
    };

    useEffect(() => {
        getMaterial();
    }, []);

    /* Edit Material */
    const PutMaterial = async () => {
        if (!newName.trim()) {
            Swal.fire("⚠️", "Please enter material name before saving.", "warning");
            return;
        }

        const formData = new FormData();
        formData.append("name", newName);

        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/materials/${MaterialID}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
            const data = await response.json();
            console.log(data);
            Swal.fire("✅", "Material has been updated successfully!", "success");
            handleNavigate();
        } catch (error) {
            console.error("Error updating material", error);
            Swal.fire("❌", "An error occurred. Please try again.", "error");
        }
    };

    /* Toggle Visibility */
    const toggleVisibility = async (newVisibility) => {
        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/toggle-visibility/material/${MaterialID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            console.log("Visibility updated:", data);

            // تحديث حالة الواجهة
            setMaterial((prev) => ({
                ...prev,
                visible: newVisibility,
            }));

            Swal.fire("✅", "Material has been updated successfully!", "success");
        } catch (error) {
            console.error("Error toggling visibility", error);
            Swal.fire("❌", "Failed to update visibility.", "error");
        }
    };

    if (!material) return <Loading />;

    return (
        <div className="Edit-Material-Departament">
            <div className="Edit-Material-Heading">
                <div className="col-material">
                    <img onClick={handleNavigate} src={imgMaterial} alt="img-Material" />
                    <p>Material</p>
                </div>
                <div className="col-userName">
                    <UserName />
                </div>
            </div>

            <div className="col-input-material">
                <p>Name</p>
                <input
                    onChange={(e) => setNewName(e.target.value)}
                    type="text"
                    placeholder={material.name}
                    name="Name-Material"
                />

                <div className="visibility-buttons visible-materials">
                    <button
                        className="Edit"
                        onClick={PutMaterial}
                        style={{
                            width: "200px",
                            height: "40px",
                            cursor: "pointer",
                            border: "none",
                            backgroundColor: "#5A67BA",
                            color: "white",
                            borderRadius: "4px",
                        }}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        className={`btn btn-visible ${material.visible ? "active" : ""}`}
                        onClick={() => toggleVisibility(true)}
                    >
                        Visible
                    </button>

                    <button
                        type="button"
                        className={`btn btn-hidden ${!material.visible ? "active" : ""}`}
                        onClick={() => toggleVisibility(false)}
                    >
                        Hidden
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditMaterial;
