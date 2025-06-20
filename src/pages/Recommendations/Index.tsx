import RecommendationSteps from "@/components/RecommendationSteps";
import { SearchBar } from "@/components/SearchBar";
import RecommendationTable from "@/components/Table";
import { Card } from "@/components/ui/card";
import { AddSquare, Lock1, UserTick } from "iconsax-reactjs";
import { useState } from "react";

const Index: React.FC = () => {
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
            showCategory={true}
            showPhone={true}
            showRecommendedBy={true}
            showNotes={true}
            showEmail={false}
            showConnectedOn={false}
            showRecommends={false}
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
            <UserTick className="w-10 h-10" color="#1C6C41"/>
              <span className="font-bold text-2xl">Trusted Recommendation</span>
          </div>

          {/* Search Bar */}
          <SearchBar 
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        {/* Table (cards on mobile) */}
        <RecommendationTable
          showCategory={true}
          showPhone={true}
          showRecommendedBy={true}
          showNotes={true}
          showEmail={false}
          showConnectedOn={false}
          showRecommends={false}
          className="w-full "
        />

        {/* Recommendation Steps Section */}
        <div className="  rounded-[20px] bg-[#F0EAE5] h-[570px] p-6">
          <RecommendationSteps />
        </div>
      </div>
    </div>
  );
};

export default Index;