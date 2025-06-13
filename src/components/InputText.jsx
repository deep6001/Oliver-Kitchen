// components/TextInput.tsx
import React from "react";
const TextInput = ({
  label,
  icon,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {icon}
      {label}
    </label>
    <input
      type={type}
      value={value}
      required
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
        error ? "border-red-300" : "border-gray-200"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default TextInput;
