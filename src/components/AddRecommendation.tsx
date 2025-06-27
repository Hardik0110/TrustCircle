import { useState } from "react";
import { CloseCircle, SearchNormal1, CallCalling } from "iconsax-reactjs";

const COLORS = [
  "bg-red-200", "bg-green-200", "bg-blue-200",
  "bg-yellow-200", "bg-purple-200", "bg-pink-200", "bg-indigo-200"
] as const;

const getColorClass = (index: number): string => COLORS[index % COLORS.length];

interface Recommendation {
  name: string;
  initials: string;
  phone: string;
  label: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  { name: "Andre Wu", initials: "AW", phone: "+1-123-456-7890", label: "Tutor" },
  { name: "Andy Wright", initials: "AW", phone: "+1-123-456-7890", label: "Tutor" },
  { name: "Dave Arron", initials: "DA", phone: "+1-123-456-7890", label: "Tutor" }
];

const AddRecommendation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full max-w-[720px] h-screen flex flex-col bg-[#FAF9F6]">
      <div className="flex-1 overflow-y-auto">
        <Header />
        <SearchSection 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        <RecommendationsTable recommendations={RECOMMENDATIONS} />
      </div>
      <Footer />
    </div>
  );
};

const Header = () => (
  <div className="relative flex flex-col gap-4 p-4 sm:p-6 bg-white shadow-md rounded-lg m-2 sm:m-4">
    <div className="absolute top-4 right-4 cursor-pointer">
      <CloseCircle size={22} color="#1C6C41" />
    </div>

    <UserInfo />
    <RequestDetails />
  </div>
);

const UserInfo = () => (
  <div className="flex items-center">
    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-2">
      MJ
    </span>
    <h3 className="font-semibold text-base">Martin Jacobs</h3>
  </div>
);

const RequestDetails = () => (
  <div className="space-y-4 text-sm text-black">
    <DetailRow 
      label="Requested for" 
      value="E - Commerce Development & Management" 
      isTag 
    />
    <DetailRow 
      label="Expiry" 
      value="7 Days Remaining" 
    />
    <DetailRow 
      label="Note" 
      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nunc at tincidunt cursus, felis libero scelerisque erat, nec fermentum sapien sapien a nisi."
      isNote
    />
  </div>
);

interface DetailRowProps {
  label: string;
  value: string;
  isTag?: boolean;
  isNote?: boolean;
}

const DetailRow = ({ label, value, isTag, isNote }: DetailRowProps) => (
  <div className="flex flex-col sm:flex-row gap-2">
    <span className="w-32 font-medium">{label}</span>
    <span className={`text-gray-500 ${
      isTag ? 'border border-gray-300 rounded-full px-3 py-1 inline-block' : ''
    } ${isNote ? 'max-w-md leading-relaxed' : ''}`}>
      {value}
    </span>
  </div>
);

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchSection = ({ searchQuery, onSearchChange }: SearchSectionProps) => (
  <div className="px-4 sm:px-6 mt-2 sm:mt-4">
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
      <SearchInput 
        value={searchQuery} 
        onChange={onSearchChange} 
      />
      <AddButton />
    </div>
  </div>
);

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <div className="relative w-full sm:w-[392px]">
    <SearchNormal1 
      size={20} 
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input 
      type="text" 
      placeholder="Search for recommendations" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6C41] focus:border-transparent"
    />
  </div>
);

const AddButton = () => (
  <button className="w-full sm:w-auto px-4 py-2 bg-[#1C6C41] text-white rounded-full text-sm font-medium">
    + Add Recommendation
  </button>
);

const RecommendationsTable = ({ recommendations }: { recommendations: Recommendation[] }) => (
  <div className="px-4 sm:px-6">
    <div className="bg-white border-b rounded-lg overflow-hidden mb-6">
      <TableHeader />
      <TableBody recommendations={recommendations} />
    </div>
  </div>
);

const TableHeader = () => (
  <div className="hidden sm:flex bg-[#F8F5F0] px-4 py-3 text-sm font-medium text-gray-600 border-b border-gray-200">
    <div className="w-5 mr-4" />
    <div className="w-[35%]">Recommendation by</div>
    <div className="w-[30%]">Phone</div>
    <div className="w-[35%]">Note</div>
  </div>
);

const TableBody = ({ recommendations }: { recommendations: Recommendation[] }) => (
  <div className="space-y-2 sm:space-y-0">
    {recommendations.map((rec, index) => (
      <RecommendationRow key={index} recommendation={rec} index={index} />
    ))}
  </div>
);

interface RecommendationRowProps {
  recommendation: Recommendation;
  index: number;
}

const RecommendationRow = ({ recommendation, index }: RecommendationRowProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center p-4 border-b border-gray-100 last:border-b-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none shadow-sm sm:shadow-none gap-4">
    <CheckboxWithUser 
      recommendation={recommendation} 
      index={index} 
    />
    <PhoneInfo phone={recommendation.phone} />
    <NoteSection />
  </div>
);

interface CheckboxWithUserProps {
  recommendation: Recommendation;
  index: number;
}

const CheckboxWithUser = ({ recommendation, index }: CheckboxWithUserProps) => (
  <div className="flex items-center gap-3 w-full sm:w-[35%]">
    <Checkbox />
    <UserAvatar 
      initials={recommendation.initials} 
      name={recommendation.name} 
      label={recommendation.label} 
      index={index} 
    />
  </div>
);

const Checkbox = () => (
  <div className="w-5 h-5">
    <span className="relative block w-5 h-5">
      <input
        type="checkbox"
        className="appearance-none w-5 h-5 border border-gray-300 rounded-sm bg-white checked:bg-[#1C6C41] checked:border-[#1C6C41] peer"
      />
      <svg
        className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8L6 11L13 4" />
      </svg>
    </span>
  </div>
);

interface UserAvatarProps {
  initials: string;
  name: string;
  label: string;
  index: number;
}

const UserAvatar = ({ initials, name, label, index }: UserAvatarProps) => (
  <div className="flex items-center gap-2">
    <div className={`${getColorClass(index)} w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
      {initials}
    </div>
    <div>
      <div className="font-medium text-gray-800">{name}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  </div>
);

const PhoneInfo = ({ phone }: { phone: string }) => (
  <div className="flex items-center gap-2 text-gray-600 w-full sm:w-[30%]">
    <CallCalling size={16} />
    <span className="text-sm">{phone}</span>
  </div>
);

const NoteSection = () => (
  <div className="text-sm text-gray-500 w-full sm:w-[35%]">-</div>
);

const Footer = () => (
  <div className="px-4 py-4 bg-white border-t border-gray-200 sticky bottom-0 items-end justify-end flex z-10">
    <button className="w-full sm:w-[157px] py-3 bg-[#1C6C41] text-white rounded-full font-medium hover:bg-[#155233] transition-colors">
      Recommend
    </button>
  </div>
);

export default AddRecommendation;