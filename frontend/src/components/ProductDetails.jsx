import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${id}`);
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

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <Link to="/">← Back to Products</Link>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 8 }}
      />
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Price:</strong> ₹{product.price.toLocaleString()}</p>
      {product.oldprice && (
        <p>
          <del>₹{product.oldprice.toLocaleString()}</del>{' '}
          <span style={{ color: 'red' }}>{product.off}% OFF</span>
        </p>
      )}
      <p><strong>Description:</strong></p>
      <p>{product.shortname || product.name}</p>
      <p><strong>Dimensions (cm):</strong> {product.dimensionscm}</p>
      <p><strong>Dimensions (inch):</strong> {product.dimensionsinch}</p>
      <p><strong>Material:</strong> {product.material}</p>
      <p><strong>Weight:</strong> {product.weight} kg</p>
      <p><strong>Rating:</strong> {product.ratingstar} ⭐ ({product.rating} reviews)</p>
      {/* Optionally add more images */}
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        {[product.image1, product.image2, product.image3].map((img, i) =>
          img ? (
            <img
              key={i}
              src={img}
              alt={`${product.name} ${i + 1}`}
              style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 6 }}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
