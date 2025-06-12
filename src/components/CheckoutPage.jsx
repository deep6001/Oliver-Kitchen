import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../Store/Cart';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const cart = useCartStore(state => state.cart);
  const updateCartQuantity = useCartStore(state => state.updateQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const navigate = useNavigate();

  // Total amount calculation
  const totalAmount = Object.values(cart)
    .flatMap(category => Object.values(category))
    .reduce((acc, item) => acc + item.total, 0);

  const handleQuantityChange = (categoryName, productName, delta) => {
    const product = cart[categoryName][productName];
    const newQuantity = product.quantity + delta;

    if (newQuantity <= 0) {
      removeFromCart(categoryName, productName);
    } else {
      updateCartQuantity(categoryName, productName, newQuantity);
    }
  };


  const handleOrder = () => {
        console.log("Order Details:", cart); 
        console.log("Total Amount:", totalAmount);
        alert('Order Placed!');
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Checkout</h1>

      {Object.entries(cart).length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          {Object.entries(cart).map(([categoryName, products]) => (
            <div key={categoryName} className="mb-8">
              <h2 className="text-xl font-semibold text-green-600 mb-4">{categoryName}</h2>

              <div className="space-y-4">
                {Object.entries(products).map(([productName, product]) => (
                  <div
                    key={productName}
                    className="flex justify-between items-center bg-white border border-green-300 rounded-xl p-4 shadow-md"
                  >
                    <div>
                      <h3 className="font-bold text-green-800 text-lg">{product.productName}</h3>
                      <p className="text-sm text-gray-600">Size: {product.size}</p>
                      <p className="text-sm text-gray-600">Price: ₹{product.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleQuantityChange(categoryName, productName, -1)}
                        className="p-2 bg-gray-100 border border-gray-300 rounded hover:bg-red-100 transition"
                      >
                        <Minus className="w-4 h-4 text-red-600" />
                      </button>

                      <span className="text-lg font-semibold">{product.quantity}</span>

                      <button
                        onClick={() => handleQuantityChange(categoryName, productName, 1)}
                        className="p-2 bg-gray-100 border border-gray-300 rounded hover:bg-green-100 transition"
                      >
                        <Plus className="w-4 h-4 text-green-600" />
                      </button>

                      <span className="text-green-800 font-semibold text-lg">
                        ₹{product.total.toLocaleString()}
                      </span>

                      <button
                        onClick={() => removeFromCart(categoryName, productName)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-10 p-6 bg-gray-100 rounded-lg">
            <div className="text-xl font-bold text-green-700">
              Total Amount: ₹{totalAmount.toLocaleString()}
            </div>
            <button
              onClick={() => handleOrder()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-green-600 hover:underline"
        >
          ← Back to Categories
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
