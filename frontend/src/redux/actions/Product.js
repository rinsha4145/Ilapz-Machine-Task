import { fetchStart, fetchSuccess, fetchFailure } from '../features/Product';
import api from '../../utils/api';

export const fetchProducts = (page = 1, limit = 8) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await api.get(`api/products?page=${page}&limit=${limit}`);
    const products = res.data; 
    console.log(products)
    dispatch(fetchSuccess({
      products,
      page,
      hasMore: products.length === limit, 
    }));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};