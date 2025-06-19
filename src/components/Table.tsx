import { Note, ArrowRight2, Call } from "iconsax-reactjs"
import React from "react"

interface RecommendationBy { initials: string; color: string }
interface Recommendation {
  initials: string
  name: string
  color: string
  tag: string
  phone?: string
  recommendedBy?: RecommendationBy[]
  notesCount?: number
  
}
interface RecommendationTableProps {
  data?: Recommendation[]
  className?: string
  showCategory: boolean;
  showPhone: boolean;
  showRecommendedBy: boolean;
  showNotes: boolean;
}

const defaultData: Recommendation[] = [
  {
    initials: "AW",
    name: "Andre Wu",
    color: "bg-[#D3F2E6]",
    tag: "Plumber",
    phone: "+1 123-456-7890",
    recommendedBy: [
      { initials: "JD", color: "bg-[#FDDDE1]" },
      { initials: "DA", color: "bg-[#F9EFB0]" },
    ],
    notesCount: 2,
  },
  {
    initials: "AW",
    name: "Andy Wogel",
    color: "bg-[#E7E4FB]",
    tag: "Doctor",
    phone: "+1 123-456-7890",
    recommendedBy: [
      { initials: "AW", color: "bg-[#D3F2E6]" },
      { initials: "JD", color: "bg-[#FDDDE1]" },
    ],
    notesCount: 1,
  },
  {
    initials: "DA",
    name: "Dave Arron",
    color: "bg-[#FFE7D6]",
    tag: "Tutor",
    phone: "+1 123-456-7890",
    recommendedBy: [
      { initials: "AW", color: "bg-[#E7E4FB]" },
      { initials: "DA", color: "bg-[#F9EFB0]" },
    ],
    notesCount: 3,
  },
  {
    initials: "JD",
    name: "Johnathan Doe",
    color: "bg-[#FDDDE1]",
    tag: "Barber",
    phone: "+1 321-654-0987",
    recommendedBy: [
      { initials: "AW", color: "bg-[#D3F2E6]" },
      { initials: "DA", color: "bg-[#FFE7D6]" },
      { initials: "MJ", color: "bg-[#E7E4FB]" },
    ],
    notesCount: 4,
  },
  {
    initials: "MS",
    name: "Mark Shaw",
    color: "bg-[#E6F7E6]",
    tag: "Electrician",
    phone: "+1 987-654-3210",
    recommendedBy: [
      { initials: "JD", color: "bg-[#FDDDE1]" },
      { initials: "AW", color: "bg-[#D3F2E6]" },
    ],
    notesCount: 5,
  },
]

const RecommendationTable: React.FC<RecommendationTableProps> = ({
  data = defaultData,
  className = "",
    showCategory,
  showPhone,
  showRecommendedBy,
  showNotes,
}) => (
  <div className={className}>
    {/* DESKTOP TABLE */}
    <div className="hidden md:block rounded-[20px] overflow-hidden border-2 border-white">
      <div className="bg-[#F8F5F0] px-3 py-2 flex justify-between items-center text-sm font-medium text-gray-600">
        <div className="flex items-center gap-2">
          <span>Recommendations</span>
          <span className="bg-[#E6E2DD] text-gray-700 rounded-full px-2 py-0.5 text-xs font-semibold">
            {data.length}
          </span>
        </div>
        {showCategory && <span>Category</span>}
        {showPhone && <span>Contact number</span>}
        {showRecommendedBy && <span>Recommended by</span>}
        {showNotes && <span>Notes</span>}
      </div>
      {data.map((row, i) => (
        <div
          key={i}
          className={`
            group flex justify-between items-center px-4 py-3 text-[16px] bg-white 
            hover:bg-[#F8F5F0] transition-colors 
            ${i < data.length - 1 ? "border-b border-gray-200" : ""}
          `}
        >
          {/* name */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full ${row.color} text-gray-800 flex items-center justify-center text-xs font-semibold`}
            >
              {row.initials}
            </div>
            <span className="text-gray-800">{row.name}</span>
          </div>
          {/* tag */}
          {showCategory && (
            <span className="text-xs text-gray-700 border border-gray-300 px-3 py-0.6 rounded-full bg-white">
              {row.tag}
            </span>
          )}
          {/* phone */}
          {showPhone && (
            <div className="flex items-center gap-1 text-gray-700">
              <Call size="16" color="#6B7280" />
              <span>{row.phone}</span>
            </div>
          )}
          {/* recommendedBy */}
          {showRecommendedBy && (
            <div className="flex items-center -space-x-2">
              {row.recommendedBy?.map((p, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-10 rounded-full ${p.color} border-2 border-white flex items-center justify-center text-[14px] font-semibold`}
                >
                  {p.initials}
                </div>
              ))}
            </div>
          )}
          {/* notes */}
          {showNotes && (
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Note
                className="absolute inset-0 m-auto transition-opacity group-hover:opacity-0"
                size="20"
                color="#6B7280"
              />
              <ArrowRight2
                className="absolute inset-0 m-auto opacity-0 transition-opacity group-hover:opacity-100"
                size="20"
                color="#6B7280"
              />
              <span className="absolute -right-6 text-[10px] text-gray-600">
                {row.notesCount}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* MOBILE CARDS */}
    <div className="w-full flex flex-col items-center md:hidden space-y-4">
      {data.map((row, i) => (
        <div
          key={i}
          className="w-full max-w-[360px] flex items-center justify-between bg-white rounded-xl p-4 shadow"
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${row.color} flex items-center justify-center text-xs font-semibold`}
            >
              {row.initials}
            </div>
            <div>
              <p className="font-medium text-sm">{row.name}</p>
              {showCategory && <p className="text-[12px] text-gray-500">{row.tag}</p>}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {showPhone && <Call size="16" color="#6B7280" />}
            {showRecommendedBy && (
              <div className="flex -space-x-2">
                {row.recommendedBy?.map((p, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full ${p.color} border-2 border-white`}
                  />
                ))}
              </div>
            )}
            <ArrowRight2 size="20" color="#6B7280" />
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default RecommendationTable
