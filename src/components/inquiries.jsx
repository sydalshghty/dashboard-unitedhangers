//import UserName from "./userName";
import "../css/inquiries.css";
import SearchInput from "./searchInput";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { token } from "./token";
import Loading from "./Loading";
import { authFetch } from "./authFetch.js";
import deleteImg from "../images/Group 410.svg";
import Swal from "sweetalert2";
function Inquiries() {
    const navigate = useNavigate("");

    const handleNavigate = () => {
        navigate("/ViewInquiry");
    };

    const [Inquiries, setInquiries] = useState([]);

    const getAllInquiries = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/inquiries`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then(data => setInquiries(data.inquiries));
        } catch (error) {
            console.error("Error: Dont Found Data", error);
        }
    };

    useEffect(() => {
        getAllInquiries();
        const interval = setInterval(() => {
            window.location.reload();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const backgroundProduct = (id) => {
        if (id % 2 === 0) {
            return "#ffffff";
        } else {
            return "#f1f2f7";
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete inquiry",
            text: `Are You Sure You want to delete inquiry ${id}`,
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
                authFetch(`https://united-hanger-2025.up.railway.app//api/inquiries/${id}/delete`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then((response) => response.json())
                    .then(data => getAllInquiries())
            }
        })
    }

    return (
        <div className="inquiries-Departament">
            <div className="heading-inquiries">
                <p className="p-inquiries">Inquiries</p>
            </div>
            <div className="col-Search">
                <SearchInput />
            </div>
            <div className="AllInquiries-P">
                <p>All Inquiries</p>
            </div>
            <div className="AllInquiries-Cols" style={{ cursor: "pointer" }}>
                {!Inquiries ?
                    <Loading />
                    :
                    <>
                        {Inquiries.map((inquiry, index) => {
                            return (
                                <div
                                    key={inquiry.id}
                                    className="Col-Inquiriey"
                                    style={{ backgroundColor: backgroundProduct(inquiry.id) }}
                                >
                                    <p className="P-Id">{index + 1}</p>
                                    <Link
                                        to={`/inquiries/${inquiry.id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="inquiry-Content">
                                            <div className="information-Inquiry">
                                                <p>{inquiry.name}</p>
                                                <p>||</p>
                                                <p>{inquiry.email}</p>
                                                <p>||</p>
                                                <p>{inquiry.phone}</p>
                                            </div>
                                            <p className="P-RH-Model">{inquiry.product.name}</p>
                                            <div className="Material-Colors">
                                                <p>{inquiry.material.name}</p>

                                            </div>
                                        </div>
                                    </Link>
                                    {inquiry.logo_path ?
                                        <img src={inquiry.logo_path} alt="img-Inquiry" /> :
                                        ""
                                    }

                                    <img src={deleteImg} alt="img-delete" style={{ width: "40px" }}
                                        onClick={() => {
                                            handleDelete(inquiry.id)
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </>
                }
            </div>
        </div>
    );
}
export default Inquiries;

