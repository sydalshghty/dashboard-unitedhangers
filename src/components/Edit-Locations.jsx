import { useParams } from "react-router-dom";
//import UserName from "./userName";
import imgAddNew from "../images/Group 429.svg";
import { Link } from "react-router-dom";
import "../css/Addnewlocations.css";
import { useState, useEffect } from "react";
import { authFetch } from "./authFetch.js";
import { token } from "./token.jsx";
import Loading from "./Loading.jsx";
import { useNavigate } from "react-router-dom";
import GooglePlan from "./googleMap.jsx";

function EditLocations() {
    const navigate = useNavigate("");
    const handleNavigate = () => {
        navigate("/locations")
    }
    /*get only location data*/
    const { LocationID } = useParams();
    const [onlyLocation, setonlyLocation] = useState([]);
    const getLocationData = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/locations/${LocationID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then((response) => response.json())
                .then(data => setonlyLocation(data.location))
        }
        catch (error) {
            console.error("Error not found data", error)
        }
    }
    useEffect(() => {
        getLocationData();
    }, []);
    /*End only location data*/

    /*start Edit location data*/
    const [name, setName] = useState("");
    const [emails, setemails] = useState([]);
    const [phones, setphones] = useState([]);
    const [country, setCountry] = useState("");

    const EditLocation = {
        "emails": emails,
        "name": name,
        "phones": phones,
        "country_name": country
    }

    const EditLocationOnly = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/locations/${LocationID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(EditLocation),
            })
                .then((response) => response.json())
                .then(data => {
                    alert("Location updata Successfully");
                    handleNavigate();
                    console.log(data)
                }
                )
        }
        catch (error) {
            console.error("Error not found data", error)
        }
    }

    /*End Edit location data*/
    return (
        <div className="Add-New-Color-Departament">
            <div className="heading-Add-New-Color">
                <div className="col-image">
                    <Link to={"/Locations"}>
                        <img src={imgAddNew} alt="img-AddNew" />
                    </Link>
                    <p>Edit Locations</p>
                </div>
            </div>
            {!onlyLocation ?
                <Loading />
                :
                <>
                    <div className="content-Add-New-locations">
                        <div style={{ marginBottom: "30px", display: "flex", justifyContent: "flex-end" }}>
                            <Link className="button-Save" onClick={() => {
                                EditLocationOnly();
                                console.log(EditLocation);
                            }}>Edit</Link>
                        </div>
                        <div className="all-addnew-locations">
                            <div className="col-input-locations">
                                <p>Country</p>
                                <input type="text" placeholder={onlyLocation.country_name} required
                                    onChange={(e) => {
                                        setCountry(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-input-locations">
                                <p>Address</p>
                                <input type="text" placeholder={onlyLocation.name} required
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-input-locations">
                                <p>Email</p>
                                <input type="email" placeholder={onlyLocation.emails} required
                                    onChange={(e) => {
                                        setemails([e.target.value])
                                    }}
                                />
                            </div>
                            <div className="col-input-locations">
                                <p>Phone</p>
                                <input type="text" placeholder={onlyLocation.phones} required
                                    onChange={(e) => {
                                        setphones([e.target.value])
                                    }}
                                />
                            </div>
                        </div>
                        <GooglePlan />
                    </div>
                </>
            }
        </div>
    )
}

export default EditLocations;