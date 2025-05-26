import { fetchStart, fetchSuccess, fetchFailure } from '../features/Product';
import api from '../../utils/api';

export const fetchProducts = (page = 1, limit = 8) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await api.get(`api/products?page=${page}&limit=${limit}`);
    const products = res.data;  // assuming your backend returns array of products for this page
    console.log(products)
    dispatch(fetchSuccess({
      products,
      page,
      hasMore: products.length === limit, // if returned less than limit, no more data
    }));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};