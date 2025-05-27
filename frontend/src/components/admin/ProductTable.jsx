// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import api, { socket } from "../../utils/api";
// import {  useNavigate } from "react-router-dom";
// import { softDeleteProductFromList } from "../../redux/features/Product";
// import { toast } from "react-toastify";


// export default function ProductTable() {
//       const product = useSelector((state) => state.product);
// const navigate=useNavigate()
//   const [products, setProducts] = useState(product);
//   const [filteredData, setFilteredData] = useState(product);


//   const [types, setTypes] = useState([]);
//   const [materials, setMaterials] = useState([]);
//   const [brands, setBrands] = useState([]);

//   const [selectedType, setSelectedType] = useState('');
//   const [selectedMaterial, setSelectedMaterial] = useState('');
//   const [selectedBrand, setSelectedBrand] = useState('');

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
// const dispatch = useDispatch()
//   useEffect(() => {
//     api.get('/products/categories').then(res => setTypes(res.data));
//   }, []);
//   useEffect(() => {
//     if (selectedType) {
//       api.post('/products/materials', { category: selectedType })
//         .then(res => setMaterials(res.data));
//       setSelectedMaterial('');
//       setBrands([]);
//       setSelectedBrand('');
//     } else {
//       setMaterials([]);
//       setSelectedMaterial('');
//       setBrands([]);
//       setSelectedBrand('');
//     }
//   }, [selectedType]);
//   useEffect(() => {
//     if (selectedType && selectedMaterial) {
//       api
//         .post('/products/brands', { category: selectedType, material: selectedMaterial })
//         .then(res => setBrands(res.data));
//       setSelectedBrand('');
//     } else {
//       setBrands([]);
//       setSelectedBrand('');
//     }
//   }, [selectedMaterial]);

//   const handleSearch = () => {
//     api
//       .post('/products/search', { category: selectedType, material: selectedMaterial, brand: selectedBrand })
//       .then(res => {
//         setProducts(res.data);
//         setFilteredData(res.data);
//         setCurrentPage(1);
//       });
//   };

//   // Sync filteredData when products change
//   useEffect(() => {
//     setFilteredData(products);
//   }, [products]);

//   const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(prev => prev - 1);
//   };
// const deleteProduct = async (id) => {
//   try {
//     const response = await api.put(`/products/delete/${id}`);
//     toast.success('Product marked as deleted successfully');
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     toast.error('Failed to delete product');
//   }
// };
// useEffect(() => {
//     socket.on("productListUpdated", (deletedProductId) => {
//       console.log("Received delete event for:", deletedProductId);
//       dispatch(softDeleteProductFromList(deletedProductId));
//     });

//     return () => {
//       socket.off("productListUpdated");
//     };
//   }, [dispatch]);

//   return (
//     <div className="p-4">
//         <div className="flex justify-between mb-4">
//       <div className=" space-x-4 flex flex-wrap gap-3">
//         <select
//           value={selectedType}
//           onChange={e => setSelectedType(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Type</option>
//           {types.map((type, idx) => (
//             <option key={idx} value={type}>{type}</option>
//           ))}
//         </select>

//         <select
//           value={selectedMaterial}
//           onChange={e => setSelectedMaterial(e.target.value)}
//           disabled={!selectedType || materials.length === 0}
//           className="border p-2 rounded disabled:opacity-50"
//         >
//           <option value="">Select Material</option>
//           {materials.map((mat, idx) => (
//             <option key={idx} value={mat}>{mat}</option>
//           ))}
//         </select>

//         <select
//           value={selectedBrand}
//           onChange={e => setSelectedBrand(e.target.value)}
//           disabled={!selectedMaterial || brands.length === 0}
//           className="border p-2 rounded disabled:opacity-50"
//         >
//           <option value="">Select Brand</option>
//           {brands.map((brand, idx) => (
//             <option key={idx} value={brand}>{brand}</option>
//           ))}
//         </select>

//         <button
//           onClick={handleSearch}
//         //   disabled={!selectedBrand}
//           className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           Search
//         </button>
//       </div>
//       <button
//           className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
//       onClick={()=>navigate('/admin/add-product')}
//         >
//           Add Product
//         </button>
//       </div>

