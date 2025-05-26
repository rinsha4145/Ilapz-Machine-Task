// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { socket } from '../utils/api';

// function AddProduct() {

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     category: '',
//     shortname: '',
//     name: '',
//     brand: '',
//     collections: '', 
//     dimensionscm: '',
//     dimensionsinch: '',
//     type: '',
//     seatingheight: 0,
//     weight: 0,
//     price: 0,
//     oldprice: 0,
//     off: 0,
//     rating: 0,
//     ratingstar: 0,
//     image: '',
//     image1: '',
//     image2: '',
//     image3: '',
//     material: '',
//     isDelete: false,
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

// //   if (!auth || auth.user.role !== 'admin') {
// //     return <p style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>Access denied. Admins only.</p>;
// //   }

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: name === 'price' || name === 'oldprice' || name === 'weight' || name === 'off' || name === 'rating' || name === 'ratingstar' || name === 'seatingheight'
//         ? Number(value)
//         : value,
//     }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const res = await axios.post('http://localhost:4000/api/products', form);

//       // Emit the product added event through socket
//       socket.emit('addProduct', res.data);

//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} style={{ maxWidth: 600, margin: '20px auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
//       <h2>Add New Product</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <input name="category" placeholder="Category" value={form.category} onChange={onChange} required />
//       <input name="shortname" placeholder="Short Name" value={form.shortname} onChange={onChange} required />
//       <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
//       <input name="brand" placeholder="Brand" value={form.brand} onChange={onChange} required />
//       <input name="collections" placeholder="Collections" value={form.collections} onChange={onChange} />
//       <input name="dimensionscm" placeholder="Dimensions (cm)" value={form.dimensionscm} onChange={onChange} />
//       <input name="dimensionsinch" placeholder="Dimensions (inch)" value={form.dimensionsinch} onChange={onChange} />
//       <input name="type" placeholder="Type" value={form.type} onChange={onChange} />
//       <input name="seatingheight" type="number" placeholder="Seating Height" value={form.seatingheight} onChange={onChange} />
//       <input name="weight" type="number" placeholder="Weight (kg)" value={form.weight} onChange={onChange} />
//       <input name="price" type="number" placeholder="Price" value={form.price} onChange={onChange} required />
//       <input name="oldprice" type="number" placeholder="Old Price" value={form.oldprice} onChange={onChange} />
//       <input name="off" type="number" placeholder="Discount (%)" value={form.off} onChange={onChange} />
//       <input name="rating" type="number" placeholder="Rating Count" value={form.rating} onChange={onChange} />
//       <input name="ratingstar" type="number" step="0.1" placeholder="Rating Stars" value={form.ratingstar} onChange={onChange} />
//       <input name="image" placeholder="Main Image URL" value={form.image} onChange={onChange} required />
//       <input name="image1" placeholder="Image 1 URL" value={form.image1} onChange={onChange} />
//       <input name="image2" placeholder="Image 2 URL" value={form.image2} onChange={onChange} />
//       <input name="image3" placeholder="Image 3 URL" value={form.image3} onChange={onChange} />
//       <input name="material" placeholder="Material" value={form.material} onChange={onChange} />
      
//       <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
//     </form>
//   );
// }

// export default AddProduct;


// import React, { useState } from 'react';
// import { X, Upload, Plus } from 'lucide-react';

// const AddProductForm = () => {
//   const [formData, setFormData] = useState({
//     category: '',
//     shortname: '',
//     name: '',
//     brand: '',
//     collections: '',
//     dimensionscm: '',
//     dimensionsinch: '',
//     type: '',
//     seatingheight: '',
//     weight: '',
//     price: '',
//     oldprice: '',
//     off: '',
//     rating: '',
//     ratingstar: '',
//     material: ''
//   });

