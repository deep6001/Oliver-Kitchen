import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Package } from 'lucide-react';
import { useCartStore } from '../Store/Cart'; // make sure path is correct
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductModel from './ProductModel';
import CartIcon from './CartIcon';

const ProductList = () => {  //add onBack over here and category over here
  const [selectedVariants, setSelectedVariants] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [modelopen, setmodelopen] = useState(false);
  const [modelDetails, setmodelDetails] = useState(null);
  const [ProductDetails, setProductDetails] = useState(null)
  const [productIndex, setproductIndex] = useState(0);

  // const addToCart = useCartStore((state) => state.addToCart);

  const cartValues = useCartStore((state) => state.cart);
  console.log("the cart values are", cartValues);

  const location = useLocation();
  const category = location.state;
  console.log("the category from navigator", category);
  const CategoryName = category.category;
  console.log("the category Name got is", CategoryName);


  const navigate = useNavigate();


  const handleVariantSelect = (product, vIndex) => {
    console.log("the variant is ", product);
    setProductDetails(product);
    setmodelDetails(vIndex);
    setmodelopen(true);
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

  // const isOutOfStock = (variant) => variant.quantity === 0;

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CartIcon />
      <div className="mb-8 max-w-6xl">

        <button
          onClick={() => navigate('/')}
          className="flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Categories
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">{category.category}</h2>
        <p className="text-gray-600">{category.products.length} products available</p>
      </div>

      <div className=" max-w-6xl mx-auto">

        {category.products.map((product, index) => (
          <div key={index} className="bg-white rounded-xl shadow-xl px-6 py-6 ">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Size & View Stock:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[55dvh] overflow-y-auto ">
                {product.variants.map((variant, vIndex) => (
                  <button
                    key={vIndex}
                    className='cursor-pointer'
                    onClick={() =>
                      handleVariantSelect(product, vIndex) //isoutof stock is removed
                    }
                  
                  >
                    <div className="flex-col gap-2 sm:flex-row   justify-between items-center w-full px-6 py-4 bg-white border border-green-500 shadow-md rounded-2xl hover:shadow-lg transition duration-300 ease-in-out">
                      <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">{variant.size}</div>
                      <div className="text-xl font-bold text-green-900">₹{variant.MRP.toLocaleString()}</div>
                    </div>






                  </button>
                ))}
              </div>
            </div>

           

          </div>
        ))}
      </div>

      {
        modelopen &&
        (
          <ProductModel categoryName={CategoryName} product={ProductDetails} setmodelopen={setmodelopen} vIndex={modelDetails} />
        )
      }



    </div>
  );
};

export default ProductList;
