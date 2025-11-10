//import UserName from "./userName";
import ContentText from "./ContentText";
import { useState, useEffect } from "react";
import { authFetch } from "./authFetch.js";
function OurFactory() {
    const [ourfactory, setourfactory] = useState("Our Factory");
    const getourfactory = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/settings`, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => setourfactory(data.settings.ourfactory))
        }
        catch (error) {
            console.error("Error: Not Found Data", error)
        }
    }
    useEffect(() => {
        getourfactory();
    }, [])

    return (
        <div className="Factory-Departament">
            <div className="heading-Factory" style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "60px", borderBottom: "0.5px solid var(--border-color)" }}>
                <p className="P-Factory" style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: "sans-serif",
                    letterSpacing: "0.5px",
                    textTransform: "capitalize",
                    color: "#1F384C"
                }}>Our Factory</p>
            </div>
            <ContentText title={`${ourfactory.slice(0, 70)} ....`} label="Our Factory" />
        </div>
    )
}
export default OurFactory;