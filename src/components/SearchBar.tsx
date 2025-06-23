import { SearchNormal1, Sort, Clock } from "iconsax-reactjs";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { recommendationData } from "../lib/data/recommendationData";
import Filters from "./Filters";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const searchHistory = [
  "John Smith",
  "Sarah Johnson", 
  "Mike Davis",
  "Anna Williams",
  "David Brown"
];

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search by name, category or contact number" 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredRecommendations, setFilteredRecommendations] = useState<typeof recommendationData>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value.trim()) {
      const filtered = recommendationData.filter(person =>
        person.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRecommendations(filtered);
    } else {
      setFilteredRecommendations([]);
    }
  }, [value]);

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleNameSelect = (name: string) => {
    onChange(name);
    setIsDropdownOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  const showSearchHistory = !value.trim() && isDropdownOpen;
  const showSuggestions = value.trim() && filteredRecommendations.length > 0 && isDropdownOpen;

  return (
    <div className="flex items-center gap-2 " ref={dropdownRef}>
      <div className="relative h-10 w-[264px] md:w-[420px]">
        <SearchNormal1
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          size="20"
          color="#1C6C41"
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full h-full pl-12 pr-4 bg-white rounded-md text-sm outline-none focus:border-[#1C6C41] focus:ring-1 focus:ring-[#1C6C41] transition-all duration-200"
        />
        
        {(showSearchHistory || showSuggestions) && (
          <div className="absolute top-full p-2 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-hidden scrollbar-none">
            {showSearchHistory && (
              <>
                {searchHistory.map((name, index) => (
                  <div
                    key={index}
                    onClick={() => handleNameSelect(name)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#F8F5F0] cursor-pointer rounded-md"
                  >
                    <Clock size="16" color="#6B7280" />
                    <span className="text-sm text-gray-700">{name}</span>
                  </div>
                ))}
              </>
            )}
            
            {showSuggestions && (
              <>
                <div className="px-3 py-2 text-xs font-medium text-gray-500 ">
                  Recommendations ({filteredRecommendations.length})
                </div>
                {filteredRecommendations.map((person, index) => (
                  <div
                    key={index}
                    onClick={() => handleNameSelect(person.name)}
                    className="flex items-center justify-between px-3 py-2 hover:bg-[#F8F5F0] cursor-pointer rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${person.color} flex items-center justify-center text-xs font-medium text-gray-700`}>
                        {person.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700">{person.name}</span>
                        <span className="text-xs text-gray-500">{person.tag}</span>
                      </div>
                    </div>
                    {person.phone && (
                      <span className="text-xs text-gray-500">{person.phone}</span>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      
      <button className="h-10 w-10 flex items-center justify-center rounded-md bg-white hover:bg-[#e0e0e0] transition-colors md:hidden">
        <Sort size="20" color="#1C6C41" onClick={() => setShowFilters((prev) => !prev)}  />
        {showFilters && (
                <div className="absolute top-full left-0 mt-2 z-50">
                  <Filters onClose={() => setShowFilters(false)}/>
                </div>
              )}
      </button>
    </div>
  );
};