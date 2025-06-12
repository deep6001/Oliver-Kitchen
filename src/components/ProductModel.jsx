import React, { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { CircleMinus } from 'lucide-react';
import { ShoppingCart} from 'lucide-react';
import {useCartStore} from '../Store/Cart';

const ProductModel = ({ categoryName, product, setmodelopen , vIndex}) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const selectedVariant = product.variants[vIndex];

  console.log("the product which we got are",product);
  const totalPrice = selectedVariant.MRP * quantity;

    // const addToCart = useCartStore((state) => state.addToCart);
    const cartValues = useCartStore((state) => state.cart);

    const handleAddToCart = () => {
        console.log({
            categoryName : categoryName,
            productName : product.name,
            Size : selectedVariant.size,
            ProductAmount : selectedVariant.MRP,
            Quantity : quantity,
            TotalAmount : totalPrice
        });

          useCartStore.getState().addToCart(
                categoryName,
                product.name,
                selectedVariant.size,
                selectedVariant.MRP,
                quantity // quantity
            );

            setmodelopen(false);
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-sm  z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg border border-green-500">
        
        <h2 className="text-xl font-bold text-green-700">{categoryName}</h2>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          
            <h4 className="text-md font-bold text-green-700">{product.name}</h4>
          <button onClick={() => setmodelopen(false)} className="text-gray-600 text-lg font-bold hover:text-red-500">&times;</button>
        </div>

        {/* Variant Info */}
        <div className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3 mb-4">
          <div className="text-sm text-green-800 font-semibold">Size:- {selectedVariant.size}</div>
          <div className="text-lg font-bold text-green-900">₹{selectedVariant.MRP.toLocaleString()}</div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-md font-medium">Quantity:</div>
          <div className="flex items-center space-x-4">
            <CircleMinus onClick={decrement}/>
            <span className="text-lg font-semibold">{quantity}</span>
             <CirclePlus onClick={increment}/>
          </div>
        </div>
       

        {/* Total Price */}
        <div className="text-right text-lg font-bold text-green-700">
          Total: ₹{totalPrice.toLocaleString()}
        </div>

                <button
                  onClick={() => handleAddToCart()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

      </div>
    </div>
  );
};

export default ProductModel;
