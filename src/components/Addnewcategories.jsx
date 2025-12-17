import imgReturn from "../images/Group 429.svg";
import UserName from "./userName";
import { Link } from "react-router-dom";
import { useState } from "react";
import { token } from "./token.jsx";
import { authFetch } from "./authFetch.js.jsx";
import { useNavigate } from "react-router-dom";
import imgSelect from "../images/Vector (2).png";
import "../css/addnewcategories.css";
function AddNewCategories() {
    const navigate = useNavigate("");
    const handleNavigate = () => {
        navigate("/Categories");
    }

    const [image1, setImage1] = useState(null);
    const handleImageChange1 = (event) => {
        const file = event.target.files[0];
        if (file) setImage1(file);
    };
    const [name, setName] = useState("");

    const submitdata = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image1);

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
            <div className="sizes-Departament categories-departament">
                <div className="heading-sizes heading-categories">
                    <div className="add-new-Email add-new-categories">
                        <Link to={"/categories"}>
                            <img src={imgReturn} alt="img-return" style={{ cursor: "pointer" }} />
                        </Link>
                        <p className="p-title">Add New Category</p>
                    </div>
                </div>
                <form className="content-Add-new-Email content-Add-new-category" onSubmit={submitdata}>
                    <div className="select-Image-One">
                        <div className="col-select">
                            <input type="file" onChange={handleImageChange1} name="Img-Product" style={{ objectFit: "contain" }} />
                            <img src={imgSelect} alt="img-Select" style={{ objectFit: "contain" }} />
                            <p>Select Category Image</p>
                            {image1 && (
                                <img
                                    className="img-upload"
                                    src={URL.createObjectURL(image1)}
                                    alt="Uploaded"
                                    style={{
                                        position: "absolute",
                                        width: "250px",
                                        height: "230px",
                                        left: "40%",
                                        top: "-50%"
                                    }}
                                />
                            )}
                        </div>
                    </div>
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
