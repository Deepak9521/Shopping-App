import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct, selectProductById } from '../redux/productSlice';
import ProductForm from '../components/ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(state => selectProductById(state, id));

  const handleSubmit = (productData) => {
    dispatch(updateProduct({ ...productData, id: parseInt(id) }));
    navigate('/products');
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (!product) {
    return (
      <div className="form-container">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <ProductForm 
        product={product} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  );
};

export default EditProduct;