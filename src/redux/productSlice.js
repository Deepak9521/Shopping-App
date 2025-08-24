import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: 1,
      name: 'Laptop',
      category: 'Electronics',
      price: 999.99,
      stock: 15,
      expiry: '2025-12-31'
    },
    {
      id: 2,
      name: 'Coffee Beans',
      category: 'Food',
      price: 24.99,
      stock: 3,
      expiry: '2024-06-15'
    },
    {
      id: 3,
      name: 'Office Chair',
      category: 'Furniture',
      price: 199.99,
      stock: 8,
      expiry: '2026-01-01'
    }
  ],
  nextId: 4
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = {
        ...action.payload,
        id: state.nextId,
        price: parseFloat(action.payload.price),
        stock: parseInt(action.payload.stock)
      };
      state.products.push(product);
      state.nextId += 1;
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...action.payload,
          price: parseFloat(action.payload.price),
          stock: parseInt(action.payload.stock)
        };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    }
  }
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectProductById = (state, id) => 
  state.products.products.find(p => p.id === parseInt(id));

export default productSlice.reducer;