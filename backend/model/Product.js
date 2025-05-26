import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  shortname: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  collections: { type: String, required: true },
  dimensionscm: { type: String, required: true },
  dimensionsinch: { type: String, required: true },
  type: { type: String, required: true },
  seatingheight: { type: Number, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
  oldprice: { type: Number, required: true },
  off: { type: Number},
  rating: { type: Number, required: true },
  ratingstar: { type: Number, required: true },
  image: { type: Array, required: true },
  
  material: { type: String, required: true },
  isDelete: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
