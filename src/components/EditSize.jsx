import imgSize from "../images/Group 429.svg";
//import UserName from "./userName";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../css/EditSize.css";
import { useNavigate, useParams } from "react-router-dom";
import { token } from "./token";
import Loading from "./Loading";
import { authFetch } from "./authFetch.js";

function EditSize() {
    const { SizeID } = useParams();
    const navigate = useNavigate();

    const [Value, setValue] = useState("Value");
    const [Unit, setUnit] = useState("Unit");
    const [size, setSize] = useState(null);
    const [valueSize, setValueSize] = useState("");
    const [unitSize, setUnitSize] = useState("");

    const handleNavigate = () => navigate("/Sizes");

    /* Get Size Data */
    const getSizeOnly = async () => {
        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/sizes/${SizeID}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            });
            const data = await response.json();
            setSize(data.size);
        } catch (error) {
            console.error("Error: Not Found Data", error);
        }
    };

    useEffect(() => {
        getSizeOnly();
    }, []);

    /* Edit Size */
    const PutSize = async () => {
        if (!valueSize.trim() || !unitSize.trim()) {
            Swal.fire("⚠️", "Please enter both value and unit before saving.", "warning");
            return;
        }

        const formData = new FormData();
        formData.append("value", valueSize);
        formData.append("unit", unitSize);

        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/sizes/${SizeID}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            Swal.fire("✅", "Size has been updated successfully!", "success");
            handleNavigate();
        } catch (error) {
            console.error("Error updating size", error);
            Swal.fire("❌", "An error occurred. Please try again.", "error");
        }
    };

    /* Toggle Visibility */
    const toggleVisibility = async (newVisibility) => {
        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/toggle-visibility/size/${SizeID}`,
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
            setSize((prev) => ({
                ...prev,
                visible: newVisibility,
            }));

            Swal.fire("✅", "Visibility updated successfully!", "success");
        } catch (error) {
            console.error("Error toggling visibility", error);
            Swal.fire("❌", "Failed to update visibility.", "error");
        }
    };

    if (!size) return <Loading />;

    return (
        <div className="EditSize-Departament">
            <div className="EditSize-Heading">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgSize} alt="imgSize" />
                    <p>Size</p>
                </div>
            </div>

            <div className="col-input-AddNewSize">
                <div className="col-Value">
                    <p>Value</p>
                    <input
                        onFocus={() => setValue("")}
                        onBlur={() => setValue("Value")}
                        onChange={(e) => setValueSize(e.target.value)}
                        type="text"
                        placeholder={size.value}
                        name="Value"
                    />
                </div>
                <div className="col-Unit">
                    <p>Unit</p>
                    <input
                        onFocus={() => setUnit("")}
                        onBlur={() => setUnit("Unit")}
                        onChange={(e) => setUnitSize(e.target.value)}
                        type="text"
                        placeholder={size.unit}
                        name="Unit"
                    />
                </div>
            </div>

            <div className="visibility-buttons">
                <button
                    className="Edit"
                    onClick={PutSize}
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
                {size.is_visible === true ?
                    <button
                        type="button"
                        className={`btn btn-hidden ${!size.visible ? "active" : ""}`}
                        onClick={() => toggleVisibility(false)}
                    >
                        Hidden
                    </button>
                    :
                    <button
                        type="button"
                        className={`btn btn-visible ${size.visible ? "active" : ""}`}
                        onClick={() => toggleVisibility(true)}
                    >
                        Visible
                    </button>
                }

            </div>
        </div>
    );
}

export default EditSize;
