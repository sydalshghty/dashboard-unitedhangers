import imgProduct from "../images/Group 429.svg";
import "../css/EditProduct.css";
import { useNavigate } from "react-router-dom";
import imgEdit from "../images/Group 445.svg";
import imgDelete from "../images/Group 410.svg";
import ProductEdit from "../images/Group 452.svg";
import { useParams } from "react-router-dom";
import { token } from "./token";
import { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import "../css/ProductSubmit.css";
import { authFetch } from "./authFetch.js";
import imgSelect from "../images/Vector (2).png";
import "../css/AddNewProduct.css";

function EditProduct() {
    const [Product, setProduct] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allmaterials, setAllmaterial] = useState([]);
    const [allSizes, setAllSizes] = useState([]);
    const [allColors, setAllColors] = useState([]);

    const [Editname, setEditname] = useState("");
    const [Editdescription, setEditdescription] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedMaterilas, setSelectedMaterials] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const [mainImageId, setMainImageId] = useState(null);
    const [mainImagePath, setMainImagePath] = useState("");

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    const fileInputRef = useRef(null);
    const { ProductID } = useParams();
    const navigate = useNavigate();
    const getAllCategories = async () => {
        const res = await authFetch(
            `https://united-hanger-2025.up.railway.app/api/categories/get_all`,
            { method: "GET" }
        );
        const data = await res.json();
        setAllCategories(data.categories);
    };

    const getAllMaterials = async () => {
        const res = await authFetch(
            `https://united-hanger-2025.up.railway.app/api/materials`,
            { method: "GET", headers: { "Authorization": `Bearer ${token}` } }
        );
        const data = await res.json();
        setAllmaterial(data.materials);
    };

    const getAllSizes = async () => {
        const res = await authFetch(
            `https://united-hanger-2025.up.railway.app/api/sizes`,
            { method: "GET", headers: { "Authorization": `Bearer ${token}` } }
        );
        const data = await res.json();
        setAllSizes(data.sizes);
    };

    const getAllColors = async () => {
        const res = await authFetch(
            `https://united-hanger-2025.up.railway.app/api/colors`,
            { method: "GET", headers: { "Authorization": `Bearer ${token}` } }
        );
        const data = await res.json();
        setAllColors(data.colors);
    };

    useEffect(() => {
        getProductData();
        getAllCategories();
        getAllMaterials();
        getAllSizes();
        getAllColors();
    }, []);

    const getProductData = async () => {
        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/v2/products/${ProductID}`,
                { method: "GET", headers: { Authorization: `Bearer ${token}` } }
            );

            const data = await response.json();
            setProduct(data.product);

            // ---- set all default selections ----
            setEditname(data.product.name || "");
            setEditdescription(data.product.description || "");
            setChecked(data.product.can_has_bar || false);

            setSelectedCategories(data.product.categories.map(cat => cat.id));
            setSelectedMaterials(data.product.materials.map(mat => mat.id));
            setSelectedSizes(data.product.sizes.map(sz => sz.id));
            setSelectedColors(data.product.colors.map(color => color.id));

            if (data.product.images?.length > 0) {
                const mainImg = data.product.images.find(img => img.image_type === 0);
                setMainImageId(mainImg?.id || data.product.images[0].id);
                setMainImagePath(mainImg?.image_path || data.product.images[0].image_path);
            }

        } catch (err) {
            console.error(err);
        }
    };

    const updateImage = async (imageId, file) => {
        const formData = new FormData();
        formData.append("delete", 0);
        formData.append("image", file);
        formData.append("image_id", imageId);

        const response = await authFetch(
            `https://united-hanger-2025.up.railway.app/api/products/${ProductID}/image`,
            {
                method: "PATCH",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData,
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("✔ Image Updated");

            if (imageId === mainImageId) {
                setMainImagePath(URL.createObjectURL(file));
            }

            getProductData();
        } else {
            alert("❌ Failed update");
            console.log(data);
        }
    };

    // ---------- Edit function ----------
    const EditProductFunc = async () => {
        // validations
        if (!Editname) return alert("❌ Please enter product name");
        if (!selectedCategories.length) return alert("❌ Please select category");
        if (!selectedColors.length) return alert("❌ Please select color");
        if (!selectedMaterilas.length) return alert("❌ Please select material");
        if (!selectedSizes.length) return alert("❌ Please select size");

        // ----- Send all data back, even لو ما تغيرش شيء -----
        const productData = {
            name: Editname,
            category_ids: selectedCategories,
            color_ids: selectedColors,
            material_ids: selectedMaterilas,
            size_ids: selectedSizes,
            can_has_bar: checked,
            description: Editdescription
        };


        const formData = new FormData();
        formData.append("product_data", JSON.stringify(productData));
        sizesForNewImages.forEach((sizeObj, sizeIndex) => {
            // صور بدون بار
            sizeObj.imageWithoutBarSlot?.forEach((file, imgIndex) => {
                formData.append(`size[${sizeIndex}][image_without_bar][${imgIndex}]`, file);
            });

            // صور مع بار
            sizeObj.imageWithBarSlot?.forEach((file, imgIndex) => {
                formData.append(`size[${sizeIndex}][image_with_bar][${imgIndex}]`, file);
            });
        });

        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/v2/products/${ProductID}/edit`,
                {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("✔ Product Updated Successfully");
                navigate("/Products");
            } else {
                console.log(data);
                alert("❌ Error updating product");
            }
        } catch (error) {
            console.error(error);
            alert("❌ Something went wrong while updating the product");
        }
    };


    const uploadNewImage = async (file) => {
        const formData = new FormData();
        formData.append("delete", 0);
        formData.append("image", file);

        const response = await authFetch(
            `https://united-hanger-2025.up.railway.app/api/products/${ProductID}/image`,
            {
                method: "PATCH",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData,
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("✔ Image Uploaded");
            getProductData();
        } else {
            alert("❌ Failed Upload");
            console.log(data);
        }
    };

    const handleImageChange1 = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage1(file);
            uploadNewImage(file);
        }
    };

    const handleImageChange2 = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage2(file);
            uploadNewImage(file);
        }
    };

    const deleteImage = async (imageId) => {
        try {
            const formData = new FormData();
            formData.append("delete", 1);
            formData.append("image_id", imageId);

            const res = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/products/${ProductID}/image`,
                {
                    method: "PATCH",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData,
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert("Image deleted successfully!");
                setProduct(prev => ({
                    ...prev,
                    images: prev.images.filter(img => img.id !== imageId)
                }));
            } else {
                alert("Failed to delete image");
                console.log(data);
            }
        } catch (err) {
            console.error(err);
            alert("حدث خطأ أثناء الحذف");
        }
    };

    //update changes
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        console.log(checked);
    }, [checked])
    // console.log(Product);

    const sizeImageInputRef = useRef(null);

    //Edit product
    const [activeSizeId, setActiveSizeId] = useState(null);

    const handleSelectSizeForImages = (sizeId) => {
        setSizesForNewImages(prev => {
            if (prev.find(s => s.sizeId === sizeId)) return prev;
            return [...prev, { sizeId, withBar: checked }];
        });
    };

    const [sizesForNewImages, setSizesForNewImages] = useState([]);

    //update functions

    //Add size image
    const addSizeImage = (sizeId, barType) => {
        sizeImageInputRef.current.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("delete", 0);
            formData.append("image", file);
            formData.append("size_id", sizeId);
            formData.append(
                "entity_type",
                barType === "with_bar"
                    ? "product_size_with_bar"
                    : "product_size_without_bar"
            );

            const res = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/products/${ProductID}/image`,
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                }
            );

            if (res.ok) {
                alert("✔ Size image added");
                getProductData();
            } else {
                alert("❌ Failed to add image");
            }
        };

        sizeImageInputRef.current.click();
    };
    //Edit size image function
    const editSizeImage = (sizeId, imageId, barType) => {
        sizeImageInputRef.current.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("delete", 0);
            formData.append("image", file);
            formData.append("image_id", imageId);
            formData.append("size_id", sizeId);
            formData.append(
                "entity_type",
                barType === "with_bar"
                    ? "product_size_with_bar"
                    : "product_size_without_bar"
            );

            const res = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/products/${ProductID}/image`,
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                }
            );

            if (res.ok) {
                alert("✔ Size image updated");
                getProductData();
            } else {
                alert("❌ Failed to update image");
            }
        };

        sizeImageInputRef.current.click();
    };

    //Delete size image function
    const deleteSizeImage = async (imageId, sizeId, barType) => {
        try {
            const formData = new FormData();
            formData.append("delete", 1);
            formData.append("image_id", imageId);
            formData.append("size_id", sizeId);
            formData.append(
                "entity_type",
                barType === "with_bar"
                    ? "product_size_with_bar"
                    : "product_size_without_bar"
            );

            const res = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/products/${ProductID}/image`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await res.json();
            console.log("DELETE RESPONSE:", data);

            if (!res.ok) throw new Error(data.message);

            alert("✔ Image deleted");
            getProductData();
        } catch (err) {
            console.error(err);
            alert(err.message || "Delete failed");
        }
    };

    const handleDeleteSizeImage = (img, size, barType) => {
        if (!img?.id || !size?.id) return;

        if (window.confirm("Are you sure you want to delete the image?")) {
            deleteSizeImage(img.id, size.id, barType);
        }
    };

    //add new images sizes
    const addSizeNewImage = (sizeId, barType, index) => {
        sizeImageInputRef.current.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            setSizesForNewImages(prev => {
                const newArr = [...prev];
                let sizeObj = newArr.find(s => s.sizeId === sizeId);
                if (!sizeObj) {
                    sizeObj = { sizeId, imageWithBarSlot: [], imageWithoutBarSlot: [] };
                    newArr.push(sizeObj);
                }

                if (barType === "with_bar") {
                    sizeObj.imageWithBarSlot[index] = file;
                } else {
                    sizeObj.imageWithoutBarSlot[index] = file;
                }

                return newArr;
            });
        };
        sizeImageInputRef.current.click();
    };

    return (
        <div className="Edit-Product-Departament" style={{ overflow: "hidden" }}>
            <div className="heading-EditProduct">
                <div className="col-image">
                    <img onClick={() => navigate("/Products")} src={imgProduct} alt="" />
                    <p>Edit Product</p>
                </div>
            </div>
            <div className="col-Delete-Edit" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="Edit" onClick={EditProductFunc}>Edit</button>
            </div>
            <div className="col-images"><p>Images</p></div>
            {Product.length === 0 ? <Loading /> :
                <>
                    <div className="Images-Departament">
                        <div className="main-Image">
                            <img className="img-Product" src={mainImagePath} style={{ objectFit: "contain" }} />
                            <div className="Delete-Edit-Image">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={(e) => updateImage(mainImageId, e.target.files[0])}
                                />

                                <img src={imgEdit} alt="edit"
                                    onClick={() => fileInputRef.current.click()}
                                />
                            </div>
                        </div>
                        <div className="all-Images-Products">
                            <div className="col-img-product">
                                {Product.images
                                    .filter(img => img.id !== mainImageId)
                                    .map(img => (
                                        <div key={img.id} className="main-img-product">
                                            <img className="main-img" src={img.image_path} style={{ objectFit: "contain" }} />
                                            <div className="Delete-Edit-Img">


                                                <img
                                                    style={{ objectFit: "contain" }}
                                                    src={ProductEdit}
                                                    onClick={() => {
                                                        fileInputRef.current.onclick = null;
                                                        fileInputRef.current.onchange = (e) => updateImage(img.id, e.target.files[0]);
                                                        fileInputRef.current.click();
                                                    }}
                                                />


                                                <img
                                                    src={imgDelete}
                                                    alt="delete-img"
                                                    style={{ objectFit: "contain", width: "25px", cursor: "pointer" }}
                                                    onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this image?")) {
                                                            deleteImage(img.id);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            {Product.images.length < 6 &&
                                <div className="add-new-images-product">
                                    <div className="col-one">
                                        <div className="select-Image-Product">
                                            <div className="content-image" style={{ marginTop: "20px" }}>
                                                <input type="file" onChange={handleImageChange1} />
                                                <img src={imgSelect} alt="" />
                                                <p>Select Image</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                    <div className="content-Product-Submit">
                        <div className="Name-Description-Col">
                            <form>
                                <div className="col-Name">
                                    <label>Name</label>
                                    <input type="text"
                                        placeholder={Product.name}
                                        onChange={(e) => setEditname(e.target.value)}
                                    />
                                </div>

                                <div className="col-Description">
                                    <label>Description</label>
                                    <input type="text" placeholder={Product.description}
                                        onChange={(e) => {
                                            setEditdescription(e.target.value)
                                        }}
                                    />
                                </div>
                            </form>
                            <div className="col-checkbox" style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
                                <input type="checkbox" checked={checked} style={{ width: "25px", height: "25px", cursor: "pointer" }}
                                    onChange={(e) => {
                                        setChecked(e.target.checked)
                                    }}
                                />
                                <span style={{ textTransform: "capitalize", fontSize: "20px" }}>bar</span>
                            </div>
                            <div className="col-Raw-Material">
                                <h3>Raw Material</h3>
                                <div>
                                    {allmaterials.map(material => (
                                        <p key={material.id}
                                            className={`material-item ${selectedMaterilas.includes(material.id) ? "selected" : ""}`}
                                            onClick={() => setSelectedMaterials(prev =>
                                                prev.includes(material.id)
                                                    ? prev.filter(id => id !== material.id)
                                                    : [...prev, material.id]
                                            )}
                                        >
                                            {material.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="col-all-categories col-Raw-Material">
                                <h3>Category</h3>
                                <div className="material">
                                    {allCategories.map(category => (
                                        <p key={category.id} style={{ width: "fit-content", paddingLeft: "20px", paddingRight: "20px" }}
                                            className={`material-item ${selectedCategories.includes(category.id) ? "selected" : ""}`}
                                            onClick={() => setSelectedCategories(prev =>
                                                prev.includes(category.id)
                                                    ? prev.filter(id => id !== category.id)
                                                    : [...prev, category.id]
                                            )}
                                        >
                                            {category.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="Colors-Sizes-Col">
                            <div className="Colors-Departament">
                                <h3>Colors</h3>

                                <div className="ALL-Col-Colors">
                                    {allColors.map(color => (
                                        <div key={color.id}
                                            className={`material-item ${selectedColors.includes(color.id) ? "selected" : ""}`}
                                            onClick={() => setSelectedColors(prev =>
                                                prev.includes(color.id)
                                                    ? prev.filter(id => id !== color.id)
                                                    : [...prev, color.id]
                                            )}
                                        >
                                            <li style={{ backgroundColor: color.hex_code }}></li>
                                            <p className={`material-item ${selectedColors.includes(color.id) ? "selected" : ""}`}>{color.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="Sizes-Departament">
                                <h3>Sizes</h3>
                                <div className="ALL-Col-Sizes">
                                    {allSizes.map(size => (
                                        <p
                                            key={size.id}
                                            className={`material-item ${selectedSizes.includes(size.id) ? "selected" : ""}`}
                                            onClick={() => {
                                                // Toggle selection
                                                if (activeSizeId === size.id) {
                                                    setActiveSizeId(null); // لو ضغط على نفس size، نخفي قسم الصور
                                                } else {
                                                    setActiveSizeId(size.id); // نحدد الـ size الحالي
                                                }

                                                // تحديث الـ selectedSizes
                                                setSelectedSizes(prev =>
                                                    prev.includes(size.id)
                                                        ? prev.filter(id => id !== size.id)
                                                        : [...prev, size.id]
                                                );
                                            }}
                                        >
                                            {size.value} {size.unit}
                                        </p>
                                    ))}
                                </div>

                            </div>

                            {/* ===== SIZE IMAGES SECTION ===== */}
                            <div className="Sizes-Images-Section">
                                <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Size Images</h2>

                                {Product.sizes?.map(size => (
                                    <div key={size.id} className="Size-Block">

                                        <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
                                            Size: {size.value} {size.unit}
                                        </h3>

                                        {/* WITH BAR */}
                                        <div className="Size-Images">
                                            <h4 style={{ fontSize: "15px" }}>With Bar</h4>
                                            <div className="Images-Grid">
                                                {Array.from({ length: 6 }).map((_, index) => {
                                                    const img = size.images_with_bar?.[index];

                                                    return (
                                                        <div key={index} className="Image-Slot">
                                                            {img ? (
                                                                <>
                                                                    <img src={img.image_path} className="img-product" alt="img-product-size" />
                                                                    <div className="all-buttons">
                                                                        <button
                                                                            className="edit-button"
                                                                            onClick={() =>
                                                                                editSizeImage(size.id, img.id, "with_bar")
                                                                            }
                                                                        >
                                                                            <img src={imgEdit} alt="edit-img" />
                                                                        </button>
                                                                        <button
                                                                            className="delete-button"
                                                                            onClick={() =>
                                                                                handleDeleteSizeImage(img, size, "with_bar")
                                                                            }
                                                                        >
                                                                            <img src={imgDelete} alt="delete-img" />
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <button
                                                                    className="add-new-button"
                                                                    onClick={() =>
                                                                        addSizeImage(size.id, "with_bar")
                                                                    }
                                                                >
                                                                    <img src={imgSelect} alt="img-select" />
                                                                    <p>Select new image</p>
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* WITHOUT BAR */}
                                        <div className="Size-Images images-without-bar">
                                            <h4>Without Bar</h4>
                                            <div className="Images-Grid">
                                                {Array.from({ length: 6 }).map((_, index) => {
                                                    const img = size.images_without_bar?.[index];

                                                    return (
                                                        <div key={index} className="Image-Slot">
                                                            {img ? (
                                                                <>
                                                                    <img src={img.image_path} alt="img-product" className="img-product" />
                                                                    <div className="all-buttons">
                                                                        <button
                                                                            onClick={() =>
                                                                                editSizeImage(size.id, img.id, "without_bar")
                                                                            }
                                                                        >
                                                                            <img src={imgEdit} alt="edit-img" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDeleteSizeImage(img, size, "without_bar")
                                                                            }
                                                                        >
                                                                            <img src={imgDelete} alt="delete-img" />
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <button
                                                                    className="add-new-button"
                                                                    onClick={() =>
                                                                        addSizeImage(size.id, "without_bar")
                                                                    }
                                                                >
                                                                    <img src={imgSelect} alt="img-select" />
                                                                    <p>Select new image</p>
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>

                            {activeSizeId && (
                                <div className="Sizes-Images-Section">
                                    <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>
                                        Add Images For Selected Size
                                    </h2>

                                    {checked && (
                                        <div className="Size-Images">
                                            <h4 style={{ marginBottom: "15px", letterSpacing: "0.5px", fontSize: "17px" }}>With Bar</h4>
                                            <div className="Images-Grid" style={{
                                                display: "flex",
                                                marginBottom: "20px",
                                                padding: "20px",
                                                boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
                                                borderRadius: "8px",
                                                width: "100%",
                                                height: "100%",
                                                flexWrap: "wrap",
                                                gap: "20px"
                                            }}>
                                                {Array.from({ length: 6 }).map((_, index) => {
                                                    const sizeObj = sizesForNewImages.find(s => s.sizeId === activeSizeId);
                                                    const file = sizeObj?.imageWithBarSlot?.[index]; // كل slot صورة خاصة

                                                    return (
                                                        <div key={index} className="Image-Slot">
                                                            {file ? (
                                                                <img
                                                                    src={URL.createObjectURL(file)}
                                                                    alt="with-bar"
                                                                    style={{ width: "130px", height: "100px", objectFit: "cover", borderRadius: "4px" }}
                                                                />
                                                            ) : (
                                                                <button
                                                                    className="add-new-button"
                                                                    onClick={() => addSizeNewImage(activeSizeId, "with_bar", index)}
                                                                    // نبعت index عشان نحط الصورة في مكانها
                                                                    style={{ border: "none", width: "130px", height: "100px", backgroundColor: "#f6f6f6", borderRadius: "4px" }}
                                                                >
                                                                    <img src={imgSelect} alt="select-img" style={{ width: "40px", cursor: "pointer", marginBottom: "10px" }} />
                                                                    <p>Select Image</p>
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <div className="Size-Images images-without-bar">
                                        <h4 style={{ marginBottom: "15px", letterSpacing: "0.5px", fontSize: "17px" }}>Without Bar</h4>
                                        <div className="Images-Grid" style={{
                                            display: "flex",
                                            marginBottom: "20px",
                                            padding: "20px",
                                            boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
                                            borderRadius: "8px",
                                            width: "100%",
                                            height: "100%",
                                            flexWrap: "wrap",
                                            gap: "20px"
                                        }}>
                                            {Array.from({ length: 6 }).map((_, index) => {
                                                const sizeObj = sizesForNewImages.find(s => s.sizeId === activeSizeId);
                                                const file = sizeObj?.imageWithoutBarSlot?.[index]; // نفس الفكرة للـ without bar

                                                return (
                                                    <div key={index} className="Image-Slot">
                                                        {file ? (
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt="without-bar"
                                                                style={{ width: "130px", height: "100px", objectFit: "cover", borderRadius: "4px" }}
                                                            />
                                                        ) : (
                                                            <button
                                                                className="add-new-button"
                                                                onClick={() => addSizeNewImage(activeSizeId, "without_bar", index)}
                                                                style={{ border: "none", width: "130px", height: "100px", backgroundColor: "#f6f6f6", borderRadius: "4px" }}
                                                            >
                                                                <img src={imgSelect} alt="select-img" style={{ width: "40px", cursor: "pointer", marginBottom: "10px" }} />
                                                                <p>Select Image</p>
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                </>
            }
            <input
                type="file"
                ref={sizeImageInputRef}
                style={{ display: "none" }}
                accept="image/*"
            />
        </div>
    );
}

export default EditProduct;



