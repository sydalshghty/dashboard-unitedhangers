/*import imgColor from "../images/Group 429.svg";
import UserName from "./userName";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import "../css/color.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { token } from "./token";
import Loading from "./Loading";
import { authFetch } from "./authFetch.js";
function Color() {
    const { ColorID } = useParams();

    const [name, setname] = useState("");
    const [hex_code, sethex_code] = useState("");

    const [color, setColor] = useState('#F6F6FB');
    const [showPicker, setShowPicker] = useState(false);
    const [Name, setName] = useState("Name");

    const handleName = () => {
        setName("");
    }

    const handleInputChange = (event) => {
        setColor(event.target.value);
    };

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        sethex_code(newColor.hex);
        setShowPicker(false);
    };

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const blurtogglePicker = () => {
        setShowPicker(false);
    }
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/Colors")
    }
    const [code, setCode] = useState("Code");

    const [item, setItem] = useState([]);

    const getColor = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app//api/colors/${ColorID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => response.json())
                .then(data => setItem(data.color))
        }
        catch (error) {
            console.error("Error: Not Found Data", error)
        }
    }

    useEffect(() => {
        getColor();
    }, []);

    console.log(item);


    const EditColor = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("hex_code", hex_code);

        try {
            await authFetch(`https://united-hanger-2025.up.railway.app//api/colors/${ColorID}`, {
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
        <div className="color-departament">
            <div className="heading-color">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgColor} alt="imgColor" />
                    <p>Color</p>
                </div>
                <div className="col-userName">
                    <UserName />
                </div>
            </div>
            {!item ? <Loading />
                :
                <>
                    <div className="col-inputs-content">
                        <div className="col-Name-Code">
                            <div className="col-name">
                                <p>Name</p>
                                <input
                                    onFocus={handleName}
                                    onBlur={() => {
                                        setName("Name")
                                    }}
                                    onClick={blurtogglePicker}
                                    onChange={(e) => {
                                        setname(e.target.value)
                                    }}
                                    type="text" placeholder={item.name} name="Name" />
                            </div>
                            <div className="col-code">
                                <p>Code</p>
                                <input
                                    onClick={blurtogglePicker}
                                    onFocus={() => {
                                        setCode("");
                                    }}
                                    onBlur={() => {
                                        setCode("Code");
                                    }} type="text" placeholder={item.code} name="Code" />
                            </div>
                        </div>
                        <div className="col-Hex-code">
                            <p>Hex Code</p>
                            <div>
                                <input
                                    value={color}
                                    onClick={togglePicker}
                                    onChange={handleInputChange}
                                    style={{ backgroundColor: color, padding: '10px', borderRadius: '4px' }}
                                    type="text" placeholder={item.hex_code} name="Hex Code"
                                />
                                {showPicker && (
                                    <div style={{ position: 'absolute', zIndex: 2, marginTop: "20px" }}>
                                        <ChromePicker color={color} onChangeComplete={handleColorChange} />
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="visibility-buttons">
                        <button className="Edit" onClick={() => {
                            EditColor();
                            handleNavigate();
                        }} style={{ width: "200px", height: "40px", cursor: "pointer", border: "none", backgroundColor: "#5A67BA", color: "white", borderRadius: "4px" }}>Edit</button>
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
                </>
            }
        </div>
    )
}
export default Color;*/

import imgColor from "../images/Group 429.svg";
import UserName from "./userName";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import "../css/color.css";
import Swal from "sweetalert2";
import { token } from "./token";
import Loading from "./Loading";
import { authFetch } from "./authFetch.js";

function Color() {
    const { ColorID } = useParams();
    const navigate = useNavigate();

    const [name, setname] = useState("");
    const [hex_code, sethex_code] = useState("");
    const [color, setColor] = useState('#F6F6FB');
    const [showPicker, setShowPicker] = useState(false);
    const [item, setItem] = useState(null);

    const handleNavigate = () => {
        navigate("/Colors");
    };

    const handleInputChange = (event) => {
        setColor(event.target.value);
    };

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        sethex_code(newColor.hex);
        setShowPicker(false);
    };

    const togglePicker = () => setShowPicker(!showPicker);
    const blurtogglePicker = () => setShowPicker(false);

    /* Get Color Data */
    const getColor = async () => {
        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/colors/${ColorID}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await response.json();
            setItem(data.color);
        } catch (error) {
            console.error("Error: Not Found Data", error);
        }
    };

    useEffect(() => {
        getColor();
    }, []);

    /* Edit Color */
    const EditColor = async () => {
        if (!name && !hex_code) {
            Swal.fire("⚠️", "Please enter color data before saving.", "warning");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("hex_code", hex_code);

        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/colors/${ColorID}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });
            const data = await response.json();
            console.log(data);
            Swal.fire("✅", "Category has been updated successfully!", "success");
            handleNavigate();
        } catch (error) {
            console.error("Error: Not Found Data", error);
        }
    };

    /* Toggle Visibility */
    const toggleVisibility = async (newVisibility) => {
        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/toggle-visibility/color/${ColorID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            console.log("Visibility updated:", data);

            // تحديث حالة الواجهة
            setItem(prev => ({
                ...prev,
                visible: newVisibility
            }));

            alert("✅ Color has been updated successfully!");

        } catch (error) {
            console.error("Error toggling visibility", error);
            alert("❌ Failed to update visibility.");
        }
    };

    if (!item) return <Loading />;

    return (
        <div className="color-departament">
            <div className="heading-color">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgColor} alt="imgColor" />
                    <p>Color</p>
                </div>
                <div className="col-userName">
                    <UserName />
                </div>
            </div>

            <div className="col-inputs-content">
                <div className="col-Name-Code">
                    <div className="col-name">
                        <p>Name</p>
                        <input
                            onClick={blurtogglePicker}
                            onChange={(e) => setname(e.target.value)}
                            type="text"
                            placeholder={item.name}
                            name="Name"
                        />
                    </div>

                    <div className="col-code">
                        <p>Code</p>
                        <input
                            onClick={blurtogglePicker}
                            type="text"
                            placeholder={item.code}
                            name="Code"
                            readOnly
                        />
                    </div>
                </div>

                <div className="col-Hex-code">
                    <p>Hex Code</p>
                    <div>
                        <input
                            value={color}
                            onClick={togglePicker}
                            onChange={handleInputChange}
                            style={{ backgroundColor: color, padding: '10px', borderRadius: '4px' }}
                            type="text"
                            placeholder={item.hex_code}
                            name="Hex Code"
                        />
                        {showPicker && (
                            <div style={{ position: 'absolute', zIndex: 2, marginTop: "20px" }}>
                                <ChromePicker color={color} onChangeComplete={handleColorChange} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* visibility buttons */}
            <div className="visibility-buttons">
                <button
                    className="Edit"
                    onClick={() => {
                        EditColor();
                    }}
                    style={{
                        width: "200px",
                        height: "40px",
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: "#5A67BA",
                        color: "white",
                        borderRadius: "4px"
                    }}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className={`btn btn-visible ${item.visible ? "active" : ""}`}
                    onClick={() => toggleVisibility(true)}
                >
                    Visible
                </button>

                <button
                    type="button"
                    className={`btn btn-hidden ${!item.visible ? "active" : ""}`}
                    onClick={() => toggleVisibility(false)}
                >
                    Hidden
                </button>
            </div>
        </div>
    );
}

export default Color;
