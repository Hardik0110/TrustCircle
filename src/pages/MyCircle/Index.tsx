import RecommendationSteps from "@/components/RecommendationSteps"
import { SearchBar } from "@/components/SearchBar"
import RecommendationTable from "@/components/Table"
import { Lock1 } from "iconsax-reactjs"
import { useState } from "react"

const MyCircle = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto md:px-8 md:py-8">
      {/* Desktop Layout */}
      <div className="hidden md:flex gap-6">
        {/* Main Content Section - 1000px */}
        <div className="w-[1000px] flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex items-center justify-between ">
            {/* Left: Heading */}
            <div className="flex items-center gap-2 p-3">
              <img src="src/assets/more-circle.svg" alt="" className="w-10 h-10"/>
              <span className="font-bold text-2xl">My Circle</span>
            </div>

            {/* Right: Search Bar */}
            <SearchBar 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Table */}
          <RecommendationTable
            showCategory={false}
            showPhone={false}
            showRecommendedBy={false}
            showNotes={false}
            showEmail={true}
            showConnectedOn={true}
            showRecommends={true}
            className="w-full "
          />

        <div className="w-full h-[250px] rounded-[20px] p-4 bg-[#F0EAE5] shadow-md flex items-start justify-between gap-4">
          <RecommendationSteps />
        </div>
        </div>

        {/* Right Section - 440px (Future Content) */}
        <div className="w-[440px] rounded-lg min-h-[400px] flex flex-col gap-[8px]  text-gray-400 mt-22">
          <div className="relative w-[306px] h-[174px]">
            <img
              src="src/assets/sendinvite.png"
              alt=""
              className="w-full h-full rounded-[20px] object-cover"
            />
            <button className="absolute top-[96px] left-[24px] rounded-full w-[147px] h-[40px] bg-[#1C6C41] text-white text-m font-bold cursor-pointer">
              <Lock1 className="inline mr-2" size="20" color="#FFFFFF" />
              Send Invite
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Unchanged */}
      <div className="md:hidden flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Heading */}
          <div className="flex items-center gap-2 justify-center">
            <img src="src/assets/more-circle.svg" alt="" className="w-10 h-10"/>
              <span className="font-bold text-2xl">My Circle</span>
          </div>

          {/* Search Bar */}
          <SearchBar 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Table (cards on mobile) */}
        <RecommendationTable
          showCategory={false}
          showPhone={false}
          showRecommendedBy={false}
          showNotes={false}
          showEmail={true}
          showConnectedOn={true}
          showRecommends={true}
          className="w-full "
        />

        {/* Recommendation Steps Section */}
        <div className="  rounded-[20px] bg-[#F0EAE5] h-[570px] p-6">
          <RecommendationSteps />
        </div>
      </div>
    </div>
  )
}

export default MyCircle
