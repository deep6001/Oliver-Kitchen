const TextareaInput= ({
  label,
  icon,
  value,
  placeholder,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {icon}
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
    />
  </div>
);

export default TextareaInput;
