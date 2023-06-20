import React, { useState } from "react";

const AddProduct = ({ setProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const productData = {
      name_prod: name,
      price: price,
    };

    fetch("http://localhost:4000/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Producto agregado:");
        fetch("http://localhost:4000/productos")
          .then((response) => response.json())
          .then((data2) => {
            console.log(data2.products);
            setProducts(data2.products);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));

    setName(""); // Limpiar el campo de nombre
    setPrice(""); // Limpiar el campo de precio
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddProduct;