//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageAdd = (e) => {
//     const files = Array.from(e.target.files);
    
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const newImage = {
//           id: Date.now() + Math.random(),
//           file: file,
//           preview: event.target.result,
//           name: file.name
//         };
//         setImages(prev => [...prev, newImage]);
//       };
//       reader.readAsDataURL(file);
//     });
    
//     // Reset file input
//     e.target.value = '';
//   };

//   const removeImage = (imageId) => {
//     setImages(prev => prev.filter(img => img.id !== imageId));
//   };

//   const handleSubmit = async (e) => {
//     if (images.length === 0) {
//       alert('Please add at least one image');
//       return;
//     }

//     setLoading(true);

//     try {
//       // In a real application, you would upload images to a server/cloud storage
//       // and get back URLs. For this example, we'll simulate this process
//       const imageUrls = images.map(img => img.preview); // In reality, these would be actual URLs

//       const productData = {
//         ...formData,
//         image: imageUrls,
//         seatingheight: Number(formData.seatingheight),
//         weight: Number(formData.weight),
//         price: Number(formData.price),
//         oldprice: Number(formData.oldprice),
//         off: formData.off ? Number(formData.off) : 0,
//         rating: Number(formData.rating),
//         ratingstar: Number(formData.ratingstar)
//       };

//       // Replace this with your actual API call
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData)
//       });

//       if (response.ok) {
//         alert('Product added successfully!');
//         // Reset form
//         setFormData({
//           category: '',
//           shortname: '',
//           name: '',
//           brand: '',
//           collections: '',
//           dimensionscm: '',
//           dimensionsinch: '',
//           type: '',
//           seatingheight: '',
//           weight: '',
//           price: '',
//           oldprice: '',
//           off: '',
//           rating: '',
//           ratingstar: '',
//           material: ''
//         });
//         setImages([]);
//       } else {
//         alert('Error adding product');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error adding product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      
//       <div className="space-y-6">
//         {/* Basic Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Short Name *</label>
//             <input
//               type="text"
//               name="shortname"
//               value={formData.shortname}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
//             <input
//               type="text"
//               name="brand"
//               value={formData.brand}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Collections *</label>
//             <input
//               type="text"
//               name="collections"
//               value={formData.collections}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
//             <input
//               type="text"
//               name="type"
//               value={formData.type}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Dimensions */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (CM) *</label>
//             <input
//               type="text"
//               name="dimensionscm"
//               value={formData.dimensionscm}
//               onChange={handleInputChange}
//               required
//               placeholder="e.g., 120x80x75"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (Inch) *</label>
//             <input
//               type="text"
//               name="dimensionsinch"
//               value={formData.dimensionsinch}
//               onChange={handleInputChange}
//               required
//               placeholder="e.g., 47x31x29"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Specifications */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Seating Height *</label>
//             <input
//               type="number"
//               name="seatingheight"
//               value={formData.seatingheight}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
//             <input
//               type="number"
//               step="0.1"
//               name="weight"
//               value={formData.weight}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Material *</label>
//             <input
//               type="text"
//               name="material"
//               value={formData.material}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Pricing */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
//             <input
//               type="number"
//               step="0.01"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Old Price *</label>
//             <input
//               type="number"
//               step="0.01"
//               name="oldprice"
//               value={formData.oldprice}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
//             <input
//               type="number"
//               name="off"
//               value={formData.off}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

       

//         {/* Image Upload Section */}
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Product Images *</label>
          
//           {/* Upload Button */}
//           <div className="flex items-center space-x-4">
//             <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors">
//               <Upload className="w-4 h-4 mr-2" />
//               Add Images
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageAdd}
//                 className="hidden"
//               />
//             </label>
//             <span className="text-sm text-gray-500">
//               {images.length} image(s) selected
//             </span>
//           </div>

//           {/* Image Preview */}
//           {images.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {images.map((image) => (
//                 <div key={image.id} className="relative group">
//                   <img
//                     src={image.preview}
//                     alt={image.name}
//                     className="w-full h-32 object-cover rounded-md border border-gray-300"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(image.id)}
//                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                   <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md truncate">
//                     {image.name}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
      
//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
//         >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 <span>Adding Product...</span>
//               </>
//             ) : (
//               <>
//                 <Plus className="w-4 h-4" />
//                 <span>Add Product</span>
//               </>
//             )}
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default AddProductForm;

