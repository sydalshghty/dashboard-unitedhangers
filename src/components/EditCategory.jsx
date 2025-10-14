import { useParams } from "react-router-dom";
import imgReturn from "../images/Group 429.svg";
import UserName from "./userName";
import { token } from "./token";
import { authFetch } from "./authFetch.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function EditCategory() {
    const navigate = useNavigate("");
    const handleNavigate = () => {
        navigate("/categories");
    }
    const { CategoryID } = useParams();

    /*Get Category Only Data*/
    const [categoryonly, setcategoryonly] = useState([])
    const getCategoryonly = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/category/${CategoryID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then(data => setcategoryonly(data.category))
        }
        catch (error) {
            console.error("Error not found data", error)
        }
    }
    useEffect(() => {
        getCategoryonly();
    }, [])

    /*Edit Category Data*/
    const [name, setname] = useState("");
    const EditCategoryName = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);

        try {
            authFetch(`https://united-hanger-2025.up.railway.app/api/category/${CategoryID}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
                .then((response) => response.json())
                .then(data => {
                    alert("✅ Category has been updated successfully!");
                    console.log(data);
                    handleNavigate();
                })
        }
        catch (error) {
            console.error("Error not found data", error);
            alert("❌ An error occurred. Please try again.")
        }
    }

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
                <input type="text" required placeholder={categoryonly.name}
                    onChange={(e) => {
                        setname(e.target.value);
                    }}
                />
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}
export default EditCategory;