import { useParams } from "react-router-dom";
import imgReturn from "../images/Group 429.svg";
import UserName from "./userName";
import { token } from "./token";
import { authFetch } from "./authFetch.js";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/EditCategory.css";

function EditCategory() {
    const navigate = useNavigate("");
    const { CategoryID } = useParams();

    const handleNavigate = () => {
        navigate("/categories");
    };

    /* Get Category Only Data */
    const [categoryonly, setcategoryonly] = useState({});
    const getCategoryonly = async () => {
        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/category/${CategoryID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setcategoryonly(data.category);
        } catch (error) {
            console.error("Error not found data", error);
        }
    };

    useEffect(() => {
        getCategoryonly();
    }, []);

    /* Edit Category Data */
    const [name, setname] = useState("");
    const EditCategoryName = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);

        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/category/${CategoryID}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            alert("✅ Category has been updated successfully!");
            console.log(data);
            handleNavigate();
        } catch (error) {
            console.error("Error not found data", error);
            alert("❌ An error occurred. Please try again.");
        }
    };

    /* Toggle Visibility */
    const toggleVisibility = async () => {
        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/toggle-visibility/category/${CategoryID}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log("Visibility updated:", data);

            setcategoryonly(prev => ({
                ...prev,
                visible: !prev.visible
            }));
            alert(`✅ Category has been updated successfully!`);
        } catch (error) {
            console.error("Error toggling visibility", error);
            alert("❌ Failed to update visibility.");
        }
    };

    const toggleHideProducts = async () => {
        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/categories/${CategoryID}/toggle-hide-products`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log("Hide products response:", data);

            if (data.status) {
                alert("✅ Category and products have been hidden successfully!");
            } else {
                alert("⚠️ Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error hiding category & products", error);
            alert("❌ Failed to hide category and products.");
        }
    };

    return (
        <div className="sizes-Departament EditEmail">
            <div className="heading-sizes">
                <div className="add-new-Email">
                    <Link to={"/categories"}>
                        <img src={imgReturn} alt="img-return" style={{ cursor: "pointer" }} />
                    </Link>
                    <p className="p-title">Edit Category</p>
                </div>
                <div className="col-userName">
                    <UserName />
                </div>
            </div>

            <form className="col-Edit-Email" onSubmit={EditCategoryName}>
                <input
                    type="text"
                    required
                    placeholder={categoryonly.name || "Category name"}
                    onChange={(e) => setname(e.target.value)}
                />
                <button type="submit">Edit</button>
            </form>

            <div className="visibility-buttons">
                <button
                    type="button"
                    className={`btn btn-visible ${categoryonly.visible ? "active" : ""}`}
                    onClick={toggleVisibility}
                >
                    Visible
                </button>

                <button
                    type="button"
                    className={`btn btn-hidden ${!categoryonly.visible ? "active" : ""}`}
                    onClick={toggleVisibility}
                >
                    Hidden
                </button>
                <button
                    type="button"
                    className={`btn btn-hidden`}
                    onClick={toggleHideProducts}
                >
                    Hidden & Hide-products
                </button>
            </div>
        </div>
    );
}

export default EditCategory;






































