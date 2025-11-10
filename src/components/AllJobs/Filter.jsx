import React from 'react';
import {Search} from 'lucide-react';

const FilterBar = ({
  categories,
  selectedCategory,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div>
      <h3 className="text-3xl font-bold text-center mb-12 text-indigo-800">
        All Jobs Here
      </h3>
      <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl shadow-md">

        {/* Category Filter */}
        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={e => onFilterChange (e.target.value)}
            className="select select-bordered w-56 text-gray-800 border-b-blue-300 light:text-white bg-white"
          >
            <option value="">All Categories</option>
            {categories.map ((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange (e.target.value)}
              placeholder="Search jobs by title..."
              className="input input-bordered w-full text-gray-800 border-b-blue-300 light:text-white pr-10 bg-white"
            />
            <Search
              className="absolute right-3 top-3 text-gray-500 z-10"
              size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