import React, { useState } from 'react';
import { Upload, X, Plus, AlertCircle, CheckCircle } from 'lucide-react';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    shortname: '',
    name: '',
    brand: '',
    collections: '',
    dimensionscm: '',
    dimensionsinch: '',
    type: '',
    seatingheight: '',
    weight: '',
    price: '',
    oldprice: '',
    off: '',
    rating: '',
    ratingstar: '',
    material: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Validation rules
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'category':
      case 'shortname':
      case 'name':
      case 'brand':
      case 'collections':
      case 'dimensionscm':
      case 'dimensionsinch':
      case 'type':
      case 'material':
        if (!value.trim()) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        break;
      
      case 'seatingheight':
      case 'weight':
      case 'price':
      case 'oldprice':
        if (!value) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else if (Number(value) <= 0) {
          error = 'Must be a positive number';
        }
        break;
      
      case 'off':
        if (value && (Number(value) < 0 || Number(value) > 100)) {
          error = 'Discount must be between 0 and 100%';
        }
        break;
      
      case 'rating':
      case 'ratingstar':
        if (value && (Number(value) < 0 || Number(value) > 5)) {
          error = 'Rating must be between 0 and 5';
        }
        break;
    }

    // Special validation for old price vs price
    if (name === 'oldprice' && formData.price) {
      if (Number(value) < Number(formData.price)) {
        error = 'Old price should be greater than or equal to current price';
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field on change if it was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const newTouched = {};

    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          preview: event.target.result,
          name: file.name
        };
        setImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
    
    e.target.value = '';
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitMessage('Please fix the errors above');
      return;
    }

    if (images.length === 0) {
      setSubmitMessage('Please add at least one image');
      return;
    }

    setLoading(true);
    setSubmitMessage('');

    try {
      const imageUrls = images.map(img => img.preview);

      const productData = {
        ...formData,
        image: imageUrls,
        seatingheight: Number(formData.seatingheight),
        weight: Number(formData.weight),
        price: Number(formData.price),
        oldprice: Number(formData.oldprice),
        off: formData.off ? Number(formData.off) : 0,
        rating: Number(formData.rating),
        ratingstar: Number(formData.ratingstar)
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitMessage('Product added successfully!');
      
      // Reset form
      setFormData({
        category: '',
        shortname: '',
        name: '',
        brand: '',
        collections: '',
        dimensionscm: '',
        dimensionsinch: '',
        type: '',
        seatingheight: '',
        weight: '',
        price: '',
        oldprice: '',
        off: '',
        rating: '',
        ratingstar: '',
        material: ''
      });
      setImages([]);
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ name, label, type = 'text', required = false, placeholder = '', step }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        step={step}
        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
          errors[name] && touched[name]
            ? 'border-red-500 focus:border-red-500 bg-red-50'
            : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
        }`}
      />
      {errors[name] && touched[name] && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">Add New Product</h1>
          <p className="text-blue-100 mt-2">Fill in the details to add a new product to your inventory</p>
        </div>

        <div className="p-8">
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
              submitMessage.includes('success') 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {submitMessage.includes('success') ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{submitMessage}</span>
            </div>
          )}

          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="category" label="Category" required />
                <InputField name="shortname" label="Short Name" required />
                <InputField name="name" label="Product Name" required />
                <InputField name="brand" label="Brand" required />
                <InputField name="collections" label="Collections" required />
                <InputField name="type" label="Type" required />
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Dimensions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                  name="dimensionscm" 
                  label="Dimensions (CM)" 
                  placeholder="e.g., 120x80x75" 
                  required 
                />
                <InputField 
                  name="dimensionsinch" 
                  label="Dimensions (Inch)" 
                  placeholder="e.g., 47x31x29" 
                  required 
                />
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField name="seatingheight" label="Seating Height" type="number" required />
                <InputField name="weight" label="Weight (kg)" type="number" step="0.1" required />
                <InputField name="material" label="Material" required />
              </div>
            </div>

            {/* Pricing & Rating */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Pricing & Rating
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField name="price" label="Price" type="number" step="0.01" required />
                <InputField name="oldprice" label="Old Price" type="number" step="0.01" required />
                <InputField name="off" label="Discount (%)" type="number" />
                <InputField name="rating" label="Rating" type="number" step="0.1" />
                <InputField name="ratingstar" label="Rating Star" type="number" />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Product Images
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <label className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                    <Upload className="w-5 h-5 mr-2" />
                    Add Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageAdd}
                      className="hidden"
                    />
                  </label>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{images.length} image(s) selected</span>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg border border-gray-300 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 rounded-b-lg truncate">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-3 shadow-lg font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Adding Product...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;