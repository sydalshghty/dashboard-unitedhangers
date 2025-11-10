import UserName from "./userName";
import imgAddNew from "../images/Group 429.svg";
import { Link } from "react-router-dom";
import "../css/Addnewlocations.css";
import { useState } from "react";
import { authFetch } from "./authFetch.js";
import { useNavigate } from "react-router-dom";
import "../css/googleMap.css";
import GooglePlan from "./googleMap.jsx";
function AddNewLocations() {
    const [name, setName] = useState("");
    const [emails, setEmails] = useState([""]);
    const [phone, setPhone] = useState([""]);
    const [countrty, setCountry] = useState("");

    const navigate = useNavigate("");
    const handleNavigate = () => navigate("/Locations");
    const locations = {
        "name": name,
        "emails": emails,
        "phones": phone,
        "country_name": countrty
    }

    const addnewlocation = async () => {
        try {
            await authFetch("https://united-hanger-2025.up.railway.app/api/locations/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(locations),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert("Locations Added Successfully");
                    handleNavigate();
                    console.log(data)
                });
        } catch (error) {
            console.error("Error: Not Found Data", error);
        }
    };

    return (
        <div className="Add-New-Color-Departament">
            <div className="heading-Add-New-Color">
                <div className="col-image">
                    <Link to={"/Locations"}>
                        <img src={imgAddNew} alt="img-AddNew" />
                    </Link>
                    <p>Add New Locations</p>
                </div>
            </div>
            <div className="content-Save">
                <Link className="button-Save" style={{ marginBottom: "40px" }} onClick={() => {
                    console.log(locations);
                    addnewlocation();
                }}>Save</Link>
            </div>
            <div className="content-Add-New-locations">
                <div className="all-addnew-locations">
                    <div className="col-input-locations">
                        <p>Country</p>
                        <input type="text" placeholder="Country" required
                            onChange={(e) => {
                                setCountry(e.target.value);
                            }}
                        />
                    </div>
                    <div className="col-input-locations">
                        <p>Address</p>
                        <input type="text" placeholder="Address" required
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="col-input-locations">
                        <p>Email</p>
                        <input type="email" placeholder="Email" required
                            onChange={(e) => {
                                setEmails([`${e.target.value}`]);
                            }}
                        />
                    </div>
                    <div className="col-input-locations">
                        <p>Phone</p>
                        <input type="phone" placeholder="phone" required
                            onChange={(e) => {
                                setPhone([`${e.target.value}`]);
                            }}
                        />
                    </div>
                </div>
                <GooglePlan style={{ marginTop: "40px" }} />
            </div>
        </div>
    )
}
export default AddNewLocations;
