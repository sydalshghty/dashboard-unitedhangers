//import UserName from "./userName";
import "../css/ViewInquiry.css";
import imgCustomLogo from "../images/61GsnUB4HuL 2 (4).png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { token } from "./token";
import Loading from "./Loading";
import { authFetch } from "./authFetch.js";
function ViewInquiry() {
    const { inquiryID } = useParams();

    const [Inquiry, setInquiry] = useState([]);

    const getInquiry = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app//api/inquiries/${inquiryID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then(data => setInquiry(data.inquiry))
        }
        catch (error) {
            console.error("Error: Not Found Data", error);

        }
    }

    useEffect(() => {
        getInquiry();
    }, [])
    return (
        <div className="ViewInquiry-Departament">
            <div className="Inquiry-Heading">
                <p className="P-Inquiry">View Inquiry</p>
            </div>
            {!Inquiry ?
                <Loading />
                :
                <>
                    <div className="ViewInquiry-Content">
                        <div className="Col-One">
                            <div>
                                <label>Client Name</label>
                                <input type="text" placeholder={Inquiry.name} />
                            </div>
                            <div>
                                <label>Client Phone</label>
                                <input type="Number" placeholder={Inquiry.phone} />
                            </div>
                            <div className="Custom-Color">
                                <label>Custom Color</label>
                                <div className="col-Color">
                                    {!Inquiry.color ? <h5>Loading...</h5> : <>
                                        <li style={{ backgroundColor: `${Inquiry.color.name}` }}></li>
                                        <input type="text" placeholder={`${Inquiry.color.name}`} />
                                    </>}
                                </div>
                            </div>
                            <div>
                                {!Inquiry.product ? <h5>Loading...</h5> :
                                    <>
                                        <label>Model</label>
                                        <input type="text" placeholder={`${Inquiry.product.name}`} />
                                    </>
                                }
                            </div>
                            <div>
                                <label>Quantity</label>
                                <input type="Number" placeholder={Inquiry.quantity} />
                            </div>
                            <div>
                                {!Inquiry.size ? <h5>Loading...</h5> :
                                    <>
                                        <label>Size</label>
                                        <input type="Number" placeholder={Inquiry.size.value} />
                                    </>
                                }
                            </div>
                        </div>
                        <div className="Col-Two">
                            <div>
                                <label>Client Email</label>
                                <input type="text" placeholder={Inquiry.email} />
                            </div>
                            <div>
                                <label>Date</label>
                                <input type="text" placeholder={Inquiry.created_at} />
                            </div>
                            <div className="Custom-Logo">
                                {`${Inquiry.logo_path ?
                                    <>
                                        <label>Custom Logo</label>
                                        <img src={`${Inquiry.logo_path}`} alt="CustomLogo" />
                                    </>
                                    : ""}`}
                            </div>
                            <div>
                                {!Inquiry.material ? <h5>Loading...</h5> :
                                    <>
                                        <label>Raw Material</label>
                                        <input type="text" placeholder={Inquiry.material.name} />
                                    </>
                                }
                            </div>
                            <div className="col-Color">
                                <label>Color</label>
                                <div>
                                    {!Inquiry.color ? <h5>Loading...</h5> :
                                        <li style={{ backgroundColor: `${Inquiry.color.name}` }}></li>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            }
        </div>
    )
}
export default ViewInquiry;