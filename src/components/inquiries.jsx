import UserName from "./userName";
import "../css/inquiries.css";
import SearchInput from "./searchInput";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { token } from "./token";
import Loading from "./Loading";
import { authFetch } from "./authFetch.js";
function Inquiries() {
    const navigate = useNavigate("");

    const handleNavigate = () => {
        navigate("/ViewInquiry");
    };

    const [Inquiries, setInquiries] = useState([]);

    const getAllInquiries = async () => {
        try {
            await authFetch(`https://hanger-production.up.railway.app//api/inquiries`, {
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
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const backgroundProduct = (id) => {
        if (id % 2 === 0) {
            return "#ffffff";
        } else {
            return "#f1f2f7";
        }
    };

    return (
        <div className="inquiries-Departament">
            <div className="heading-inquiries">
                <p className="p-inquiries">Inquiries</p>
                <UserName />
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
                                <Link
                                    to={`/inquiries/${inquiry.id}`}
                                    style={{ textDecoration: "none" }}
                                    key={inquiry.id}
                                >
                                    <div
                                        className="Col-Inquiriey"
                                        style={{ backgroundColor: backgroundProduct(inquiry.id) }}
                                    >
                                        <p className="P-Id">{index + 1}</p>

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
                                                <li style={{ backgroundColor: `${inquiry.color.hex_code}` }}></li>
                                            </div>
                                        </div>
                                        <img src={inquiry.logo_path} alt="img-Inquiry" />
                                    </div>
                                </Link>
                            );
                        })}
                    </>
                }
            </div>
        </div>
    );
}
export default Inquiries;


