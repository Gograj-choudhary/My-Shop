import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { AiSearchBox } from "./AiSearchBox";

export const ProductFilterBar = ({ onSearch, onFilter }) => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BG2;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setSelectedGender(e.target.value);
    onFilter(e.target.value);
  };

  return (
     <>
    <div
      className="sticky top-0 z-50 w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b shadow-lg backdrop-blur-sm"
      style={{ 
        backgroundColor: `#${bg2 || bg}EE`,
        borderColor: `#${bbg}20`,
        boxShadow: `0 4px 20px #${bbg}15`
      }}
    >
      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full sm:flex-1 max-w-lg">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: `#${bg}`,
            borderColor: `#${bbg}30`,
            color: `#${text}`,
            boxShadow: `0 2px 8px #${bbg}10`
          }}
          onFocus={(e) => {
            e.target.style.borderColor = `#${bbg}`;
            e.target.style.boxShadow = `0 0 0 3px #${bbg}20`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = `#${bbg}30`;
            e.target.style.boxShadow = `0 2px 8px #${bbg}10`;
          }}
        />

       {/* AI Search Button */}
          <button 
            onClick={() => setIsAiModalOpen(true)}
            className="px-4 py-3 rounded-lg font-medium transition-all duration-200 border flex items-center gap-2 hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{
              backgroundColor: `#${bbg}`,
              borderColor: `#${bbg}`,
              color: `#${bg}`,
              boxShadow: `0 4px 15px #${bbg}30`
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = `#${bbgHover}`;
              e.target.style.borderColor = `#${bbgHover}`;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = `#${bbg}`;
              e.target.style.borderColor = `#${bbg}`;
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Search
          </button>
        </div>


      {/* Action Buttons */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-normal">
        <NavLink to="/customer-orders">
          <button 
            className="px-4 py-3 rounded-lg font-medium transition-all duration-200 border flex items-center gap-2 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: `#${bg}`,
              borderColor: `#${bbg}30`,
              color: `#${text}`,
              boxShadow: `0 2px 8px #${bbg}10`
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = `#${bbg}15`;
              e.target.style.borderColor = `#${bbg}`;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = `#${bg}`;
              e.target.style.borderColor = `#${bbg}30`;
            }}
          >
            <IoBagCheckOutline />
            My Orders
          </button>
        </NavLink>

        <NavLink to="/cart-items">
          <button 
            className="px-4 py-3 rounded-lg font-medium transition-all duration-200 border flex items-center gap-2 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: `#${bg}`,
              borderColor: `#${bbg}30`,
              color: `#${text}`,
              boxShadow: `0 2px 8px #${bbg}10`
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = `#${bbg}15`;
              e.target.style.borderColor = `#${bbg}`;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = `#${bg}`;
              e.target.style.borderColor = `#${bbg}30`;
            }}
          >
            <IoCartOutline />
            Cart
          </button>
        </NavLink>
      </div>

      {/* Filter Dropdown */}
      <div className="w-full sm:w-auto">
        <select
          value={selectedGender}
          onChange={handleFilter}
          className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 appearance-none"
          style={{
            backgroundColor: `#${bg}`,
            borderColor: `#${bbg}30`,
            color: `#${text}`,
            boxShadow: `0 2px 8px #${bbg}10`,
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23${bbg.replace('#', '')}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = `#${bbg}`;
            e.target.style.boxShadow = `0 0 0 3px #${bbg}20`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = `#${bbg}30`;
            e.target.style.boxShadow = `0 2px 8px #${bbg}10`;
          }}
        >
          <option value="">All Genders</option>
          <option value="Men">Men</option>
          <option value="Woman">Women</option>
        </select>
      </div>
    </div>
     {/* AI Search Modal */}
      <AiSearchBox 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)} 
      />
      </>
  );
};