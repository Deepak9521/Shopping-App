import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../redux/productSlice';

const Home = () => {
  const products = useSelector(selectProducts);

  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock <= 5).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const categories = [...new Set(products.map(p => p.category))].length;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <div className="value">{totalProducts}</div>
        </div>
        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <div className="value">{lowStockProducts}</div>
        </div>
        <div className="stat-card">
          <h3>Total Inventory Value</h3>
          <div className="value">${totalValue.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <div className="value">{categories}</div>
        </div>
      </div>
      
      {lowStockProducts > 0 && (
        <div className="table-container">
          <h2>Low Stock Alert</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Current Stock</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter(p => p.stock <= 5)
                .map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td className="low-stock">{product.stock}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;