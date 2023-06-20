import React, { useEffect, useState } from "react";

const ProductsList = ({products}) => {
  const [products0, setProducts] = useState(products);
  const getProducts = () => {
    fetch('http://localhost:4000/productos')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.products);
        setProducts(data.products)
      })
      .catch((error) => console.error(error))
  };
  useEffect(() => {
    getProducts()
  }, [products]);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products0 && products0.length &&
          products0.map((product) => (
            <li key={product.id}>
              <strong>{product.name_prod}</strong> - ${product.price}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductsList;
