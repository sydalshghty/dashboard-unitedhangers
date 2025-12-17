//import UserName from "./userName";
import ContentText from "./ContentText";
import "../css/WhyUs.css";
import "../css/AboutUs.css";
import { useState, useEffect } from "react";
import { authFetch } from "./authFetch.js";
import ProductList from "./test-product.jsx";
function WhyUS() {
    const [whyus, setwhyus] = useState("Why US");
    const getwhyus = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/settings`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then(data => setwhyus(data.settings.whyus))
        }
        catch (error) {
            console.error("Error: Not Found Data")
        }
    }
    useEffect(() => {
        getwhyus()
    }, [])

    return (
        <>
            <div className="WhyUs-Departament">
                <div className="heading-WhyUs">
                    <p className="P-WhyUs">Why US</p>
                </div>
                <ContentText title={`${whyus.slice(0, 70)} ....`} label="Why US" />
            </div>
            <ProductList />
        </>
    )
}
export default WhyUS;