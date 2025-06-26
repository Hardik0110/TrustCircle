import { useState } from "react";
import { CloseCircle, SearchNormal1, CallCalling } from "iconsax-reactjs";

const colors = [
  "bg-red-200", "bg-green-200", "bg-blue-200",
  "bg-yellow-200", "bg-purple-200", "bg-pink-200", "bg-indigo-200"
];

const getColorClass = (index: number) => colors[index % colors.length];

const recommendations = [
  { name: "Andre Wu", initials: "AW", phone: "+1-123-456-7890", label: "Tutor" },
  { name: "Andy Wright", initials: "AW", phone: "+1-123-456-7890", label: "Tutor" },
  { name: "Dave Arron", initials: "DA", phone: "+1-123-456-7890", label: "Tutor" }
];

const AddRecommendation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full max-w-[720px] h-screen flex flex-col bg-[#FAF9F6]">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="relative flex flex-col gap-4 p-4 sm:p-6 bg-white shadow-md rounded-lg m-2 sm:m-4">
          <div className="absolute top-4 right-4 cursor-pointer">
            <CloseCircle size={22} color="#1C6C41" />
          </div>

          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-2">MJ</span>
            <h3 className="font-semibold text-base">Martin Jacobs</h3>
          </div>

          <div className="space-y-4 text-sm text-black">
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="w-32 font-medium">Requested for</span>
              <span className="text-gray-500 border border-gray-300 rounded-full px-3 py-1 inline-block">
                E - Commerce Development & Management
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="w-32 font-medium">Expiry</span>
              <span className="text-gray-500">7 Days Remaining</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="w-32 font-medium">Note</span>
              <span className="text-gray-500 max-w-md leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nunc at tincidunt cursus, felis libero scelerisque erat, nec fermentum sapien sapien a nisi.
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 sm:px-6 mt-2 sm:mt-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-[392px]">
              <SearchNormal1 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input 
                type="text" 
                placeholder="Search for recommendations" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6C41] focus:border-transparent"
              />
            </div>
            <button className="w-full sm:w-auto px-4 py-2 bg-[#1C6C41] text-white rounded-full text-sm font-medium">
              + Add Recommendation
            </button>
          </div>

          {/* Recommendations Table */}
<div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
  {/* Header (hidden on mobile) */}
  <div className="hidden sm:flex bg-[#F8F5F0] px-4 py-3 text-sm font-medium text-gray-600 border-b border-gray-200">
    <div className="w-5 mr-4" /> {/* Checkbox */}
    <div className="w-[35%]">Recommendation by</div>
    <div className="w-[30%]">Phone</div>
    <div className="w-[35%]">Note</div>
  </div>

  {/* Cards for mobile / Rows for desktop */}
  <div className="space-y-2 sm:space-y-0">
    {recommendations.map((rec, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row sm:items-center p-4 border-b border-gray-100 last:border-b-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none shadow-sm sm:shadow-none gap-4"
      >
        {/* Checkbox + Name */}
        <div className="flex items-center gap-3 w-full sm:w-[35%]">
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
          <div className="flex items-center gap-2">
            <div className={`${getColorClass(index)} w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
              {rec.initials}
            </div>
            <div>
              <div className="font-medium text-gray-800">{rec.name}</div>
              <div className="text-xs text-gray-500">{rec.label}</div>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-gray-600 w-full sm:w-[30%]">
          <CallCalling size={16} />
          <span className="text-sm">{rec.phone}</span>
        </div>

        {/* Note */}
        <div className="text-sm text-gray-500 w-full sm:w-[35%]">-</div>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>

      {/* Sticky Footer Button */}
      <div className="px-4 py-4 bg-white border-t border-gray-200 sticky bottom-0 items-end justify-end flex z-10">
        <button className="w-full sm:w-[157px] py-3 bg-[#1C6C41] text-white rounded-full font-medium hover:bg-[#155233] transition-colors">
          Recommend
        </button>
      </div>
    </div>
  );
};

export default AddRecommendation;
