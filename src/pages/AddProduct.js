import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/productSlice';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (productData) => {
    dispatch(addProduct(productData));
    navigate('/products');
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default AddProduct;