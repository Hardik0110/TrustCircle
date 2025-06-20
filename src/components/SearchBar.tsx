import { SearchNormal1, Sort } from "iconsax-reactjs";
import type { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search by name, category or contact number" 
}) => (
  <div className="flex items-center gap-2">
    <div className="relative h-10 w-[264px] md:w-[420px]">
      <SearchNormal1
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
        size="20"
        color="#1C6C41"
      />
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full pl-12 pr-4 bg-white rounded-md text-sm outline-none focus:border-[#1C6C41] focus:ring-1 focus:ring-[#1C6C41] transition-all duration-200"
      />
    </div>
    <button className="h-10 w-10 flex items-center justify-center rounded-md bg-white hover:bg-[#e0e0e0] transition-colors md:hidden">
      <Sort size="20" color="#1C6C41" />
    </button>
  </div>
);
