import React from 'react';
import { Award, Star, CheckCircle } from 'lucide-react';
import logo from '../assets/logo2.png'; // Adjust the path as necessary

const CompanyInfo= () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 py-16 mt-20 h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <img src={logo} alt="Crystal Interior Products Pvt Ltd Logo" className="mx-auto h-24 w-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Leading Modular Kitchen Hardware Fittings and Accessories Manufacturers
          </h2>
          <p className="text-xl text-green-700 italic max-w-4xl mx-auto">
            "With a legacy of 25 years, Crystal Interior Products Pvt Ltd stands as an industry leader in crafting innovative Modular Kitchen Solutions and Wardrobe Accessories"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-max mx-auto">
          <div className="bg-white rounded-xl flex justify-start items-center p-2 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center ">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">ISO 9001:2015</h3>
                <p className="text-gray-600">Certified Company</p>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-xl flex justify-start items-center p-2 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center ">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">170+ Best Quality</h3>
                <p className="text-gray-600">Products</p>
              </div>
            </div>
            
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-gray-700 font-medium">Trusted by thousands of dealers nationwide</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;