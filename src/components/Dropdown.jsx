'use client'
import React from "react";
import { useDataDropdown } from "../hooks/useDataDropdown";

// Move the default empty array outside to avoid creating new references
const EMPTY_ARRAY = [];

const Dropdown = ({
  data = EMPTY_ARRAY,
  value = "",
  onChange = () => {},
  placeholder = "Seleccione un colaborador",
  className = "",
}) => {
  const {
    isOpen,
    searchTerm,
    dropdownRef,
    filteredData,
    handleInputClick,
    handleSearchChange,
    handleDataSelect,
    displayValue,
  } = useDataDropdown(data, value, onChange);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="input w-full cursor-pointer flex items-center justify-between"
        onClick={handleInputClick}
      >
        <input
          type="text"
          value={isOpen ? searchTerm : displayValue}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none cursor-pointer"
          style={{ color: "#303131" }}
          readOnly={!isOpen}
        />
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-[180deg]" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white border border-a5e8ff rounded dropdown-shadow overflow-auto dropdown-scroll"
          style={{ maxHeight: '130px' }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((data) => (
              <div
                key={data.id}
                className="px-4 py-3 dropdown-item cursor-pointer border-b border-d9e6f2 last:border-b-0"
                onClick={() => handleDataSelect(data)}
              >
                <div
                  className="font-medium text-0f2f4f"
                  style={{ fontSize: "1rem" }}
                >
                  {data.title}
                </div>
                <div className="text-sm" style={{ color: "#6b7280" }}>
                  {data.subtitle}
                </div>
                <div className="text-xs" style={{ color: "#9ca3af" }}>
                  {data.subValue}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-5 text-center" style={{ color: "#6b7280" }}>
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