//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="py-2 px-4 border">Name</th>
//             <th className="py-2 px-4 border">Type</th>
//             <th className="py-2 px-4 border">Material</th>
//             <th className="py-2 px-4 border">Brand</th>
//             <th className="py-2 px-4 border">Price</th>
//             <th className="py-2 px-4 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.length > 0 ? (
//             currentItems.map((item, index) => (
//               <tr key={index}>
//                 <td className="py-2 px-4 border">{item.name}</td>
//                 <td className="py-2 px-4 border">{item.type}</td>
//                 <td className="py-2 px-4 border">{item.material}</td>
//                 <td className="py-2 px-4 border">{item.brand}</td>
//                 <td className="py-2 px-4 border">₹{item.price}</td>
//                 <td className="py-2 px-4 border h-full flex">
//                     <button className="bg-green-500 text-white px-3 py-1 rounded mr-2"  onClick={()=>navigate(`/admin/update-product/${item._id}`)}>
//                       Edit
//                     </button>
//                     <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteProduct(item._id)}>
//                       Delete
//                     </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="py-2 px-4 border text-center" colSpan={5}>
//                 No products found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="mt-4 flex justify-center space-x-2">
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="px-3 py-1">{currentPage} / {totalPages}</span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api, { socket } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { softDeleteProductFromList } from "../../redux/features/Product";
import { toast } from "react-toastify";
import { Search, Filter, Plus, Edit3, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductTable() {
  const product = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [products, setProducts] = useState(product);
  const [filteredData, setFilteredData] = useState(product);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [types, setTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch categories on mount
  useEffect(() => {
    api.get('/products/categories').then(res => setTypes(res.data));
  }, []);

  // Fetch materials when type changes
  useEffect(() => {
    if (selectedType) {
      api.post('/products/materials', { category: selectedType })
        .then(res => setMaterials(res.data));
      setSelectedMaterial('');
      setBrands([]);
      setSelectedBrand('');
    } else {
      setMaterials([]);
      setSelectedMaterial('');
      setBrands([]);
      setSelectedBrand('');
    }
  }, [selectedType]);

  // Fetch brands when material changes
  useEffect(() => {
    if (selectedType && selectedMaterial) {
      api
        .post('/products/brands', { category: selectedType, material: selectedMaterial })
        .then(res => setBrands(res.data));
      setSelectedBrand('');
    } else {
      setBrands([]);
      setSelectedBrand('');
    }
  }, [selectedMaterial]);

  // Search functionality with filters
  const handleSearch = () => {
    api
      .post('/products/search', { category: selectedType, material: selectedMaterial, brand: selectedBrand })
      .then(res => {
        setProducts(res.data);
        setFilteredData(res.data);
        setCurrentPage(1);
      });
  };

  // Search by text
  useEffect(() => {
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.material.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  // Sync filteredData when products change
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(products);
    }
  }, [products, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const deleteProduct = async (id) => {
    try {
      const response = await api.put(`/products/delete/${id}`);
      toast.success('Product marked as deleted successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  // Socket connection for real-time updates
  useEffect(() => {
    socket.on("productListUpdated", (deletedProductId) => {
      console.log("Received delete event for:", deletedProductId);
      dispatch(softDeleteProductFromList(deletedProductId));
    });

    return () => {
      socket.off("productListUpdated");
    };
  }, [dispatch]);

  const clearFilters = () => {
    setSelectedType('');
    setSelectedMaterial('');
    setSelectedBrand('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage your product inventory with ease</p>
        </div>

        {/* Search and Filters Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-6 overflow-hidden">
          <div className="p-6">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products by name, brand, type, or material..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    showFilters 
                      ? 'bg-blue-50 border-blue-200 text-blue-700' 
                      : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Filter size={18} />
                  Filters
                </button>
                <button 
                  onClick={() => navigate('/admin/add-product')}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus size={18} />
                  Add Product
                </button>
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
                    <select
                      value={selectedType}
                      onChange={e => setSelectedType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Type</option>
                      {types.map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                    <select
                      value={selectedMaterial}
                      onChange={e => setSelectedMaterial(e.target.value)}
                      disabled={!selectedType || materials.length === 0}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <option value="">Select Material</option>
                      {materials.map((mat, idx) => (
                        <option key={idx} value={mat}>{mat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <select
                      value={selectedBrand}
                      onChange={e => setSelectedBrand(e.target.value)}
                      disabled={!selectedMaterial || brands.length === 0}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand, idx) => (
                        <option key={idx} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Search Products
                  </button>
                  
                  {(selectedType || selectedMaterial || selectedBrand || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 hover:bg-blue-50 rounded-xl transition-all duration-200"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} products
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 border-b border-gray-200">Product Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 border-b border-gray-200">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 border-b border-gray-200">Material</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 border-b border-gray-200">Brand</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 border-b border-gray-200">Price</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full font-medium">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full font-medium">
                          {item.material}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{item.brand}</td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-900">₹{item.price ? item.price.toLocaleString() : '0'}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => navigate(`/admin/update-product/${item._id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 group"
                            title="Edit Product"
                          >
                            <Edit3 size={16} className="group-hover:scale-110 transition-transform duration-150" />
                          </button>
                          <button 
                            onClick={() => deleteProduct(item._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 group"
                            title="Delete Product"
                          >
                            <Trash2 size={16} className="group-hover:scale-110 transition-transform duration-150" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="text-gray-500">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-lg font-medium mb-2">No products found</h3>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredData.length > itemsPerPage && (
          <div className="mt-6 flex justify-center">
            <div className="flex items-center space-x-2 bg-white rounded-xl shadow-lg border border-gray-200 px-2 py-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                title="Previous Page"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                title="Next Page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}