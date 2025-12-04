import imgProduct from "../images/Group 429.svg";
import "../css/EditProduct.css";
import { useNavigate } from "react-router-dom";
import imgEdit from "../images/Group 445.svg";
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
    const [Editname, setEditname] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedMaterilas, setSelectedMaterials] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [mainImageId, setMainImageId] = useState(null);
    const [mainImagePath, setMainImagePath] = useState("");
    const [selectedImageId, setSelectedImageId] = useState(null);

    const fileInputRef = useRef(null);
    const { ProductID } = useParams();
    const navigate = useNavigate();

    // ======================== Fetch functions ========================
    const getProductData = async () => {
        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/v2/products/${ProductID}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("فشل في جلب بيانات المنتج");
            const data = await response.json();
            setProduct(data.product);

            // تعيين الصورة الرئيسية عند تحميل المنتج
            if (data.product.images?.length > 0) {
                setMainImageId(data.product.images[0].id);
                setMainImagePath(data.product.images[0].image_path);
            }

        } catch (error) {
            console.error("حدث خطأ أثناء جلب بيانات المنتج:", error);
        }
    };

    const getAllCategories = async () => {
        try {
            const res = await authFetch(`https://united-hanger-2025.up.railway.app/api/categories/get_all`, { method: "GET" });
            const data = await res.json();
            setAllCategories(data.categories);
        } catch (error) {
            console.error("Error Not Found Data", error);
        }
    };

    const getAllMaterials = async () => {
        try {
            const res = await authFetch(`https://united-hanger-2025.up.railway.app/api/materials`, { method: "GET", headers: { "Authorization": `Bearer ${token}` } });
            const data = await res.json();
            setAllmaterial(data.materials);
        } catch (error) {
            console.error("Error not found data", error);
        }
    };

    const getAllSizes = async () => {
        try {
            const res = await authFetch(`https://united-hanger-2025.up.railway.app/api/sizes`, { method: "GET", headers: { "Authorization": `Bearer ${token}` } });
            const data = await res.json();
            setAllSizes(data.sizes);
        } catch (error) {
            console.error("Error not found data", error);
        }
    };

    const getAllColors = async () => {
        try {
            const res = await authFetch(`https://united-hanger-2025.up.railway.app/api/colors`, { method: "GET", headers: { "Authorization": `Bearer ${token}` } });
            const data = await res.json();
            setAllColors(data.colors);
        } catch (error) {
            console.error("Error not found data", error);
        }
    };

    useEffect(() => {
        getProductData();
        getAllCategories();
        getAllMaterials();
        getAllSizes();
        getAllColors();
    }, []);

    // ======================== Update Product ========================
    const EditProductFunc = async () => {
        if (!Editname) return alert("Please enter product name.");
        if (selectedCategories.length === 0) return alert("Please select at least one category.");
        if (selectedColors.length === 0) return alert("Please select at least one color.");
        if (selectedMaterilas.length === 0) return alert("Please select at least one material.");
        if (selectedSizes.length === 0) return alert("Please select at least one size.");

        const bodyData = {
            name: Editname,
            category_ids: selectedCategories,
            color_ids: selectedColors,
            material_ids: selectedMaterilas,
            size_ids: selectedSizes
        };

        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/v2/products/${ProductID}/edit`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("✅ Product updated successfully!");
                handleNavigate();
            } else {
                alert("❌ Failed to update Product. Please try again.");
                console.error(data);
            }
        } catch (error) {
            console.error("❌ Error while updating product:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // ======================== Update Image ========================

    const updateImage = async (imageId, newFile) => {
        const formData = new FormData();
        formData.append("delete", 0);
        formData.append("image", newFile);
        formData.append("image_id", imageId);

        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/products/${ProductID}/image`, {
                method: "PATCH",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Image updated successfully!");

                // لو الصورة اللي عدلتها هي الصورة الكبيرة، حدّثها مباشرة
                if (imageId === mainImageId) {
                    const newURL = URL.createObjectURL(newFile);
                    setMainImagePath(newURL);
                }

                getProductData(); // لتحديث الصور الصغيرة
            } else {
                alert("❌ Failed to update image");
                console.log(data);
            }
        } catch (error) {
            console.error("❌ Error updating image:", error);
        }
    };

    // ======================== Handle Navigation ========================
    const handleNavigate = () => navigate("/Products");

    // ======================== Select handlers ========================
    const handleSelectCategory = id => setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    const handleSelectMaterials = id => setSelectedMaterials(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    const handleSelectSizes = id => setSelectedSizes(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    const handleSelectColors = id => setSelectedColors(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

    const [allmaterials, setAllmaterial] = useState([]);
    const [allSizes, setAllSizes] = useState([]);
    const [allColors, setAllColors] = useState([]);

    // ======================== Render ========================

    //Add Two new images Product//
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    const handleImageChange1 = (event) => {
        const file = event.target.files[0];
        if (file) setImage1(file);
    };
    const handleImageChange2 = (event) => {
        const file = event.target.files[0];
        if (file) setImage2(file);
    };

    //

    return (
        <div className="Edit-Product-Departament" style={{ overflow: "hidden" }}>
            <div className="heading-EditProduct">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgProduct} alt="imgIcon" />
                    <p>Edit Product</p>
                </div>
            </div>

            <div className="col-Delete-Edit" style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <button className="Edit" onClick={EditProductFunc}>Edit</button>
            </div>

            <div className="col-images"><p>Images</p></div>

            {Product.length === 0 ? <Loading /> :
                <>
                    <div className="Images-Departament">
                        {/* الصورة الكبيرة */}
                        <div className="main-Image">
                            <img className="img-Product" src={mainImagePath} alt="img-Product" style={{ objectFit: "contain" }} />
                            <div className="Delete-Edit-Image" style={{ display: "flex", justifyContent: "flex-end" }}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            updateImage(selectedImageId, e.target.files[0]);
                                        }
                                    }}
                                />
                                <img src={imgEdit} alt="img-Edit"
                                    onClick={() => {
                                        setSelectedImageId(mainImageId);
                                        fileInputRef.current.click();
                                    }}
                                />
                            </div>
                        </div>

                        {/* الصور الصغيرة */}
                        <div className="all-Images-Products">
                            <div className="col-img-product">
                                {Product.images.map(img => (
                                    <div key={img.id} className="main-img-product">
                                        <img className="main-img" src={img.image_path} alt="img-Product" style={{ objectFit: "contain" }} />
                                        <div className="Delete-Edit-Img" style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <img src={ProductEdit} alt="img-Edit"
                                                onClick={() => {
                                                    setSelectedImageId(img.id);
                                                    fileInputRef.current.click();
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="add-new-images-product" style={{ display: "flex", flexWrap: "wrap" }}>
                                <div className="col-one">
                                    <div className="select-Image-Product">
                                        <div className="content-image" style={{ marginTop: "20px" }}>
                                            <input type="file" onChange={handleImageChange1} name="img-Product" />
                                            <img src={imgSelect} alt="img-Select" style={{ objectFit: "contain" }} />
                                            <p>Select Image</p>
                                            {image1 && (
                                                <img
                                                    className="img-upload-small"
                                                    src={URL.createObjectURL(image1)}
                                                    alt="Uploaded"
                                                    style={{
                                                        position: "absolute",
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-one">
                                    <div className="select-Image-Product">
                                        <div className="content-image" style={{ marginTop: "20px" }}>
                                            <input type="file" onChange={handleImageChange2} name="img-Product" />
                                            <img src={imgSelect} alt="img-Select" style={{ objectFit: "contain" }} />
                                            <p>Select Image</p>
                                            {image2 && (
                                                <img
                                                    className="img-upload-small"
                                                    src={URL.createObjectURL(image2)}
                                                    alt="Uploaded"
                                                    style={{
                                                        position: "absolute",
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* المحتوى */}
                    <div className="content-Product-Submit">
                        <div className="Name-Description-Col">
                            <form>
                                <div className="col-Name">
                                    <label>Name</label>
                                    <input type="text" placeholder={Product.name} onChange={(e) => setEditname(e.target.value)} />
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
                                        <p key={material.id} className={`material-item ${selectedMaterilas.includes(material.id) ? "selected" : ""}`}
                                            onClick={() => handleSelectMaterials(material.id)}>
                                            {material.name}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="col-all-categories col-Raw-Material">
                                <h3>Category</h3>
                                <div className="material">
                                    {allCategories.length === 0 ? <h3>Loading Data ...</h3> :
                                        allCategories.map(category => (
                                            <p key={category.id} style={{ width: "fit-content", paddingLeft: "20px", paddingRight: "20px" }}
                                                className={`material-item ${selectedCategories.includes(category.id) ? "selected" : ""}`}
                                                onClick={() => handleSelectCategory(category.id)}>
                                                {category.name}
                                            </p>
                                        ))
                                    }
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
                                            onClick={() => handleSelectColors(color.id)}>
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
                                            onClick={() => handleSelectSizes(size.id)}>
                                            {`${size.value} ${size.unit}`}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default EditProduct;



