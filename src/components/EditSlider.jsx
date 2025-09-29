import UserName from "./userName";
import imgIcon from "../images/Group 429.svg";
import "../css/EditSlider.css";
import { useNavigate } from "react-router-dom";
import imgProduct from "../images/61GsnUB4HuL 2 (2).png";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { token } from "./token";
import { authFetch } from "./authFetch.js";
function EditSlider() {
    const [title, setTitle] = useState("Title");
    const [description, setDescription] = useState("Description . . . ");
    const navigate = useNavigate();

    const handlNavigate = () => {
        navigate("/Slider");
    };
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Delete Slider",
            text: "Are You Sure You want to delete Slider 1",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            customClass: {
                popup: "my-Popup",
                title: "my-title",
                confirmButton: "my-delete",
                cancelButton: "my-cancel",
            },
        });

        if (result.isConfirmed) {
            try {
                await authFetch(
                    `https://united-hanger-2025.up.railway.app/api/slider/2`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                Swal.fire("Deleted!", "Slider has been deleted.", "success");
                navigate("/Slider");
            } catch (error) {
                Swal.fire("Error", "Failed to delete slider", "error");
            }
        }
    };

    // ✅ Fetch data
    const fetchData = async () => {
        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/slider/2`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (data?.slider) {
                setTitle(data.slider.title || "Title");
                setDescription(data.slider.description || "Description . . . ");
            }
        } catch (error) {
            console.error("Error Not Found Data", error);
            Swal.fire("Error", "Not Found Data", "error");
        }
    };

    // ✅ Edit function
    const handleEdit = async () => {
        try {
            await authFetch(
                `https://united-hanger-2025.up.railway.app/api/slider/2`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title, description }),
                }
            );
            Swal.fire("Updated!", "Slider updated successfully", "success");
        } catch (error) {
            Swal.fire("Error", "Failed to update slider", "error");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="EditSlider-Departament">
            <div className="heading-EditSlider">
                <div className="col-image">
                    <img onClick={handlNavigate} src={imgIcon} alt="imgIcon" />
                    <p>Edit Slider</p>
                </div>
                <div className="col-UserName">
                    <UserName />
                </div>
            </div>
            <div className="col-product-Edit">
                <div className="col-image-product">
                    <img src={imgProduct} alt="imgProduct" />
                </div>
                <div className="content-product-Edit">
                    <div className="col-title">
                        <p>Title</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-description">
                        <p>Description</p>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="col-Delete-Edit">
                <button onClick={handleDelete} className="delete">
                    Delete
                </button>
                <button onClick={handleEdit} className="Edit">
                    Edit
                </button>
            </div>
        </div>
    );
}

export default EditSlider;
