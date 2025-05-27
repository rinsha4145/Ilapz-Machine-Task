import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { ArrowLeft, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { useSelector } from 'react-redux';
function ProductDetail() {
    const user = useSelector((state) => state.auth.admin);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
console.log(id)
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load product',err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
    const discountPercentage = product?.oldprice ? Math.round(((product?.oldprice - product?.price) / product?.oldprice) * 100) : 0;
  const savings = product?.oldprice ? product?.oldprice - product?.price : 0;

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Navigation */}
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200">
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.oldprice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex gap-3">
                {[product.image1, product.image2, product.image3].map((img, i) =>
                  img ? (
                    <div key={i} className="flex-1">
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-colors duration-200"
                      />
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-blue-600 font-medium mb-2">{product.brand}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.ratingstar) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{product.ratingstar}</span>
                  <span className="text-sm text-gray-500">({product.rating.toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  {product.oldprice && (
                    <span className="text-lg text-gray-500 line-through">₹{product.oldprice.toLocaleString()}</span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-green-600 font-medium">You save ₹{savings.toLocaleString()}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.shortname || product.name}</p>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Specifications</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <span className="ml-2 font-medium">{product.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Material:</span>
                      <span className="ml-2 font-medium">{product.material}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Weight:</span>
                      <span className="ml-2 font-medium">{product.weight} kg</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Dimensions</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">CM:</span>
                      <span className="ml-2 font-medium">{product.dimensionscm}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Inches:</span>
                      <span className="ml-2 font-medium">{product.dimensionsinch}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditional rendering for user role */}
              {user?.role === "user" && (
                <>
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                      Add to Cart
                    </button>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200">
                      Buy Now
                    </button>
                  </div>

                  {/* Features */}
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck size={16} className="text-green-600" />
                      <span>Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <RotateCcw size={16} className="text-blue-600" />
                      <span>Easy Return</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield size={16} className="text-purple-600" />
                      <span>1 Year Warranty</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Conditional Additional Information - only show for users */}
        {user?.role === "user" && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Premium build quality with durable materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Advanced noise cancellation technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Long-lasting battery life up to 30 hours</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Info</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Standard Delivery:</span>
                    <span className="font-medium">3-5 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Delivery:</span>
                    <span className="font-medium">1-2 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Free shipping on orders over:</span>
                    <span className="font-medium">₹999</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Policy</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>30-day hassle-free returns</p>
                  <p>Original packaging required</p>
                  <p>Refund processed within 5-7 business days</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
