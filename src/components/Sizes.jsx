import UserName from "./userName";
import SearchInput from "./searchInput";
import AddNew from "./addNew";
import deleteImg from "../images/Group 410.svg";
import EditImg from "../images/Group 409.svg";
import "../css/sizes.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { token } from "./token";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function Sizes() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/AddNewSize");
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Size",
            text: `Are You Sure You want to delete Size ${id}`,
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            customClass: {
                popup: "my-Popup",
                title: "my-title",
                confirmButton: "my-delete",
                cancelButton: "my-cancel",
            }
        }).then(data => {
            if (data.isConfirmed) {
                fetch(`https://united-hanger-2025.up.railway.app//api/sizes/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then((response) => response.json())
                .then(() => getAllSizes());
            }
        })
    }

    const [sizes, setSizes] = useState([]);

    const getAllSizes = () => {
        try {
            fetch(`https://united-hanger-2025.up.railway.app//api/sizes`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => response.json())
            .then(data => setSizes(data.sizes))
        }
        catch (error) {
            console.error("Error: Not Found Data", error)
        }
    }

    useEffect(() => {
        getAllSizes();
    }, [])

    const backgroundSize = (index) => {
        return (index % 2 === 0) ? "#FFFFFF" : "#f1f2f7";
    }

    return (
        <div className="sizes-Departament">
            <div className="heading-sizes">
                <p className="p-title">Sizes</p>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            <div className="col-search">
                <SearchInput/>
            </div>
            <div className="col-All-Sizes">
                <p>All Sizes</p>
                <div className="add-New" onClick={handleNavigate}>
                    <AddNew/>
                </div>
            </div>

            {!sizes ? <Loading /> :
            <div className="main-product-sizes">
                {sizes.map((size, index) => {
                    return (
                        <div 
                            className="content-product-size" 
                            key={size.id} 
                            style={{backgroundColor: backgroundSize(index)}}
                        >
                            <Link 
                                to={`/sizes/${size.id}`} 
                                style={{display: "flex",alignItems: "center", textDecoration: "none",width: "100%"}}
                            >
                                <p className="id-product">{index + 1}</p> 
                                <p className="title-product">{`${size.value} ${size.unit}`}</p>
                            </Link>
                            <div className="Edit-Delete-col">
                                <img 
                                    onClick={() => handleDelete(size.id)} 
                                    className="delete-Img" 
                                    src={deleteImg} 
                                    alt="delete-Img" 
                                />
                                <Link to={`/sizes/${size.id}`}>
                                    <img className="edit-Img" src={EditImg} alt="Edit-Img"/>
                                </Link>
                            </div>
                        </div>
                    )
                })}   
            </div>
            }
        </div>
    )
}
export default Sizes;
