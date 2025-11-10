import UserName from "./userName";
import SearchInput from "./searchInput";
import AddNew from "./addNew";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authFetch } from "./authFetch.js";
import Loading from "./Loading.jsx";
import imgDelete from "../images/Group 410.svg";
import imgEdit from "../images/Group 409.svg";
import { token } from "./token.jsx";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function AllEmails() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/AddNewEmail")
    }

    const [Emails, setEmails] = useState([]);
    const getAllEmails = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/emails`, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => setEmails(data.emails))
        }
        catch (error) {
            console.error("Errror Not Found Data", error)
        }
    }

    useEffect(() => {
        getAllEmails();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Color",
            text: `Are You Sure You want to delete Email ${id}`,
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
                authFetch(`https://united-hanger-2025.up.railway.app//api/emails/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then((response) => response.json())
                    .then(data => getAllEmails())
            }
        })
    }

    const handleNavigateEmail = () => {
        navigate("/EditEmail")
    }

    return (
        <div className="sizes-Departament emails-departament">
            <div className="heading-sizes">
                <p className="p-title">Emails</p>
            </div>
            <div className="col-search">
                <SearchInput />
            </div>
            <div className="col-All-Sizes">
                <p>All Emails</p>
                <div className="add-New" style={{ textDecoration: "none" }} onClick={handleNavigate}>
                    <AddNew />
                </div>
            </div>
            <div className="all-emails">
                {Emails.length === 0 ? (
                    <Loading />
                ) : (
                    <>
                        {Emails.map((email, index) => (
                            <div className="col-email" key={email.id}>
                                <div>
                                    <p>{index + 1}</p>
                                    {email.value}
                                </div>
                                <div className="Edit-Delete-Col">
                                    <img
                                        onClick={() => {
                                            handleDelete(email.id)
                                        }}
                                        className="img-Delete"
                                        src={imgDelete}
                                        alt="img-Delete"
                                    />
                                    <Link to={`/EditEmail/${email.id}`}>
                                        <img className="img-Edit" src={imgEdit} alt="img-Edit" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
export default AllEmails;
