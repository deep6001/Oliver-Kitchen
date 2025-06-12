import React, { useState } from 'react';
import { ShoppingCart, XCircle } from 'lucide-react';
import { useCartStore } from '../Store/Cart';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const cart = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Count total products
  const totalItems = Object.values(cart)
    .flatMap(category =>
      Object.values(category)
    ).length;

    const totalAmount = Object.values(cart)
  .flatMap(category => Object.values(category))
  .reduce((acc, item) => acc + item.total, 0);

  return (
    <>
      {/* Cart Button with Badge */}
      <div className="fixed top-6 right-6 z-50">
        <button onClick={() => setIsOpen(true)} className="relative p-3 bg-green-600 rounded-full text-white hover:bg-green-700 transition">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl h-[80vh] overflow-y-auto shadow-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-green-700 mb-4">Cart Items</h2>

            {/* Render Categories */}
            {Object.entries(cart).map(([categoryName, products]) => (
              <div key={categoryName} className="mb-6">
                <h3 className="text-lg font-semibold text-green-600 mb-2">{categoryName}</h3>

                <div className="space-y-3">
                  {Object.entries(products).map(([productName, product]) => (
                    <div
                      key={productName}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-green-300 shadow-sm"
                    >
                      <div>
                        <div className="font-bold text-green-900">{product.productName}</div>
                        <div className="text-sm text-gray-600">Size: {product.size}</div>
                        <div className="text-sm text-gray-600">Qty: {product.quantity}</div>
                        <div className="text-sm text-gray-800 font-semibold">₹{product.total.toLocaleString()}</div>
                      </div>

                      <button
                        onClick={() => removeFromCart(categoryName, productName)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove item"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {totalItems > 0 && (
                    <>
                        <div className="text-right text-lg font-bold text-green-700 mt-4">
                        Total Amount: ₹{totalAmount.toLocaleString()}
                        </div>

                        <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => navigate('/checkout') }
                            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
                        >
                            Proceed to Checkout
                        </button>
                        </div>
                    </>
                    )}


            {totalItems === 0 && (
              <div className="text-center text-gray-500 mt-10">Your cart is empty.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartIcon;
