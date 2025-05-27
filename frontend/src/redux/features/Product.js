import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    },
    addProductToList: (state, action) => {
      return [action.payload, ...state];
    },
    updateProductInList: (state, action) => {
      return state.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    softDeleteProductFromList: (state, action) => {
      return state.map((product) =>
        product._id.toString() === action.payload.toString()
          ? { ...product, isDelete: true }
          : product
      );
    },
  },
});

export const {
  setProduct,
  addProductToList,
  updateProductInList,
  softDeleteProductFromList,
} = productSlice.actions;

export default productSlice.reducer;
