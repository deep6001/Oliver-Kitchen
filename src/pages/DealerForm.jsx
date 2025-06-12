import React, { useState } from "react";
import { User, Building2, MapPin, Phone, Mail, Receipt } from "lucide-react";
import TextInput from "../components/InputText";
import TextareaInput from "../components/InputareaText";

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
        <TextInput
          label="Dealer Name *"
          icon={<User className="inline h-4 w-4 mr-1" />}
          value={formData.dealerName}
          placeholder="Enter dealer name"
          error={errors.dealerName}
          onChange={(val) => handleInputChange("dealerName", val)}
        />
        <TextInput
          label="Firm Name *"
          icon={<Building2 className="inline h-4 w-4 mr-1" />}
          value={formData.firmName}
          placeholder="Enter firm name"
          error={errors.firmName}
          onChange={(val) => handleInputChange("firmName", val)}
        />
      </div>

      <TextareaInput
        label="Address"
        icon={<MapPin className="inline h-4 w-4 mr-1" />}
        value={formData.address}
        placeholder="Enter complete address"
        onChange={(val) => handleInputChange("address", val)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Contact Number *"
          type="tel"
          icon={<Phone className="inline h-4 w-4 mr-1" />}
          value={formData.contactNumber}
          placeholder="Enter contact number"
          error={errors.contactNumber}
          onChange={(val) => handleInputChange("contactNumber", val)}
        />
        <TextInput
          label="Email ID"
          type="email"
          icon={<Mail className="inline h-4 w-4 mr-1" />}
          value={formData.emailId}
          placeholder="Enter email address"
          error={errors.emailId}
          onChange={(val) => handleInputChange("emailId", val)}
        />
      </div>

      <TextInput
        label="GST Number *"
        icon={<Receipt className="inline h-4 w-4 mr-1" />}
        value={formData.gstNo}
        placeholder="Enter GST number"
        error={errors.gstNo}
        onChange={(val) => handleInputChange("gstNo", val)}
      />

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
