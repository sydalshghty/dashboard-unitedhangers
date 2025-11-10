//import UserName from "./userName";
import ContentText from "./ContentText";
import "../css/AboutUs.css";
import { useState, useEffect } from "react";
import { authFetch } from "./authFetch.js";
function AboutUs() {
  const [aboutus, setaboutus] = useState("About Us")
  const getAboutInformation = async () => {
    try {
      await authFetch(`https://united-hanger-2025.up.railway.app/api/settings`, {
        method: "GET"
      })
        .then((response) => response.json())
        .then(data => setaboutus(data.settings.about_us))
    } catch (error) {
      console.error("Error: Not Found Data", error)
    }
  }

  useEffect(() => {
    getAboutInformation()
  }, [])

  return (
    <div className="AboutUs-Deparament">
      <div className="heading-AboutUs">
        <p className="P-AboutUs">About Us</p>
      </div>
      <ContentText title={`${aboutus.slice(0, 70)} ....`} label={"About Us"} />
    </div>
  );
}

export default AboutUs;

