import { Search } from "lucide-react";
import React, { useState } from "react";

function Header() {
  const [selectedMaterial, setSelectedMaterial] = useState("Wood");
  const [selectedType, setSelectedType] = useState("Sofa");
  const [selectedPrice, setSelectedPrice] = useState("$129 - $359");
 
  return (
    <div
      className="relative mt-5 rounded-xl flex flex-col items-center justify-between min-h-[85vh] w-full"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/duwgmfrvo/image/upload/v1747986267/dada_design-9KGB4HspwsM-unsplash_qomy79.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Hero Section */}
      <div className="container py-5">
        <h1 className="text-9xl lg:text-9xl px-10 font-bold opacity-50 leading-tight">
          TRANSFORM YOUR LIVING SPACE
        </h1>

        {/* Filter Box */}
        <div className="absolute bottom-0 left-8 p-4 right-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Made By Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Made By
                </label>
                <div className="relative">
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-gray-500 focus:border-transparent cursor-pointer"
                  >
                    <option>Wood</option>
                    <option>Metal</option>
                    <option>Fabric</option>
                    <option>Leather</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Type
                </label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-gray-500 focus:border-transparent cursor-pointer"
                  >
                    <option>Sofa</option>
                    <option>Chair</option>
                    <option>Table</option>
                    <option>Bed</option>
                    <option>Cabinet</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-gray-500 focus:border-transparent cursor-pointer"
                  >
                    <option>₹12999 - ₹35999</option>
                    <option>₹36000 - ₹59900</option>
                    <option>₹60000 - ₹999000</option>
                    <option>₹100000+</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div>
                <button className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 group">
                  <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
