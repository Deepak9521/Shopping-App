import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../redux/productSlice';

const ConfirmModal = ({ isOpen, onConfirm, onCancel, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete "{productName}"?</p>
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductTable = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteClick = (product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteProduct(deleteModal.product.id));
    setDeleteModal({ isOpen: false, product: null });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, product: null });
  };

  const formatPrice = (price) => `$${price.toFixed(2)}`;
  
  const isLowStock = (stock) => stock <= 5;

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatPrice(product.price)}</td>
                <td className={isLowStock(product.stock) ? 'low-stock' : ''}>
                  {product.stock}
                </td>
                <td>{product.expiry}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClick(product)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        productName={deleteModal.product?.name}
      />
    </>
  );
};

export default ProductTable;