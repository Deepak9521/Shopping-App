import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectProducts } from '../redux/productSlice';
import ProductTable from '../components/ProductTable';

const Products = () => {
  const products = useSelector(selectProducts);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Products</h1>
        <Link to="/add-product" className="btn btn-primary">
          Add New Product
        </Link>
      </div>
      
      {products.length === 0 ? (
        <div className="table-container" style={{ padding: '2rem', textAlign: 'center' }}>
          <p>No products found. <Link to="/add-product">Add your first product</Link></p>
        </div>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default Products;