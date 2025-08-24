import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="navbar">
      <div className="navbar-content">
        <h1>Inventory Management</h1>
        <nav>
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/products" className={isActive('/products')}>Products</Link>
          <Link to="/add-product" className={isActive('/add-product')}>Add Product</Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;