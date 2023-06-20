import React, { useState } from 'react';
import ProductsList from './components/ProductsList';
import AddProduct from './components/Addproduct';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  return (
    <>
      <ProductsList products={products} />
      <AddProduct setProducts={setProducts} />
    </>
  );
}

export default App;
