import { useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable
} from "@hello-pangea/dnd";

const ProductList = () => {
    const [products, setProducts] = useState([
        { id: "p1", name: "Product 1" },
        { id: "p2", name: "Product 2" },
        { id: "p3", name: "Product 3" },
        { id: "p4", name: "Product 4" },
    ]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(products);
        const [moved] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, moved);

        setProducts(items);

        // لو حابب تبعت الترتيب الجديد للسيرفر:
        // authFetch("/api/update-order", { method: "POST", body: JSON.stringify(items) });
    };


    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ marginBottom: "20px" }}>Reorder Products</h2>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="product-list">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ width: "350px" }}
                        >
                            {products.map((product, index) => (
                                <Draggable
                                    key={product.id}
                                    draggableId={product.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                padding: "15px",
                                                marginBottom: "10px",
                                                background: "#fff",
                                                borderRadius: "8px",
                                                border: "1px solid #ddd",
                                                boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                                                cursor: "grab",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                ...provided.draggableProps.style,
                                            }}
                                        >
                                            <span>{product.name}</span>
                                            <span style={{ fontSize: "18px" }}>⠿</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ProductList;

