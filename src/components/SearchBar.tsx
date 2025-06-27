import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SearchNormal1, Sort, Clock } from "iconsax-reactjs";
import Filters from "./Filters";
import { recommendationData } from "../lib/data/recommendationData";

const SEARCH_HISTORY = [
  "John Smith",
  "Sarah Johnson",
  "Mike Davis",
  "Anna Williams",
  "David Brown",
];

const SuggestionItem = ({
  label,
  icon,
  onClick,
  extra,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  extra?: React.ReactNode;
}) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between px-3 py-2 hover:bg-[#F8F5F0] cursor-pointer rounded-md"
  >
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm text-gray-700">{label}</span>
    </div>
    {extra}
  </div>
);

export const SearchBar: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = "Search by name, category or contact number" }) => {
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredRecommendations = useMemo(() => {
    if (!value.trim()) return [];
    return recommendationData.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
  }, [value]);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  const onFocus = useCallback(() => setOpen(true), []);
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      setOpen(true);
    },
    [onChange]
  );
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }, []);

  const selectName = useCallback(
    (name: string) => {
      onChange(name);
      setOpen(false);
      inputRef.current?.blur();
    },
    [onChange]
  );

  const showHistory = !value.trim() && open;
  const showSuggestions = value.trim() && filteredRecommendations.length > 0 && open;

  return (
    <div className="relative flex items-center gap-2" ref={dropdownRef}>
      <div className="relative h-10 w-[264px] md:w-[420px]">
        <SearchNormal1 className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} color="#1C6C41" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onInputChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-full h-full pl-12 pr-4 bg-white rounded-md text-sm outline-none focus:border-[#1C6C41] focus:ring-1 focus:ring-[#1C6C41] transition-all duration-200"
        />

        {(showHistory || showSuggestions) && (
          <div className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-hidden scrollbar-none bg-white border border-gray-200 rounded-xl shadow-lg z-10">
            {showHistory &&
              SEARCH_HISTORY.map(name => (
                <SuggestionItem
                  key={name}
                  label={name}
                  icon={<Clock size={16} color="#6B7280" />}
                  onClick={() => selectName(name)}
                />
              ))}

            {showSuggestions && (
              <div>
                <div className="px-3 py-2 text-xs font-medium text-gray-500">
                  Recommendations ({filteredRecommendations.length})
                </div>
                {filteredRecommendations.map(person => (
                  <SuggestionItem
                    key={person.name}
                    label={person.name}
                    icon={
                      <div className={`w-8 h-8 rounded-full ${person.color} flex items-center justify-center text-xs font-medium text-gray-700`}>
                        {person.initials}
                      </div>
                    }
                    extra={person.phone && <span className="text-xs text-gray-500">{person.phone}</span>}
                    onClick={() => selectName(person.name)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        className="h-10 w-10 flex items-center justify-center rounded-md bg-white hover:bg-[#e0e0e0] transition-colors md:hidden relative"
        onClick={() => setShowFilters(open => !open)}
      >
        <Sort size={20} color="#1C6C41" />
        {showFilters && (
          <div className="absolute top-full left-0 mt-2 z-50">
            <Filters onClose={() => setShowFilters(false)} />
          </div>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
