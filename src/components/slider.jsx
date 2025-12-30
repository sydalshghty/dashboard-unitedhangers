/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import imgEdit from "../images/Group 409.svg";
import imgDelete from "../images/Group 410.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddNew from "./addNew";
import "../css/slider.css";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { token } from "./token";
import { sliderID } from "./sliderID";
import { authFetch } from "./authFetch.js";
function Slider() {
  const [sliders, setSliders] = useState([]);
  const [placeholder, setPlaceholder] = useState("Search");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await authFetch("https://united-hanger-2025.up.railway.app/api/sliders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setSliders(data.sliders));
    } catch (error) {
      console.error("Error: Not Found Data", error);
      Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: "Failed to fetch sliders data.",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (productID) => {
    Swal.fire({
      title: "Delete Slider",
      text: `Are you sure you want to delete Slider ${productID}?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
      customClass: {
        popup: "my-Popup",
        title: "my-title",
        confirmButton: "my-delete",
        cancelButton: "my-cancel",
      },
    }).then((data) => {
      if (data.isConfirmed) {
        authFetch(
          `https://united-hanger-2025.up.railway.app/api/slider/${productID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "✅ Deleted!",
              text: `Slider ${productID} deleted successfully.`,
              timer: 2000,
              showConfirmButton: false,
            });
            fetchData();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "❌ Error",
              text: "Something went wrong while deleting.",
            });
          });
      }
    });
  };

  const handleEditSlider = () => {
    navigate("/EditSlider");
  };

  const handleNavigate2 = () => {
    navigate("/AddNewSlider");
  };

  const getBackground = (id) => {
    return id % 2 === 0 ? "#ffffff" : "#f1f2f7";
  };

  const handleNavigateSlider = (id) => {
    navigate(`/slider/${id}`);
  };

  return (
    <div className="slider-departament">
      <div className="slider-content">
        <p className="p-slider">Sliders</p>

      </div>
      <div className="parent-input">
        <div className="col-search">
          <input
            onFocus={() => {
              setPlaceholder("");
            }}
            onBlur={() => {
              setPlaceholder("Search");
            }}
            type="text"
            placeholder={placeholder}
            name="Search"
          />
          <FontAwesomeIcon className="icon-search" icon={faSearch} />
        </div>
      </div>
      <div className="heading-slider">
        <p>All Sliders</p>
        <div className="col-addNew" onClick={handleNavigate2}>
          <AddNew />
        </div>
      </div>
      {!sliders ? (
        <Loading />
      ) : (
        <div className="main-product">
          {sliders.map((product, index) => (
            <div
              className="col-Product-slider"
              key={product.id}
              style={{ backgroundColor: getBackground(product.id) }}
            >
              <Link
                to={`/slider/${product.id}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                
                <p className="id-product">{index + 1}</p>
                <img
                  style={{ objectFit: "contain", height: "100%" }}
                  className="img-product"
                  src={product.image_path}
                  alt="img-product"
                />
                <div className="col-text" style={{ cursor: "pointer" }}>
                  <h3 className="heading-product">{product.title}</h3>
                  <p className="description-product">{product.description}</p>
                </div>
              </Link>
              <div className="col-Edit-Delete">
                <img
                  src={imgEdit}
                  alt="img-Edit"
                  onClick={() => {
                    handleNavigateSlider(`${product.id}`);
                  }}
                />
                <img
                  onClick={() => {
                    handleDelete(`${product.id}`);
                  }}
                  src={imgDelete}
                  alt="img-Delete"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {sliders.map((product, index) => (
        <div
          className="col-product-mobile"
          key={product.id}
          style={{ backgroundColor: getBackground(product.id) }}
        >
          <Link to={`/slider/${product.id}`} style={{ textDecoration: "none" }}>
            <div className="content-image">
              
              <p className="id-product">{index + 1}</p>
              <img
                className="img-product"
                src={product.image_path}
                alt="img-product"
              />
            </div>
            <div className="content-text" style={{ cursor: "pointer" }}>
              <h3 className="heading-product">{product.title}</h3>
              <p className="description-product">{product.description}</p>
            </div>
          </Link>
          <div className="col-Edit-Delete">
            <img src={imgEdit} alt="img-Edit" onClick={handleEditSlider} />
            <img
              onClick={() => {
                handleDelete(`${product.id}`);
              }}
              src={imgDelete}
              alt="img-Delete"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Slider;*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import imgEdit from "../images/Group 409.svg";
import imgDelete from "../images/Group 410.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddNew from "./addNew";
import "../css/slider.css";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { token } from "./token";
import { authFetch } from "./authFetch.js";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function Slider() {
  const [sliders, setSliders] = useState([]);
  const [placeholder, setPlaceholder] = useState("Search");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await authFetch(
        "https://united-hanger-2025.up.railway.app/api/sliders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setSliders(data.sliders);
    } catch (error) {
      console.error("Error: Not Found Data", error);
      Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: "Failed to fetch sliders data.",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (sliderID) => {
    Swal.fire({
      title: "Delete Slider",
      text: `Are you sure you want to delete Slider ${sliderID}?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
      customClass: {
        popup: "my-Popup",
        title: "my-title",
        confirmButton: "my-delete",
        cancelButton: "my-cancel",
      },
    }).then((data) => {
      if (data.isConfirmed) {
        authFetch(
          `https://united-hanger-2025.up.railway.app/api/slider/${sliderID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "✅ Deleted!",
              text: `Slider ${sliderID} deleted successfully.`,
              timer: 2000,
              showConfirmButton: false,
            });
            fetchData();
          });
      }
    });
  };

  const handleNavigateSlider = (id) => {
    navigate(`/slider/${id}`);
  };

  const handleNavigateAdd = () => {
    navigate("/AddNewSlider");
  };

  const getBackground = (index) => {
    return index % 2 === 0 ? "#ffffff" : "#f1f2f7";
  };

  // 🔥 Drag & Drop Handler
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(sliders);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    setSliders(items);

    const slider_ids = items.map((item) => item.id);

    try {
      await authFetch(
        "https://united-hanger-2025.up.railway.app/api/sliders/order",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slider_ids }),
        }
      );
    } catch (error) {
      console.error("Error updating slider order", error);
    }
  };

  return (
    <div className="slider-departament">
      <div className="slider-content">
        <p className="p-slider">Sliders</p>
      </div>

      <div className="parent-input">
        <div className="col-search">
          <input
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder("Search")}
            type="text"
            placeholder={placeholder}
          />
          <FontAwesomeIcon className="icon-search" icon={faSearch} />
        </div>
      </div>

      <div className="heading-slider">
        <p>All Sliders</p>
        <div className="col-addNew" onClick={handleNavigateAdd}>
          <AddNew />
        </div>
      </div>

      {!sliders.length ? (
        <Loading />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sliders">
            {(provided) => (
              <div
                className="main-product"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sliders.map((product, index) => (
                  <Draggable
                    key={product.id}
                    draggableId={product.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="col-Product-slider"
                        style={{
                          backgroundColor: getBackground(index),
                          ...provided.draggableProps.style,
                        }}
                      >
                        <Link
                          to={`/slider/${product.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                          }}
                        >
                          <p className="id-product">{index + 1}</p>

                          <img
                            className="img-product"
                            src={product.image_path}
                            alt="img-product"
                            style={{ objectFit: "contain", height: "100%" }}
                          />

                          <div className="col-text">
                            <h3 className="heading-product">
                              {product.title}
                            </h3>
                            <p className="description-product">
                              {product.description}
                            </p>
                          </div>
                        </Link>

                        <div className="col-Edit-Delete">
                          <img
                            src={imgEdit}
                            alt="img-Edit"
                            onClick={() =>
                              handleNavigateSlider(product.id)
                            }
                          />
                          <img
                            src={imgDelete}
                            alt="img-Delete"
                            onClick={() =>
                              handleDelete(product.id)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default Slider;

