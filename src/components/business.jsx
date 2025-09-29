import UserName from "./userName";
import "../css/BusinessHours.css";
import ContentText from "./ContentText";
import { useState, useEffect } from "react";
import { authFetch } from "./authFetch.js";
function BusinessHours() {
    const [business, setbusiness] = useState("Business Hours");
    const getallbusiness = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/settings`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then(data => setbusiness(data.settings.businesshours))
        } catch (error) {
            console.error("Error: Not Found Data", error)
        }
    }
    useEffect(() => {
        getallbusiness();
    }, [])

    return (
        <div className="BusinessHours-Departament">
            <div className="heading-Business">
                <p className="P-Business">Business Hours</p>
                <UserName />
            </div>
            <ContentText title={`${business.slice(0, 57)} ....`} label="Business Hours" />

        </div>
    )
}
export default BusinessHours;