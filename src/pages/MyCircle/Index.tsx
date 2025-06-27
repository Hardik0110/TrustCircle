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

  const HeaderSection = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 p-3">
        <img src="src/assets/more-circle.svg" alt="" className="w-10 h-10"/>
        <span className="font-bold text-2xl">My Circle</span>
      </div>
      <SearchBar 
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );

  const MobileHeader = () => (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2 justify-center">
        <img src="src/assets/more-circle.svg" alt="" className="w-10 h-10"/>
        <span className="font-bold text-2xl">My Circle</span>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );

  const StepsSection = ({ isMobile }: { isMobile: boolean }) => (
    <div className={`rounded-[20px] bg-[#F0EAE5] ${isMobile ? 'h-[570px] p-6' : 'w-full h-[250px] p-4'} shadow-md ${!isMobile ? 'flex items-start justify-between gap-4' : ''}`}>
      <RecommendationSteps />
    </div>
  );

  const InviteCard = () => (
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
  );

  return (
    <div className="w-full max-w-[1440px] mx-auto md:px-8 md:py-8">
      <div className="hidden md:flex gap-6">
        <div className="w-[1000px] flex flex-col gap-6">
          <HeaderSection />
          
          <RecommendationTable
            showCategory={false}
            showPhone={false}
            showRecommendedBy={false}
            showNotes={false}
            showEmail={true}
            showConnectedOn={true}
            showRecommends={true}
            className="w-full"
          />

          <StepsSection isMobile={false} />
        </div>

        <div className="w-[440px] rounded-lg min-h-[400px] flex flex-col gap-[8px] text-gray-400 mt-22">
          <InviteCard />
        </div>
      </div>

      <div className="md:hidden flex flex-col gap-6">
        <MobileHeader />

        <RecommendationTable
          showCategory={false}
          showPhone={false}
          showRecommendedBy={false}
          showNotes={false}
          showEmail={false}
          showConnectedOn={true}
          showRecommends={true}
          showSeparatorLine={false}
          className="w-full"
        />

        <StepsSection isMobile={true} />
      </div>
    </div>
  )
}

export default MyCircle