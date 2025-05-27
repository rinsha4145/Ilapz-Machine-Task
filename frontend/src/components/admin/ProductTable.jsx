import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";
import {  useNavigate } from "react-router-dom";

export default function ProductTable() {
      const product = useSelector((state) => state.product);
  console.log(product)
const navigate=useNavigate()
  const [products, setProducts] = useState(product);
  const [filteredData, setFilteredData] = useState(product);

  const [types, setTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    api.get('/products/categories').then(res => setTypes(res.data));
  }, []);
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

  const handleSearch = () => {
    api
      .post('/products/search', { category: selectedType, material: selectedMaterial, brand: selectedBrand })
      .then(res => {
        setProducts(res.data);
        setFilteredData(res.data);
        setCurrentPage(1);
      });
  };

  // Sync filteredData when products change
  useEffect(() => {
    setFilteredData(products);
  }, [products]);

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

  return (
    <div className="p-4">
        <div className="flex justify-between mb-4">
      <div className=" space-x-4 flex flex-wrap gap-3">
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Type</option>
          {types.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={selectedMaterial}
          onChange={e => setSelectedMaterial(e.target.value)}
          disabled={!selectedType || materials.length === 0}
          className="border p-2 rounded disabled:opacity-50"
        >
          <option value="">Select Material</option>
          {materials.map((mat, idx) => (
            <option key={idx} value={mat}>{mat}</option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={e => setSelectedBrand(e.target.value)}
          disabled={!selectedMaterial || brands.length === 0}
          className="border p-2 rounded disabled:opacity-50"
        >
          <option value="">Select Brand</option>
          {brands.map((brand, idx) => (
            <option key={idx} value={brand}>{brand}</option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          disabled={!selectedBrand}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Search
        </button>
      </div>
      <button
          className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
      onClick={()=>navigate('/admin/add-product')}
        >
          Add Product
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Type</th>
            <th className="py-2 px-4 border">Material</th>
            <th className="py-2 px-4 border">Brand</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">{item.type}</td>
                <td className="py-2 px-4 border">{item.material}</td>
                <td className="py-2 px-4 border">{item.brand}</td>
                <td className="py-2 px-4 border">₹{item.price}</td>
                <td className="py-2 px-4 border h-full flex">
                    <button className="bg-green-500 text-white px-3 py-1 rounded mr-2"  onClick={()=>navigate(`/admin/update-product/${item._id}`)}>
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border text-center" colSpan={5}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{currentPage} / {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
