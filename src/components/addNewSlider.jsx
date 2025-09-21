import imgIcon from "../images/Group 429.svg"; 
import UserName from "./userName";
import "../css/addNewSlider.css";
import { useNavigate } from "react-router-dom";
import imgUpload from "../images/Vector (4).svg";
import { useState } from "react";
import { token } from "./token";

function AddNewSlider() {
  const navigate = useNavigate();
  const handlNavigate = () => {
    navigate("/Slider");
  };

  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description...");
  const [sliderTitle, setSliderTitle] = useState(""); 
  const [sliderDescription, setSliderDescription] = useState(""); 
  const [image, setImage] = useState(null); 

  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      setImage(file); 
    }
  };

  const sendDataSlider = async () => {
    const formData = new FormData();
    formData.append("image", image); 
    formData.append("title", sliderTitle); 
    formData.append("description", sliderDescription); 

    try {
      const response = await fetch("https://united-hanger-2025.up.railway.app/api/new_slider", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}` 
        },
        body: formData 
      });

      const data = await response.json();
      console.log("Response from server:", data); 
      alert("✅ Slider added successfully");
    } catch (error) {
      console.error("Error sending data:", error); 
      alert("❌ Failed to add slider. Please try again");
    }
  };

  return (
    <div className="addNewSlider-departament">
      <div className="addNewSlider-heading">
        <div className="col-image">
          <img onClick={handlNavigate} src={imgIcon} alt="imgIcon" />
          <p>Add New Slider</p>
        </div>
        <div className="col-userName">
          <UserName />
        </div>
      </div>

      <div className="content-upload-product">
        <div className="select-image" style={{ position: "relative" }}>
          <img className="img-Select" src={imgUpload} alt="img-Upload" />
          <input
            className="choose-file"
            type="file"
            onChange={handleImageChange}
          />
          <p>Select Image to upload</p>

          {/* 👇 Preview بعد ما تختار صورة */}
          {image ? (
            <img
              className="img-upload ing-slider-new"
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              style={{
                position: "absolute",
                width: "85%",
                height: "85%",
                top: 0,
                left: "20px",
                borderRadius: "10px",
              }}
            />
          ) : null}
        </div>

        <div className="product-content">
          <div className="col-title">
            <p>Title</p>
            <input
              onFocus={() => setTitle("")}
              onBlur={() => setTitle("Title")}
              onChange={(e) => setSliderTitle(e.target.value)}
              type="text"
              placeholder={title}
              name="title-product"
            />
          </div>
          <div className="col-description">
            <p>Description</p>
            <input
              onFocus={() => setDescription("")}
              onBlur={() => setDescription("Description...")}
              onChange={(e) => setSliderDescription(e.target.value)}
              type="text"
              placeholder={description}
              name="Description-product"
            />
          </div>
        </div>
      </div>

      <div className="Cancel-And-Delete">
        <button
          className="cancel"
          onClick={() => {
            setImage(null);
            setSliderTitle("");
            setSliderDescription("");
          }}
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            await sendDataSlider();
            handlNavigate();
            console.log({
              sliderTitle,
              sliderDescription,
              image,
            });
          }}
          className="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddNewSlider;
