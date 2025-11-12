import React from "react";

const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition"
    />
  </div>
);

export default InputField;
