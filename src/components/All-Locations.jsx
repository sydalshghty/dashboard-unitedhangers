import UserName from "./userName";
import SearchInput from "./searchInput";
import AddNew from "./addNew";
import imgDelete from "../images/Group 410.svg";
import imgEdit from "../images/Group 409.svg";
import "../css/All-locations.css";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { authFetch } from "./authFetch.js";
import { token } from "./token";
import Swal from "sweetalert2";
function AllLocations() {
    const [locations, setLocations] = useState([]);
    const getAllLocations = async () => {
        try {
            const response = await fetch("https://united-hanger-2025.up.railway.app/api/locations");
            const data = await response.json();
            setLocations(data.locations);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllLocations();
    }, []);
    const backgroundProduct = (id) => {
        if ((id % 2 === 0)) {
            return "#ffffff"
        } else {
            return "#f1f2f7"
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Location",
            text: `Are You Sure You want to delete Location ${id}`,
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
                authFetch(`https://united-hanger-2025.up.railway.app/api/locations/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then((response) => {
                    if (!response.ok) throw new Error("Failed to delete location");
                    return response.json();
                })
                    .then(() => getAllLocations())
                    .catch(err => console.log(err));

            }
        })
    }
    return (
        <div className="colors-Departament All-locations-departament">
            <div className="heading-colors">
                <p className="title-colors">Locations</p>
                <div className="col-userName">
                    <UserName />
                </div>
            </div>
            <div className="col-search">
                <SearchInput />
            </div>
            <div className="all-colors">
                <p>All Locations</p>
                <Link to={"/AddNewLocations"} style={{ textDecoration: "none" }}>
                    <div className="addNew-Button">
                        <AddNew />
                    </div>
                </Link>
            </div>
            <div className="all-locations">
                {!locations ? <Loading /> : locations.map((location, index) => {
                    return (
                        <div className="col-location" key={location.id} style={{ backgroundColor: `${backgroundProduct(index)}` }}>
                            <p className="id">{index + 1}</p>
                            <div className="all-informatons">
                                <div className="col-email">
                                    <p>Emails:</p>
                                    <p>{location.emails.map((email) => email)}</p>
                                </div>
                                <div className="col-phones">
                                    <p>Phones:</p>
                                    {location.phones.map((phone) => <p>{phone}</p>)}
                                </div>
                                <div className="col-locations">
                                    <p>Locations:</p>
                                    <p>{location.name}</p>
                                </div>
                            </div>
                            <div className="edit-delete-btns">
                                <Link to={`/EditLocations/${location.id}`}>
                                    <div className="col-edit">
                                        <img src={imgEdit} alt="imgEdit" />
                                    </div>
                                </Link>
                                <div className="col-delete">
                                    <img src={imgDelete} alt="imgDelete" onClick={() => handleDelete(location.id)} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default AllLocations;