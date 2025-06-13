import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../Store/Cart';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import jsPDF from 'jspdf';
import logo from '../assets/logo2.png'

const CheckoutPage = () => {
  const cart = useCartStore(state => state.cart);
  const updateCartQuantity = useCartStore(state => state.updateQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);


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

  const generateInvoicePDF = (buyerInfo, cart, totalAmount) => {
    const docPDF = new jsPDF();

    const pageMargin = 20;
    let y = pageMargin;

    const addPageIfNeeded = (offset = 40) => {
      if (y + offset > 280) {
        docPDF.addPage();
        y = pageMargin;
      }
    };

  docPDF.addImage(logo, 'PNG', 80, y, 50, 35); // x, y, width, height
  y += 30; // Leave space after logo




    y += 10;
    docPDF.setDrawColor(0);
    docPDF.setLineWidth(0.5);
    docPDF.line(pageMargin, y, 190, y);
    y += 10;

    // Buyer Info
    docPDF.setFontSize(12);
    docPDF.text('Buyer Information:', pageMargin, y);
    y += 8;

    docPDF.setFontSize(11);
    docPDF.text(`Name    : ${buyerInfo.dealerName}`, pageMargin, y); y += 7;
    docPDF.text(`Email   : ${buyerInfo.emailId}`, pageMargin, y); y += 7;
    docPDF.text(`Phone   : ${buyerInfo.contactNumber}`, pageMargin, y); y += 7;
    docPDF.text(`Firm    : ${buyerInfo.firmName}`, pageMargin, y); y += 7;
    docPDF.text(`GST    : ${buyerInfo.gstNo}`, pageMargin, y); y += 7;
    docPDF.text(`Address : ${buyerInfo.address}`, pageMargin, y); y += 10;

    docPDF.setFontSize(12);
    docPDF.text('Order Details:', pageMargin, y);
    y += 10;

    // Products
    Object.entries(cart).forEach(([categoryName, products]) => {
      Object.entries(products).forEach(([_, product]) => {
        addPageIfNeeded(45);

        docPDF.setDrawColor(200);
        docPDF.rect(pageMargin - 2, y - 5, 174, 35); // box background

        docPDF.setFontSize(11);
        docPDF.setTextColor(0);

        docPDF.text(`Category : ${categoryName}`, pageMargin, y); y += 7;
        docPDF.text(`Product  : ${product.productName}`, pageMargin, y); y += 7;
        docPDF.text(`Size     : ${product.size}`, pageMargin, y); y += 7;
        docPDF.text(`Quantity : ${product.quantity}`, pageMargin, y); y += 7;
        docPDF.text(`Total    : ${product.total.toLocaleString()}`, pageMargin, y); y += 10;
      });
    });

    addPageIfNeeded(20);

    // Total Summary
    docPDF.setFontSize(13);
    docPDF.setTextColor(0, 100, 0);
    docPDF.text(`Total Amount: ${totalAmount.toLocaleString()}`, pageMargin, y);
    y += 15;

    // Footer
    docPDF.setFontSize(10);
    docPDF.setTextColor(150);
    docPDF.text('Thank you for choosing Olive!', 105, y, { align: 'center' });

    // Save
    docPDF.save(`Invoice_${Date.now()}.pdf`);
  };



  const handleOrder = async () => {
    try {
      setIsPlacingOrder(true);

      const dealerInfo = localStorage.getItem('DealerInfo');
      if (!dealerInfo) {
        alert("Dealer info not found.");
        setIsPlacingOrder(false);
        return;
      }

      const buyerInfo = JSON.parse(dealerInfo);
      const buyerId = Date.now().toString();
      const buyerRef = doc(db, 'BuyerDetails', buyerId);

      await setDoc(buyerRef, { BuyerInfo: buyerInfo });

      const productDetailsRef = doc(collection(buyerRef, 'ProductDetails'), 'Cart');
      await setDoc(productDetailsRef, { ProductInfo: cart });

      // 🔻 Generate invoice PDF
      generateInvoicePDF(buyerInfo, cart, totalAmount);

      setShowThankYou(true); // ✅ Show thank you popup
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

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
              onClick={handleOrder}
              disabled={isPlacingOrder}
              className={`px-6 py-3 rounded-lg font-semibold transition ${isPlacingOrder
                  ? 'bg-green-300 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
                }`}
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md text-center space-y-4">
            <h2 className="text-xl font-bold text-green-700">Thank You!</h2>
            <p className="text-gray-700">
              Thank you for being a trusted partner of <span className="font-semibold">Olive Kitchen</span>! <br />
              We wish you all the best for a successful business ahead.
            </p>
            <button
              onClick={() => {
                setShowThankYou(false);
                navigate('/');
              }}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
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
