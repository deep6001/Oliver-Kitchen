import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Package } from 'lucide-react';
import useCartStore from '../Store/Cart'
import { useNavigate } from 'react-router-dom';


const CategorySelector = ({ categories }) => {
  const navigate=useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const {setSelectedCategory}=useCartStore();
  const toggleCategory = (categoryName) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log('Selected Category:', category);
    navigate('/productList');
  }



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Categories</h2>
        <p className="text-gray-600">Select a category to view our premium kitchen hardware solutions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.category}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleCategory(category.category)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{category.category}</h3>
                    <p className="text-gray-600">{category.products.length} products available</p>
                  </div>
                </div>
                <div className="text-green-600">
                  {expandedCategory === category.category ? (
                    <ChevronDown className="h-6 w-6" />
                  ) : (
                    <ChevronRight className="h-6 w-6" />
                  )}
                </div>
              </div>
            </div>

            {expandedCategory === category.category && (
              <div className="border-t border-gray-100 p-6">
                <div className="space-y-3">
                  {category.products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-gray-700">{product.name}</span>
                      <span className="text-sm text-gray-500">
                        {product.variants.length} variant{product.variants.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleCategorySelect(category.category)}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  View Products
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;