/*import imgProduct from "../images/Group 429.svg";
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

    const getProductData = async () => {
        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/v2/products/${ProductID}`,
                { method: "GET", headers: { "Authorization": `Bearer ${token}` } }
            );

            const data = await response.json();
            setProduct(data.product);

            if (data.product.images?.length > 0) {
                setMainImageId(data.product.images[0].id);
                setMainImagePath(data.product.images[0].image_path);
            }

        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

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


    const EditProductFunc = async () => {
        if (!Editname) return alert("Enter product name");
        if (!selectedCategories.length) return alert("Select category");
        if (!selectedColors.length) return alert("Select color");
        if (!selectedMaterilas.length) return alert("Select material");
        if (!selectedSizes.length) return alert("Select size");

        const bodyData = {
            name: Editname,
            category_ids: selectedCategories,
            color_ids: selectedColors,
            material_ids: selectedMaterilas,
            size_ids: selectedSizes,
        };

        const response = await authFetch(
            `https://united-hanger-2025.up.railway.app/api/v2/products/${ProductID}/edit`,
            {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("✔ Product Updated");
            navigate("/Products");
        } else {
            alert("❌ Error updating product");
            console.log(data);
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
                                    .filter(img => img.id !== mainImageId) // استبعاد الصورة الرئيسية
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
                                    <input type="text" placeholder={Product.description} />
                                </div>
                            </form>

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
                                            <p>{color.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="Sizes-Departament">
                                <h3>Sizes</h3>

                                <div className="ALL-Col-Sizes">
                                    {allSizes.map(size => (
                                        <p key={size.id}
                                            className={`material-item ${selectedSizes.includes(size.id) ? "selected" : ""}`}
                                            onClick={() => setSelectedSizes(prev =>
                                                prev.includes(size.id)
                                                    ? prev.filter(id => id !== size.id)
                                                    : [...prev, size.id]
                                            )}
                                        >
                                            {size.value} {size.unit}
                                        </p>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default EditProduct;*/

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
    const getProductData = async () => {
        try {
            const response = await authFetch(
                `https://united-hanger-2025.up.railway.app/api/v2/products/${ProductID}`,
                { method: "GET", headers: { "Authorization": `Bearer ${token}` } }
            );

            const data = await response.json();
            setProduct(data.product);

            if (data.product.images?.length > 0) {
                const mainImg = data.product.images.find(img => img.image_type === 0);

                if (mainImg) {
                    setMainImageId(mainImg.id);
                    setMainImagePath(mainImg.image_path);
                } else {
                    setMainImageId(data.product.images[0].id);
                    setMainImagePath(data.product.images[0].image_path);
                }
            }

        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

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

    const EditProductFunc = async () => {
        if (!Editname) return alert("Enter product name");
        if (!selectedCategories.length) return alert("Select category");
        if (!selectedColors.length) return alert("Select color");
        if (!selectedMaterilas.length) return alert("Select material");
        if (!selectedSizes.length) return alert("Select size");

        const bodyData = {
            name: Editname,
            category_ids: selectedCategories,
            color_ids: selectedColors,
            material_ids: selectedMaterilas,
            size_ids: selectedSizes,
        };

        const response = await authFetch(
            `https://united-hanger-2025.up.railway.app/api/v2/products/${ProductID}/edit`,
            {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("✔ Product Updated");
            navigate("/Products");
        } else {
            alert("❌ Error updating product");
            console.log(data);
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

                        {/* MAIN IMAGE */}
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

                        {/* SMALL IMAGES */}
                        <div className="all-Images-Products">
                            <div className="col-img-product">
                                {Product.images
                                    .filter(img => img.id !== mainImageId)
                                    .map(img => (
                                        <div key={img.id} className="main-img-product">
                                            <img className="main-img" src={img.image_path} style={{ objectFit: "contain" }} />
                                            <div className="Delete-Edit-Img">

                                                {/* Edit */}
                                                <img
                                                    style={{ objectFit: "contain" }}
                                                    src={ProductEdit}
                                                    onClick={() => {
                                                        fileInputRef.current.onclick = null;
                                                        fileInputRef.current.onchange = (e) => updateImage(img.id, e.target.files[0]);
                                                        fileInputRef.current.click();
                                                    }}
                                                />

                                                {/* Delete */}
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

                            {/* ADD NEW IMAGE */}
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

                    {/* FORM */}
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
                                    <input type="text" placeholder={Product.description} />
                                </div>
                            </form>

                            {/* MATERIALS */}
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

                            {/* CATEGORIES */}
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

                        {/* COLORS + SIZES */}
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
                                            <p>{color.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="Sizes-Departament">
                                <h3>Sizes</h3>

                                <div className="ALL-Col-Sizes">
                                    {allSizes.map(size => (
                                        <p key={size.id}
                                            className={`material-item ${selectedSizes.includes(size.id) ? "selected" : ""}`}
                                            onClick={() => setSelectedSizes(prev =>
                                                prev.includes(size.id)
                                                    ? prev.filter(id => id !== size.id)
                                                    : [...prev, size.id]
                                            )}
                                        >
                                            {size.value} {size.unit}
                                        </p>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default EditProduct;




