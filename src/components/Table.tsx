import { Note, ArrowRight2, Call } from "iconsax-reactjs"
import React from "react"
import { recommendationData, type Recommendation } from "../lib/data/recommendationData"

interface ColumnVisibility {
  showCategory: boolean
  showPhone: boolean
  showRecommendedBy: boolean
  showNotes: boolean
  showEmail: boolean
  showConnectedOn: boolean
  showRecommends: boolean
}

interface RecommendationTableProps extends ColumnVisibility {
  data?: Recommendation[]
  className?: string
}

const RecommendationTable: React.FC<RecommendationTableProps> = ({
  data = recommendationData,
  className = "",
  ...columnVisibility
}) => {
  const {
    showCategory,
    showPhone,
    showRecommendedBy,
    showNotes,
    showEmail,
    showConnectedOn,
    showRecommends,
  } = columnVisibility

  return (
    <div className={className}>
      {/* DESKTOP TABLE */}
      <div className="hidden md:block rounded-[20px] overflow-hidden scrollbar-none border-2 border-white">
        <div className="bg-[#F8F5F0] px-4 py-2 grid gap-4 items-center text-sm font-medium text-gray-600"
             style={{
               gridTemplateColumns: `
                 2fr
                 ${showCategory ? '1fr' : ''}
                 ${showPhone ? '1.5fr' : ''}
                 ${showEmail ? '2fr' : ''}
                 ${showConnectedOn ? '1fr' : ''}
                 ${showRecommends ? '1fr' : ''}
                 ${showRecommendedBy ? '1.5fr' : ''}
                 ${showNotes ? '0.5fr' : ''}
               `
             }}>
          <div className="flex items-center gap-2">
            <span>Recommendations</span>
            <span className="bg-[#E6E2DD] text-gray-700 rounded-full px-2 py-0.5 text-xs font-semibold">
              {data.length}
            </span>
          </div>
          {showCategory && <span>Category</span>}
          {showPhone && <span>Contact number</span>}
          {showEmail && <span>Email</span>}
          {showConnectedOn && <span>Connected on</span>}
          {showRecommends && <span className="flex items-end justify-end">Recommends</span>}
          {showRecommendedBy && <span>Recommended by</span>}
          {showNotes && <span className="text-right">Notes</span>}
        </div>

        <div className="max-h-80 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          {data.map((row, i) => (
            <div
              key={i}
              className={`
                group grid gap-4 items-center px-4 py-3 text-[16px] bg-white 
                hover:bg-[#F8F5F0] transition-colors 
                ${i < data.length - 1 ? "border-b border-gray-200" : ""}
              `}
              style={{
                gridTemplateColumns: `
                  2fr
                  ${showCategory ? '1fr' : ''}
                  ${showPhone ? '1.5fr' : ''}
                  ${showEmail ? '2fr' : ''}
                  ${showConnectedOn ? '1fr' : ''}
                  ${showRecommends ? '1fr' : ''}
                  ${showRecommendedBy ? '1.5fr' : ''}
                  ${showNotes ? '0.5fr' : ''}
                `
              }}
            >
              {/* Name column - no changes needed */}
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${row.color} text-gray-800 flex items-center justify-center text-xs font-semibold`}>
                  {row.initials}
                </div>
                <span className="text-gray-800">{row.name}</span>
              </div>

              {/* Category column */}
              {showCategory && (
                <div className="w-full">
                  <span className="text-xs text-gray-700 border border-gray-300 px-3 py-0.6 rounded-full bg-white">
                    {row.tag}
                  </span>
                </div>
              )}

              {/* Phone column */}
              {showPhone && (
                <div className="flex items-center gap-1 text-gray-700">
                  <Call size="16" color="#6B7280" />
                  <span>{row.phone}</span>
                </div>
              )}

              {/* Email column */}
              {showEmail && (
                <div className="text-gray-700">
                  {row.email}
                </div>
              )}

              {/* Connected On column */}
              {showConnectedOn && (
                <div className="text-gray-700">
                  {row.connectedOn}
                </div>
              )}

              {/* Recommends column */}
              {showRecommends && (
                <div className="flex justify-end text-gray-700">
                  <div className="relative flex items-center">
                    <span className="group-hover:opacity-0 transition-opacity">
                      {row.recommends}
                    </span>
                    <ArrowRight2
                      className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      size="20"
                      color="#6B7280"
                    />
                  </div>
                </div>
              )}

              {/* Recommended By column */}
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

              {/* Notes column */}
              {showNotes && (
                <div className="flex justify-end w-full">
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="w-full flex flex-col items-center md:hidden space-y-4 max-h-96 overflow-y-auto">
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
                {showEmail && <p className="text-[12px] text-gray-500">{row.email}</p>}
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
}

export default RecommendationTable