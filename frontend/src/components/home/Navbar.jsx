import React from 'react'
import { Search, ShoppingBag, User, Menu } from 'lucide-react';

function Navbar() {
  return (
    <div className=' '>
   <nav className="flex items-center justify-between rounded-lg px-6 py-6 bg-gray-100 backdrop-blur-sm">
        <div className="flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Shop</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Collections</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a>
        </div>
        
        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-wider">FUPO</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
          <User className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
          <Menu className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
        </div>
      </nav>
      </div>
  )
}

export default Navbar