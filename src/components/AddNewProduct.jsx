import "../css/AddNewProduct.css";
import imgProduct from "../images/Group 429.svg";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./Submit";
import imgSelect from "../images/Vector (2).png";
import { useEffect, useState } from "react";
import { token } from "./token";
import "../css/cssNewProduct.css";
import { authFetch } from "./authFetch.js";
import Loading from "./Loading.jsx";
import { FaPlus } from "react-icons/fa6";
function AddNewProduct() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/Products");
    };

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSelectCategory = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((catId) => catId !== id)
                : [...prev, id]
        );
    };

    const [Title, setTitle] = useState("Title");
    const [Description, setDescription] = useState("Description . . .");

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [image6, setImage6] = useState(null);

    const handleImageChange1 = (event) => {
        const file = event.target.files[0];
        if (file) setImage1(file);
    };
    const handleImageChange2 = (event) => {
        const file = event.target.files[0];
        if (file) setImage2(file);
    };
    const handleImageChange3 = (event) => {
        const file = event.target.files[0];
        if (file) setImage3(file);
    };
    const handleImageChange4 = (event) => {
        const file = event.target.files[0];
        if (file) setImage4(file);
    };
    const handleImageChange5 = (event) => {
        const file = event.target.files[0];
        if (file) setImage5(file);
    };
    const handleImageChange6 = (event) => {
        const file = event.target.files[0];
        if (file) setImage6(file);
    };

    const images = [image1, image2, image3, image4, image5];

    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const [allmaterials, setAllmaterial] = useState([]);
    const [allSizes, setAllSizes] = useState([]);
    const [allColors, setAllColors] = useState([]);
    const [categories, setcategories] = useState([]);

    const getAllMaterials = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app//api/materials`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then(data => setAllmaterial(data.materials));
        } catch (error) {
            console.error("Error not found data", error);
            alert("Not Found Data");
        }
    };

    const getAllSizes = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app//api/sizes`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then(data => setAllSizes(data.sizes));
        } catch (error) {
            console.error("Error not found data", error);
        }
    };

    const getAllColors = async () => {
        try {
            await authFetch("https://united-hanger-2025.up.railway.app//api/colors", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => setAllColors(data.colors));
        } catch (error) {
            console.error("Error not found data", error);
        }
    };

    const getAllCategories = async () => {
        try {
            await authFetch(`https://united-hanger-2025.up.railway.app/api/categories/get_all`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then(data => setcategories(data.categories));
        } catch (error) {
            console.error("Error not found data", error);
        }
    };

    useEffect(() => {
        getAllMaterials();
        getAllSizes();
        getAllColors();
        getAllCategories();
    }, []);

    const handleSelectMaterial = (id) => {
        setSelectedMaterials((prev) =>
            prev.includes(id)
                ? prev.filter((materialId) => materialId !== id)
                : [...prev, id]
        );
    };

    const handleSelectSize = (id) => {
        setSelectedSizes((prev) =>
            prev.includes(id)
                ? prev.filter((sizeId) => sizeId !== id)
                : [...prev, id]
        );
    };

    const handleSelectColor = (id) => {
        setSelectedColors((prev) =>
            prev.includes(id)
                ? prev.filter((colorId) => colorId !== id)
                : [...prev, id]
        );
    };

    const [name, setName] = useState("");
    //can has bar
    const [checked, setChecked] = useState(false);

    //
    const hasAtLeastOneImage = (obj) => {
        if (!obj) return false;
        return Object.values(obj).some(file => file instanceof File);
    };

    const hasSizeImage = (sizeImages, sizeId, type) => {
        return sizeImages?.[sizeId]?.[type] &&
            Object.values(sizeImages[sizeId][type]).some(file => file instanceof File);
    };

    const [sizeImages, setSizeImages] = useState({});


    useEffect(() => {
        console.log(checked)
    }, [checked]);
    //

    const handleSizeImageChange = (sizeId, type, index, file) => {
        setSizeImages(prev => ({
            ...prev,
            [sizeId]: {
                ...prev[sizeId],
                [type]: {
                    ...(prev[sizeId]?.[type] || {}),
                    [index]: file
                }
            }
        }));
    };

    const selectedSizesData = allSizes.filter(size =>
        selectedSizes.includes(size.id)
    );

    //Color Groups
    const [groups, setGroups] = useState(true);
    const [colorsGroup, setColorsGroup] = useState([]);
    const [nameGroup, setNameGroup] = useState("");
    const handleSelectColorGroup = (id) => {
        setColorsGroup((prev) =>
            prev.includes(id)
                ? prev.filter((colorId) => colorId !== id)
                : [...prev, id]
        );
    };

    const [colorImage1, setColorImage1] = useState(null);
    const [colorImage2, setColorImage2] = useState(null);
    const [colorImage3, setColorImage3] = useState(null);
    const [colorImage4, setColorImage4] = useState(null);
    const [colorImage5, setColorImage5] = useState(null);
    const [colorImage6, setColorImage6] = useState(null);

    const handleColorImageChange1 = (event) => {
        const file = event.target.files[0];
        if (file) setColorImage1(file);
    };
    const handleColorImageChange2 = (event) => {
        const file = event.target.files[0];
        if (file) setColorImage2(file);
    };
    const handleColorImageChange3 = (event) => {
        const file = event.target.files[0];
        if (file) setColorImage3(file);
    };
    const handleColorImageChange4 = (event) => {
        const file = event.target.files[0];
        if (file) setColorImage4(file);
    };
    const handleColorImageChange5 = (event) => {
        const file = event.target.files[0];
        if (file) setColorImage5(file);
    };
    const handleColorImageChange6 = (event) => {
        const file = event.target.files[0];
        if (file) setColorImage6(file);
    };
    //update color groups
    const [colorGroups, setColorGroups] = useState([]);
    const addColorGroup = () => {
        setColorGroups(prev => [
            ...prev,
            {
                name: "",
                color_ids: [],
                images: []
            }
        ]);
    };

    const handleGroupNameChange = (index, value) => {
        setColorGroups(prev => {
            const updated = [...prev];
            updated[index].name = value;
            return updated;
        });
    };

    const handleGroupColorToggle = (groupIndex, colorId) => {
        setColorGroups(prev => {
            const updated = [...prev];
            const colors = updated[groupIndex].color_ids;

            updated[groupIndex].color_ids = colors.includes(colorId)
                ? colors.filter(id => id !== colorId)
                : [...colors, colorId];

            return updated;
        });
    };

    const handleGroupImageChange = (groupIndex, file) => {
        if (!file) return;

        setColorGroups(prev => {
            const updated = [...prev];
            updated[groupIndex].images.push(file);
            return updated;
        });
    };


    const AddNewProduct = async () => {
        for (let i = 0; i < colorGroups.length; i++) {
            const group = colorGroups[i];

            if (!group.name.trim()) {
                alert(`⚠️ Group ${i + 1}: name is required`);
                return;
            }

            if (group.color_ids.length === 0) {
                alert(`⚠️ Group ${i + 1}: select at least one color`);
                return;
            }

            if (group.images.length === 0) {
                alert(`⚠️ Group ${i + 1}: upload at least one image`);
                return;
            }
        }

        // 🔹 1. لازم Category
        if (selectedCategories.length === 0) {
            alert("⚠️ Please select at least one category");
            return;
        }

        // 🔹 2. لازم Size
        if (selectedSizes.length === 0) {
            alert("⚠️ Please select at least one size");
            return;
        }

        // 🔹 3. Validation الصور حسب can_has_bar
        for (let sizeId of selectedSizes) {

            if (checked) {
                // WITH BAR required
                if (!hasSizeImage(sizeImages, sizeId, "with_bar")) {
                    alert(`⚠️ Size ${sizeId}: Please upload at least one image WITH BAR`);
                    return;
                }

                // WITHOUT BAR required
                if (!hasSizeImage(sizeImages, sizeId, "without_bar")) {
                    alert(`⚠️ Size ${sizeId}: Please upload at least one image WITHOUT BAR`);
                    return;
                }
            } else {
                // ONLY WITHOUT BAR required
                if (!hasSizeImage(sizeImages, sizeId, "without_bar")) {
                    const sizeObj = allSizes.find(s => s.id === sizeId);
                    alert(`⚠️ Please upload at least one image for size ${sizeObj?.value} ${sizeObj?.unit}`);
                    return;
                }
            }
        }

        setLoading(true);

        const productData = {
            name: name,
            color_ids: selectedColors,
            size_ids: selectedSizes,
            material_ids: selectedMaterials,
            category_ids: selectedCategories,
            description: Description,
            can_has_bar: checked,
        };

        const formData = new FormData();

        if (colorGroups.length > 0) {
            productData.color_groups = colorGroups.map(group => ({
                name: group.name,
                color_ids: group.color_ids
            }));
        }

        colorGroups.forEach((group, groupIndex) => {
            group.images.forEach((img, imgIndex) => {
                formData.append(
                    `color_group[${groupIndex}][image][${imgIndex}]`,
                    img
                );
            });
        });

        formData.append("product_data", JSON.stringify(productData));
        if (image1) formData.append("images", image1);
        if (image2) formData.append("images", image2);
        if (image3) formData.append("images", image3);
        if (image4) formData.append("images", image4);
        if (image5) formData.append("images", image5);
        if (image6) formData.append("images", image6);

        selectedSizes.forEach((sizeId, sizeIndex) => {

            // WITHOUT BAR (دايمًا)
            if (sizeImages[sizeId]?.without_bar) {
                Object.entries(sizeImages[sizeId].without_bar).forEach(([imgIndex, file]) => {
                    formData.append(
                        `size[${sizeIndex}][image_without_bar][${imgIndex}]`,
                        file
                    );
                });
            }

            // WITH BAR (لو checked)
            if (checked && sizeImages[sizeId]?.with_bar) {
                Object.entries(sizeImages[sizeId].with_bar).forEach(([imgIndex, file]) => {
                    formData.append(
                        `size[${sizeIndex}][image_with_bar][${imgIndex}]`,
                        file
                    );
                });
            }
        });

        try {
            const response = await authFetch(`https://united-hanger-2025.up.railway.app/api/products/new`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                alert("❌ Failed to add product, please check your data and images");
                return;
            }

            const data = await response.json();
            console.log({ data, images, productData });

            alert("✅ Product added successfully");
            handleNavigate();
        } catch (error) {
            console.log("Error adding product:", error);
            alert("❌ Failed to add product. Please try again");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="Add-New-Product-Departament">
            <>
                <div className="heading-AddNewProduct">
                    <div className="col-image">
                        <img onClick={handleNavigate} src={imgProduct} alt="img-Product" />
                        <p>Add New Product</p>
                    </div>
                </div>
                <div
                    className="submit-col"
                    onClick={async () => {
                        await AddNewProduct();
                    }}
                >
                    <SubmitButton />
                </div>
                <div className="all-content-addnew-product">
                    <div className="content-Product-Submit" style={{ display: "flex", flexDirection: "column", marginTop: "0px" }}>
                        <div className="Name-Description-Col">
                            <form action="">
                                <div className="col-Name">
                                    <label>Name</label>
                                    <input
                                        onFocus={() => setTitle("")}
                                        onBlur={() => setTitle("Title")}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        placeholder={Title}
                                    />
                                </div>
                                <div className="col-Description">
                                    <label>Description</label>
                                    <input
                                        onFocus={() => setDescription("")}
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                        }}
                                        type="text"
                                        placeholder={Description}
                                    />
                                </div>
                            </form>
                            <div className="content-checkbox" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <input type="checkbox"
                                    checked={checked}
                                    onChange={(e) => {
                                        setChecked(e.target.checked)
                                    }}
                                    style={{ cursor: "pointer", width: "20px", height: "20px" }} />
                                {checked ?
                                    <span style={{ textTransform: "capitalize" }}>has bar</span>
                                    :
                                    <span style={{ textTransform: "capitalize" }}>no bar</span>
                                }
                            </div>
                            <div className="col-Raw-Material">
                                <h3>Raw Material</h3>
                                <div className="material">
                                    {allmaterials.length === 0 ? (
                                        <h3>Loading Data ...</h3>
                                    ) : (
                                        allmaterials.map((material) => (
                                            <p
                                                key={material.id}
                                                className={`material-item ${selectedMaterials.includes(material.id) ? "selected" : ""}`}
                                                onClick={() => handleSelectMaterial(material.id)}
                                            >
                                                {material.name}
                                            </p>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="col-all-categories col-Raw-Material" style={{ marginTop: "0px" }}>
                                <h3>Category</h3>
                                <div className="material">
                                    {categories.length === 0 ? (
                                        <h3>Loading Data ...</h3>
                                    ) : (
                                        categories.map((category) => (
                                            <p
                                                style={{ width: "fit-content", paddingLeft: "20px", paddingRight: "20px" }}
                                                key={category.id}
                                                className={`material-item ${selectedCategories.includes(category.id) ? "selected" : ""}`}
                                                onClick={() => handleSelectCategory(category.id)}
                                            >
                                                {category.name}
                                            </p>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="Colors-Sizes-Col">
                            <div className="Colors-Departament">
                                <h3>Colors</h3>
                                <div className="ALL-Col-Colors">
                                    {allColors.length === 0 ? (
                                        <h3>Loading Data ...</h3>
                                    ) : (
                                        allColors.map((color) => (
                                            <div
                                                key={color.id}
                                                className={`color-item onclick-btn ${selectedColors.includes(color.id) ? "selected" : ""}`}
                                                onClick={() => handleSelectColor(color.id)}
                                            >
                                                <li style={{ backgroundColor: color.hex_code }}></li>
                                                <p className="selected">{color.name}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="Sizes-Departament">
                                <h3>Sizes</h3>
                                <div className="ALL-Col-Sizes">
                                    {allSizes.length === 0 ? (
                                        <h3>Loading Data ...</h3>
                                    ) : (
                                        allSizes.map((size) => (
                                            <p
                                                key={size.id}
                                                className={`size-item ${selectedSizes.includes(size.id) ? "selected" : ""}`}
                                                onClick={() => handleSelectSize(size.id)}
                                            >
                                                {size.value} {size.unit}
                                            </p>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="colors-groups-content" style={{ marginBottom: "20px", letterSpacing: "0.5px" }}>
                                <div className="heading-group" style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
                                    <FaPlus style={{ cursor: "pointer", fontSize: "25px" }}
                                        onClick={addColorGroup}
                                    />
                                    <h3>Color Groups</h3>
                                </div>
                                {colorGroups.map((group, groupIndex) => (
                                    <div
                                        key={groupIndex}
                                        className="information-colors-group Colors-Departament"
                                        style={{ boxShadow: "0 4px 10px rgba(0,0,0,.15)", padding: 15, borderRadius: "10px", marginBottom: "20px" }}
                                    >

                                        {/* Group Name */}
                                        <div className="content-group-name" style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "20px" }}>
                                            <label>Group Name</label>
                                            <input
                                                style={{ border: "none", outline: "none", backgroundColor: "#f6f6f6", height: "40px", padding: "10px" }}
                                                type="text"
                                                placeholder="Enter Group Name"
                                                value={group.name}
                                                onChange={(e) =>
                                                    handleGroupNameChange(groupIndex, e.target.value)
                                                }
                                            />
                                        </div>
                                        {/* Colors */}
                                        <div className="ALL-Col-Colors">
                                            {allColors.map(color => (
                                                <div
                                                    key={color.id}
                                                    className={`color-item ${group.color_ids.includes(color.id) ? "selected" : ""
                                                        }`}
                                                    onClick={() =>
                                                        handleGroupColorToggle(groupIndex, color.id)
                                                    }
                                                >
                                                    <li style={{ backgroundColor: color.hex_code }} />
                                                    <p>{color.name}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Images */}
                                        <div className="all-images">
                                            <div className="col-select-img" style={{ backgroundColor: "#f6f6f6", maxWidth: "160px", borderRadius: "10px", textAlign: "center", padding: "15px", position: "relative" }}>
                                                <img src={imgSelect} alt="img-select" style={{ width: "50px", cursor: "pointer" }} />
                                                <p>select Image</p>
                                                <input
                                                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                                                    type="file"
                                                    onChange={(e) =>
                                                        handleGroupImageChange(groupIndex, e.target.files[0])
                                                    }
                                                />
                                            </div>
                                        </div>
                                        {/* Preview */}
                                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                            {group.images.map((img, i) => (
                                                <div className="col-image" style={{ backgroundColor: "#f6f6f6", padding: "10px", marginTop: "20px", width: "110px", height: "80px", borderRadius: "8px" }}>
                                                    <img
                                                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "flex", justifyContent: "center", alignItems: "center" }}
                                                        key={i}
                                                        src={URL.createObjectURL(img)}
                                                        width={60}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="all-select-images all-main-images-product" style={{ maxHeight: "100%", marginBottom: "20px" }}>
                            <div className="col-one">
                                <div className="select-Image-Product">
                                    <div className="content-image">
                                        {image1 ?
                                            ""
                                            :
                                            <>
                                                <input type="file" onChange={handleImageChange1} name="img-Product" />
                                                <img src={imgSelect} alt="img-Select" style={{ objectFit: "contain" }} />
                                                <p>Select Main Image</p>
                                            </>
                                        }
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
                                    <div className="content-image">
                                        {image2 ?
                                            ""
                                            :
                                            <>
                                                <input type="file" onChange={handleImageChange2} name="img-Product" />
                                                <img src={imgSelect} alt="img-Select" style={{ objectFit: "contain" }} />
                                                <p>Select Image</p>
                                            </>
                                        }

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
                            <div className="col-one">
                                <div className="select-Image-Product">
                                    <div className="content-image">
                                        {
                                            image3 ?
                                                ""
                                                :
                                                <>
                                                    <input type="file" onChange={handleImageChange3} name="img-Product" />
                                                    <img src={imgSelect} alt="img-Select" style={{ objectFit: "contain" }} />
                                                    <p>Select Image</p>
                                                </>
                                        }
                                        {image3 && (
                                            <img
                                                className="img-upload-small"
                                                src={URL.createObjectURL(image3)}
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
                                    <div className="content-image">
                                        {image4 ?
                                            ""
                                            :
                                            <>
                                                <input type="file" onChange={handleImageChange4} name="img-Product" />
                                                <img src={imgSelect} alt="img-Select" style={{ objectFit: "contain" }} />
                                                <p>Select Image</p>
                                            </>
                                        }
                                        {image4 && (
                                            <img
                                                className="img-upload-small"
                                                src={URL.createObjectURL(image4)}
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
                                    <div className="content-image">
                                        {image5 ?
                                            ""
                                            :
                                            <>
                                                <input type="file" onChange={handleImageChange5} name="img-Product" />
                                                <img src={imgSelect} alt="img-Select" style={{ objectFit: "contain" }} />
                                                <p>Select Image</p>
                                            </>
                                        }
                                        {image5 && (
                                            <img
                                                className="img-upload-small"
                                                src={URL.createObjectURL(image5)}
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
                                    <div className="content-image">
                                        {image6 ?
                                            ""
                                            :
                                            <>
                                                <input type="file" onChange={handleImageChange6} name="img-Product" />
                                                <img src={imgSelect} alt="img-Select" style={{ objectFit: "contain" }} />
                                                <p>Select Image</p>
                                            </>
                                        }
                                        {image6 && (
                                            <img
                                                className="img-upload-small"
                                                src={URL.createObjectURL(image6)}
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
                        {selectedSizesData.map((size) => (
                            <div
                                key={size.id}
                                className="all-select-images images-sizes"
                                style={{ display: "flex", flexDirection: "column", gap: "20px", Width: "fit-content", marginRight: "40px" }}
                            >
                                {/* 🔹 لو checked = false (نفس شغلك القديم) */}
                                {!checked && (
                                    <>
                                        <div className="col-heading">
                                            <p>{size.value} {size.unit}</p>
                                            <p>Images Without Bar</p>
                                        </div>

                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                                <div className="col-one" key={i}>
                                                    <div className="select-Image-Product">
                                                        <div className="content-image">
                                                            <input
                                                                type="file"
                                                                onChange={(e) =>
                                                                    handleSizeImageChange(
                                                                        size.id,
                                                                        "without_bar",
                                                                        i,
                                                                        e.target.files[0]
                                                                    )
                                                                }
                                                            />
                                                            <img src={imgSelect} alt="img-Select" />
                                                            <p>Select Image</p>

                                                            {sizeImages[size.id]?.without_bar?.[i] && (
                                                                <img
                                                                    className="img-upload-small"
                                                                    src={URL.createObjectURL(
                                                                        sizeImages[size.id].without_bar[i]
                                                                    )}
                                                                    alt="Uploaded"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* 🔹 لو checked = true */}
                                {checked && (
                                    <>
                                        {/* WITH BAR */}
                                        <div className="col-heading">
                                            <p>{size.value} {size.unit}</p>
                                            <p>Images With Bar</p>
                                        </div>

                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                                <div className="col-one" key={`with-${i}`}>
                                                    <div className="select-Image-Product">
                                                        <div className="content-image">
                                                            <input
                                                                type="file"
                                                                onChange={(e) =>
                                                                    handleSizeImageChange(
                                                                        size.id,
                                                                        "with_bar",
                                                                        i,
                                                                        e.target.files[0]
                                                                    )
                                                                }
                                                            />
                                                            <img src={imgSelect} alt="img-Select" />
                                                            <p>Select Image</p>

                                                            {sizeImages[size.id]?.with_bar?.[i] && (
                                                                <img
                                                                    className="img-upload-small"
                                                                    src={URL.createObjectURL(
                                                                        sizeImages[size.id].with_bar[i]
                                                                    )}
                                                                    alt="Uploaded"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* WITHOUT BAR */}
                                        <div className="col-heading">
                                            <p>{size.value} {size.unit}</p>
                                            <p>Images Without Bar</p>
                                        </div>

                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                                <div className="col-one" key={`without-${i}`}>
                                                    <div className="select-Image-Product">
                                                        <div className="content-image">
                                                            <input
                                                                type="file"
                                                                onChange={(e) =>
                                                                    handleSizeImageChange(
                                                                        size.id,
                                                                        "without_bar",
                                                                        i,
                                                                        e.target.files[0]
                                                                    )
                                                                }
                                                            />
                                                            <img src={imgSelect} alt="img-Select" />
                                                            <p>Select Image</p>

                                                            {sizeImages[size.id]?.without_bar?.[i] && (
                                                                <img
                                                                    className="img-upload-small"
                                                                    src={URL.createObjectURL(
                                                                        sizeImages[size.id].without_bar[i]
                                                                    )}
                                                                    alt="Uploaded"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content-loading" style={{ position: "fixed", zIndex: -1, width: "100%", height: "100%", top: "0", left: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {loading && <Loading />}
                </div>
            </>
        </div>
    );
}

export default AddNewProduct;





