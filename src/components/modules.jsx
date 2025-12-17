import SearchInput from "./searchInput";
import AddNew from "./addNew";
import { Link, useNavigate } from "react-router-dom";
import "../css/products.css";
import imgEdit from "../images/Group 409.svg";
import imgDelete from "../images/Group 410.svg";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { token } from "./token";
import { authFetch } from "./authFetch.js";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

function Modules() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await authFetch(
        "https://united-hanger-2025.up.railway.app/api/v2/products"
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error-Products", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/AddNewProduct");
  };

  const handleDelete = (productID) => {
    Swal.fire({
      title: "Delete Product",
      text: `Are You Sure You want to delete Product ${productID}`,
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
          `https://united-hanger-2025.up.railway.app/api/products/${productID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => response.json())
          .then(() => getAllProducts());
      }
    });
  };

  const getBackground = (id) => {
    if (id % 2 === 0) {
      return "#ffffff";
    } else {
      return "#f1f2f7";
    }
  };

  // 🔥 Drag & Drop + Backend Order
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    setProducts(items);

    const product_ids = items.map((item) => item.id);

    try {
      await authFetch(
        "https://united-hanger-2025.up.railway.app/api/products/order",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_ids }),
        }
      );
    } catch (error) {
      console.error("Error updating order", error);
    }
  };

  return (
    <>
      <div className="products-Departament">
        <div className="products-heading">
          <p className="products-title">Products</p>
        </div>

        <div className="col-search">
          <SearchInput />
        </div>

        <div className="AllProducts-Col">
          <p>All Products</p>
          <div className="addNew-Col" onClick={handleNavigate}>
            <AddNew />
          </div>
        </div>

        {products.length === 0 ? (
          <Loading />
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="products">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {products.map((product, index) => (
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
                          className="main-Product"
                        >
                          <div
                            className="container-Product"
                            style={{
                              backgroundColor: getBackground(index + 1),
                            }}
                          >
                            <Link
                              to={`/products/${product.id}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                              }}
                            >
                              <p className="product-id">{index + 1}</p>

                              <img
                                style={{
                                  width: "120px",
                                  height: "100px",
                                  objectFit: "contain",
                                }}
                                className="img-product"
                                src={product.images[0].image_path}
                                alt="img-Product"
                              />

                              <div className="content-product">
                                <h3>{product.name}</h3>

                                <div style={{ display: "flex" }}>
                                  {product.sizes.map((size) => (
                                    <div key={size.id}>
                                      <p className="size-product">
                                        {size.value} {size.unit}.
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                <div style={{ display: "flex" }}>
                                  {product.materials.map((material) => (
                                    <div key={material.id}>
                                      <p className="model-product">
                                        {material.name}.
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                <div style={{ display: "flex" }}>
                                  {product.colors.map((color) => (
                                    <ul
                                      key={color.id}
                                      className="bullets-Product"
                                    >
                                      <li
                                        style={{
                                          backgroundColor: color.hex_code,
                                        }}
                                      ></li>
                                    </ul>
                                  ))}
                                </div>
                              </div>
                            </Link>

                            <div className="Edit-Delete-Col" style={{ gap: 15 }}>
                              <Link to={`/products/${product.id}`}>
                                <img
                                  className="img-Edit"
                                  src={imgEdit}
                                  alt="img-Edit"
                                  style={{ width: "40px", margin: 0 }}
                                />
                              </Link>

                              <img
                                onClick={() => handleDelete(product.id)}
                                style={{ width: "40px" }}
                                className="img-Delete"
                                src={imgDelete}
                                alt="img-Delete"
                              />
                            </div>
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
    </>
  );
}

export default Modules;

