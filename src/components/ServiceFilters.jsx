import React from "react";

const CATEGORIES = ["All", "Iron", "Wash & Iron", "Dry Clean", "Alteration"];

export default function ServiceFilters({ query, onQuery, category, onCategory, sort, onSort }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search services..."
          className="px-3 py-2 rounded-md border border-gray-200 shadow-sm w-64"
        />
        <div className="hidden sm:flex gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onCategory(c)}
              className={`px-3 py-1.5 rounded-md text-sm ${category === c ? "bg-teal-500 text-white" : "bg-white text-gray-700 border border-gray-200"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">Sort</label>
        <select value={sort} onChange={(e) => onSort(e.target.value)} className="px-3 py-2 rounded-md border border-gray-200">
          <option value="popular">Recommended</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
}