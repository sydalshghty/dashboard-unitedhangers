//import UserName from "./userName";
import SearchInput from "./searchInput";
import AddNew from "./addNew";
import imgDelete from "../images/Group 410.svg";
import imgEdit from "../images/Group 409.svg";
import { Link } from "react-router-dom";
import "../css/getAllCategories.css";
import { useState, useEffect } from "react";
import { authFetch } from "./authFetch.js";
import Loading from "./Loading.jsx";
import Swal from "sweetalert2";
import { token } from "./token";
function GetAllCategories() {
    const [allCategories, setAllCategories] = useState([]);
    const getAlCategories = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app//api/categories_for_dashboard`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then(data => setAllCategories(data.categories))
        }
        catch (error) {
            console.error("Error not found data", error)
        }
    }

    useEffect(() => {
        getAlCategories();
    }, []);
    const getBackground = (id) => {
        if (id % 2 === 0) {
            return "#ffffff";
        } else {
            return "#f1f2f7";
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Category",
            text: `Are You Sure You want to delete Category ${id}`,
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            customClass: {
                popup: "my-Popup",
                title: "my-title",
                confirmButton: "my-delete",
                cancelButton: "my-cancel",
            }
        }).then((data) => {
            if (data.isConfirmed) {
                authFetch(`https://united-hanger-2025.up.railway.app/api/category/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then((response) => response.json())
                    .then(data => getAlCategories())
            }
        })
    }

    return (
        <div className="colors-Departament categories-departament">
            <div className="heading-colors">
                <p className="title-colors">Categories</p>
            </div>
            <div className="col-search">
                <SearchInput />
            </div>
            <div className="all-colors">
                <p>All Categories</p>
                <Link to={"/AddNewCategory"} style={{ textDecoration: "none" }}>
                    <div className="addNew-Button">
                        <AddNew />
                    </div>
                </Link>
            </div>
            <div className="all-categories">
                <>
                    {!allCategories ?
                        <Loading />
                        :
                        <>
                            {allCategories.map((category, index) => {
                                return (
                                    <div className="col-category" style={{ cursor: "pointer", marginBottom: "20px", backgroundColor: `${getBackground(index + 1)}` }} key={category.id}>
                                        <Link to={`/EditCategory/${category.id}`} style={{ textDecoration: "none", color: "black", width: "90%" }}>
                                            <div className="col-div">
                                                <p className="category-id">{index + 1}</p>
                                                <p>{category.name}</p>
                                            </div>
                                        </Link>
                                        <div className="Edit-Delete-Col">
                                            <img
                                                className="img-Delete"
                                                src={imgDelete}
                                                alt="img-Delete"
                                                onClick={() => handleDelete(`${category.id}`)}
                                            />
                                            <Link to={`/EditCategory/${category.id}`}>
                                                <img className="img-Edit" src={imgEdit} alt="img-Edit" />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    }
                </>
            </div>
        </div>
    )
}
export default GetAllCategories;