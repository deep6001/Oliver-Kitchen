import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import useCartStore from '../Store/Cart'; // make sure path is correct

const ProductList = ({ category, onBack }) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantities, setQuantities] = useState({});
  const addToCart = useCartStore((state) => state.addToCart);
  
  const handleVariantSelect = (productName, variant) => {
    setSelectedVariants((prev) => ({ ...prev, [productName]: variant }));
    if (!quantities[productName]) {
      setQuantities((prev) => ({ ...prev, [productName]: 1 }));
    }
  };

  const handleQuantityChange = (productName, change) => {
    setQuantities((prev) => {
      const currentQty = prev[productName] || 1;
      const newQty = Math.max(1, Math.min(99, currentQty + change));
      return { ...prev, [productName]: newQty };
    });
  };

  const handleAddToCart = (productName) => {
    const variant = selectedVariants[productName];
    const quantity = quantities[productName] || 1;

    if (variant) {
      addToCart({
        categoryName: category.category,
        productName,
        variant,
        quantity,
      });
    }
  };

  const isOutOfStock = (variant) => variant.quantity === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Categories
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{category.category}</h2>
        <p className="text-gray-600">{category.products.length} products available</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {category.products.map((product, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Size & View Stock:
              </label>
              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                {product.variants.map((variant, vIndex) => (
                  <button
                    key={vIndex}
                    onClick={() =>
                      !isOutOfStock(variant) && handleVariantSelect(product.name, variant)
                    }
                    disabled={isOutOfStock(variant)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      isOutOfStock(variant)
                        ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed'
                        : selectedVariants[product.name]?.id === variant.id
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium mb-1">{variant.size}</div>
                        <div className="text-lg font-semibold">₹{variant.MRP.toLocaleString()}</div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        isOutOfStock(variant)
                          ? 'bg-red-100 text-red-600'
                          : variant.quantity <= 10
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {isOutOfStock(variant)
                          ? 'Out of Stock'
                          : `${variant.quantity} in stock`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedVariants[product.name] && !isOutOfStock(selectedVariants[product.name]) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(product.name, -1)}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                      disabled={quantities[product.name] <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">
                      {quantities[product.name] || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product.name, 1)}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                      disabled={quantities[product.name] >= 99}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Max quantity: 99 (Stock: {selectedVariants[product.name].quantity})
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600">Subtotal:</div>
                      <div className="text-lg font-semibold text-green-600">
                        ₹{(selectedVariants[product.name].MRP * (quantities[product.name] || 1)).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      ₹{selectedVariants[product.name].MRP.toLocaleString()} × {quantities[product.name] || 1}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product.name)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
