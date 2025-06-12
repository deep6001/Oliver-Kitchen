import React, { useState } from "react";
import { User, Building2, MapPin, Phone, Mail, Receipt } from "lucide-react";

const DealerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    dealerName: "",
    firmName: "",
    address: "",
    contactNumber: "",
    emailId: "",
    gstNo: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.dealerName.trim()) newErrors.dealerName = "Dealer name is required";
    if (!formData.firmName.trim()) newErrors.firmName = "Firm name is required";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    if (!formData.gstNo.trim()) newErrors.gstNo = "GST number is required";

    if (formData.emailId && !/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = "Please enter a valid email";
    }

    if (
      formData.contactNumber &&
      !/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ""))
    ) {
      newErrors.contactNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Dealer Registration
            </h1>
            <p className="text-gray-600">
              Please fill in your details to proceed with ordering
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Dealer Name *
                </label>
                <input
                  type="text"
                  value={formData.dealerName}
                  onChange={(e) =>
                    handleInputChange("dealerName", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.dealerName ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Enter dealer name"
                />
                {errors.dealerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.dealerName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="inline h-4 w-4 mr-1" />
                  Firm Name *
                </label>
                <input
                  type="text"
                  value={formData.firmName}
                  onChange={(e) =>
                    handleInputChange("firmName", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.firmName ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Enter firm name"
                />
                {errors.firmName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firmName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Enter complete address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.contactNumber ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Enter contact number"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email ID
                </label>
                <input
                  type="email"
                  value={formData.emailId}
                  onChange={(e) => handleInputChange("emailId", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.emailId ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Enter email address"
                />
                {errors.emailId && (
                  <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Receipt className="inline h-4 w-4 mr-1" />
                GST Number *
              </label>
              <input
                type="text"
                value={formData.gstNo}
                onChange={(e) => handleInputChange("gstNo", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.gstNo ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Enter GST number"
              />
              {errors.gstNo && (
                <p className="text-red-500 text-sm mt-1">{errors.gstNo}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors transform hover:scale-105 duration-200"
            >
              Continue to Products
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DealerForm;
