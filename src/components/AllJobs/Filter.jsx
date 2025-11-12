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
      <div className="text-center mb-4 relative pb-1 md:pb-10">
          <h2 className="text-3xl font-bold inline-block relative">
            ALL JOBS HERE
            {/*  line */}
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-indigo-600 rounded-full -translate-x-1/2"></span>
          </h2>
        </div>
      <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl shadow-2xl">

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
