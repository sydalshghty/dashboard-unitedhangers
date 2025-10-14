import imgReturn from "../images/Group 429.svg";
import UserName from "./userName";
import { Link } from "react-router-dom";
import { useState } from "react";
import { token } from "./token.jsx";
import { authFetch } from "./authFetch.js.jsx";
import { useNavigate } from "react-router-dom";
function AddNewCategories() {
    const navigate = useNavigate("");
    const handleNavigate = () => {
        navigate("/Categories");
    }
    const [name, setName] = useState("");

    const submitdata = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);

        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/categories/new`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
                .then((response) => response.json())
                .then(data => {
                    alert("✅ Category added successfully!")
                    console.log(data);
                    handleNavigate();
                }
                )
        }
        catch (error) {
            console.error("Error Not Found Data", error);
            alert("❌ An error occurred while adding. Please try again.")
        }
    };

    return (
        <>
            <div className="sizes-Departament">
                <div className="heading-sizes">
                    <div className="add-new-Email">
                        <Link to={"/categories"}>
                            <img src={imgReturn} alt="img-return" style={{ cursor: "pointer" }} />
                        </Link>
                        <p className="p-title">Add New Category</p>
                    </div>
                    <div className="col-userName">
                        <UserName />
                    </div>
                </div>
                <form className="content-Add-new-Email" onSubmit={submitdata}>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter New Category"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default AddNewCategories;
