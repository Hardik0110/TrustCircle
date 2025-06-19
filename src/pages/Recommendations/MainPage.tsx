import RecommendationSteps from "@/components/RecommendationSteps";
import RecommendationTable from "@/components/Table";
import { Card } from "@/components/ui/card";
import { AddSquare, Lock1, SearchNormal1, UserTick } from "iconsax-reactjs";
import { type ChangeEvent, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search by name, category or contact number" 
}) => (
  <div className="relative w-full max-w-[420px] h-10">
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
      className="w-full h-full pl-12 pr-4 bg-white rounded-md text-sm outline-none border border-gray-300 focus:border-[#1C6C41] focus:ring-1 focus:ring-[#1C6C41] transition-all duration-200"
    />
  </div>
);

const MainPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (value: string): void => {
    setSearchValue(value);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto md:px-4 md:py-6">
      {/* Desktop Layout */}
      <div className="hidden md:flex gap-6">
        {/* Main Content Section - 1000px */}
        <div className="w-[1000px] flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            {/* Left: Heading */}
            <div className="flex items-center gap-2">
              <UserTick className="h-8 w-8" color="#1C6C41" />
              <span className="font-bold text-2xl">Trusted Recommendation</span>
            </div>

            {/* Right: Search Bar */}
            <SearchBar 
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>

          {/* Table */}
          <RecommendationTable
            showCategory
            showPhone
            showRecommendedBy
            showNotes
            className="w-full"
          />

        <Card className="w-full h-[250px] rounded-[20px] p-4 bg-[#F0EAE5] shadow-md flex items-start justify-between gap-4">
          <RecommendationSteps />
        </Card>
        </div>

        {/* Right Section - 440px (Future Content) */}
        <div className="w-[440px] rounded-lg min-h-[400px] flex flex-col gap-[8px]  text-gray-400 mt-16">
          <div className="relative w-[306px] h-[174px]">
            <img
              src="src/assets/recommendationimage.png"
              alt=""
              className="w-full h-full rounded-[20px] object-cover"
            />
            <button className="absolute top-[96px] left-[24px] rounded-full w-[198px] h-[40px] bg-[#1C6C41] text-white text-m font-bold cursor-pointer">
              <AddSquare className="inline mr-2" size="20" color="#FFFFFF" />
              Recommendation
            </button>
          </div>
          <div className="relative w-[306px] h-[174px]">
          <img 
            src="src/assets/askyourcircle.png" 
            alt="" className="w-full h-full rounded-[20px] object-cover"
          />
          <button className="absolute top-[95px] left-[24px] rounded-full w-[175px] h-[40px] bg-white text-black text-m font-bold cursor-pointer border-1 border-green-700">
            <Lock1 className="inline mr-2" size="20" color="#000000" />
            Ask Your Circle</button>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Unchanged */}
      <div className="md:hidden flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Heading */}
          <div className="flex items-center gap-2 justify-center">
            <UserTick className="h-8 w-8" color="#1C6C41" />
            <span className="font-bold text-xl text-center">Trusted Recommendation</span>
          </div>

          {/* Search Bar */}
          <SearchBar 
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        {/* Table (cards on mobile) */}
        <RecommendationTable
          showCategory
          showPhone
          showRecommendedBy
          showNotes
          className="w-full "
        />
      </div>
    </div>
  );
};

export default MainPage;