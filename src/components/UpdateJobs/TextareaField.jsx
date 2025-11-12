import React from "react";

const TextareaField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="3"
      className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition resize-none"
    />
  </div>
);

export default TextareaField;
