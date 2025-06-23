import {
  Note,
  ArrowRight2,
  Call,
  ArrowSwapVertical,
  Sort,
  ProfileTick,
  ArrowLeft2,
  Trash,
  LogoutCurve,
} from "iconsax-reactjs";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { recommendationData, type Recommendation } from "../lib/data/recommendationData";

interface ColumnVisibility {
  showCategory: boolean;
  showPhone: boolean;
  showRecommendedBy: boolean;
  showNotes: boolean;
  showEmail: boolean;
  showConnectedOn: boolean;
  showRecommends: boolean;
  showSeparatorLine?: boolean;
}

interface RecommendationTableProps extends ColumnVisibility {
  data?: Recommendation[];
  className?: string;
}

const categories = [...new Set(recommendationData.flatMap(item => item.tags))];

const RecommendationTable: React.FC<RecommendationTableProps> = ({
  data = recommendationData,
  className = "",
  ...columnVisibility
}) => {
  const { showCategory, showPhone, showRecommendedBy, showSeparatorLine,
          showNotes, showEmail, showConnectedOn,showRecommends,
        } = columnVisibility;

  const [sortAsc, setSortAsc] = useState(true);
  const [showCatPopup, setShowCatPopup] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [openRowPopup, setOpenRowPopup] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const rowPopupRef = useRef<HTMLDivElement>(null);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

  

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowCatPopup(false);
      }
      if (rowPopupRef.current && !rowPopupRef.current.contains(e.target as Node)) {
        setOpenRowPopup(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const sorted = useMemo(
    () =>
      [...data].sort((a, b) =>
        sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      ),
    [data, sortAsc]
  );

  const filtered = useMemo(() => {
    if (!selectedCat) return sorted;
    return sorted.filter((r) => {
      const tags = Array.isArray(r.tags) ? r.tags : [r.tag];
      return tags.some((t) => t.toLowerCase() === selectedCat.toLowerCase());
    });
  }, [sorted, selectedCat]);

  return (
    <div className={className}>
      {/* DESKTOP */}
      <div className="hidden md:block rounded-[20px] overflow-hidden scrollbar-none border-2 border-white">
        {/* DETAIL CARD slides above header */}
        {detailIndex !== null && (
          <div className="h-[96px] w-full bg-white border-b border-gray-200 flex items-center px-4 ">
            <button
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
              onClick={() => setDetailIndex(null)}
            >
              <ArrowLeft2 size={20} className="cursor-pointer"/> Back
            </button>
            <div className="flex items-center gap-6 ml-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${filtered[detailIndex].color} flex items-center justify-center text-xs font-semibold`}
                >
                  {filtered[detailIndex].initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{filtered[detailIndex].name}</span>
                  <span className="text-sm text-gray-500">{filtered[detailIndex].email}</span>
                </div>
              </div>
              {showConnectedOn && (
                <div className="text-sm text-gray-600">
                  Connected on {filtered[detailIndex].connectedOn}
                </div>
              )}
            </div>
            <button
              className="flex items-center gap-1 text-red-600 hover:text-red-800 justify-self-end ml-auto"
              onClick={() => console.log("delete", filtered[detailIndex])}
            >
              <Trash size={20} />
            </button>
          </div>
        )}

        {/* HEADER */}
        <div className="bg-[#F8F5F0] px-4 py-2 flex gap-4 items-center text-sm font-medium text-gray-600">
          <div className="w-[270px] flex items-center gap-1">
            <span className="flex items-center gap-1 cursor-pointer" onClick={() => setSortAsc(!sortAsc)}>
              Recommendations
              <ArrowSwapVertical size={14} color="grey" className={sortAsc ? "" : "rotate-180"} />
            </span>
            <span className="bg-[#E6E2DD] text-gray-700 rounded-full px-2 py-0.5 text-xs font-semibold">
              {filtered.length}
            </span>
          </div>

          {showCategory && (
            <div className="w-[245px] relative" ref={popupRef}>
              <span className="flex items-center gap-1">
                Category
                <Sort size={15} color="grey" className="cursor-pointer" onClick={() => setShowCatPopup(v => !v)} />
              </span>
              {showCatPopup && (
                <div className="absolute top-full mt-2 right-0 bg-[#F8F5F0] p-4 shadow-lg rounded-md z-10 w-[200px] border-2 border-white">
                  <div className="text-gray-800 font-semibold mb-2">All Categories</div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        className={`px-3 py-1 border-2 rounded-full text-sm ${
                          selectedCat === cat
                            ? "border-[#E6E2DD] bg-white text-gray-900 font-semibold"
                            : "border-[#E6E2DD] bg-white text-gray-700"
                        }`}
                        onClick={() => { setSelectedCat(cat); setShowCatPopup(false); }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {showPhone && <span className="w-[200px]">Contact number</span>}
          {showEmail && <span className="w-[287px]">Email</span>}
          {showConnectedOn && <span className="w-[215px]">Connected on</span>}
          {showRecommends && <span className="w-[160px]">Recommends</span>}
          {showRecommendedBy && (
            <span className="w-[180px] flex items-center gap-1">
              Recommended by
              <Sort size={15} color="grey" className="cursor-pointer" />
            </span>
          )}
          {showNotes && <span className="w-[94px] text-right">Notes</span>}
        </div>

        {/* ROWS */}
        <div className="h-80 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          {filtered.map((row, i) => {
            const tags = Array.isArray(row.tags) ? row.tags : [row.tag];
            return (
              <div
                key={i}
                onClick={() => setDetailIndex(detailIndex === i ? null : i)}
                className={`group flex gap-4 items-center px-4 py-3 border-b border-gray-200 transition-colors cursor-pointer ${
                  detailIndex === i ? "bg-[#eef6f1]" : "bg-white hover:bg-[#F8F5F0]"
                }`}
              >
                {/* Name */}
                <div className="w-[270px] flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${row.color} flex items-center justify-center text-xs font-semibold`}>
                    {row.initials}
                  </div>
                  <span className="text-gray-800">{row.name}</span>
                </div>

                {/* Category multi-tag */}
                {showCategory && (
                  <div className="w-[245px] relative">
                    <div className="flex items-center gap-2">
                      {tags.slice(0, 2).map(t => (
                        <span key={t} className="text-xs text-gray-700 border border-[#E6E2DD] px-3 py-0.6 rounded-full">
                          {t}
                        </span>
                      ))}
                      {tags.length > 2 && (
                        <button
                          onClick={e => { e.stopPropagation(); setOpenRowPopup(openRowPopup === i ? null : i); }}
                          className="w-6 h-6 flex items-center justify-center text-xs border border-[#E6E2DD] rounded-full"
                        >
                          +{tags.length - 2}
                        </button>
                      )}
                    </div>
                    {openRowPopup === i && (
                      <div ref={rowPopupRef} className="absolute top-full mt-2 left-0 bg-white p-2 shadow-lg rounded-md z-10 w-[200px] border-2 border-white">
                        <p className="mb-2 text-sm font-bold">All Categories — {row.name}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {tags.slice(2).map(t => (
                            <button
                              key={t}
                              className="px-3 py-1 border border-[#E6E2DD] rounded-full text-sm text-left"
                              onClick={() => {
                                setSelectedCat(t);
                                setOpenRowPopup(null);
                              }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {showPhone && (
                  <div className="w-[200px] flex items-center gap-1 text-gray-700">
                    <Call size="16" color="#6B7280" />
                    <span>{row.phone}</span>
                  </div>
                )}
                {showEmail && <div className="w-[287px] text-gray-700">{row.email}</div>}
                {showConnectedOn && (
                  <div className="w-[215px] text-gray-700">{row.connectedOn}</div>
                )}
                {showRecommends && (
                  <div className="w-[160px] text-gray-700 flex justify-end">
                    <div className="relative flex items-center">
                      <span className="group-hover:opacity-0 transition-opacity">
                        {row.recommends}
                      </span>
                      <ArrowRight2
                        className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        size="20"
                        color="#6B7280"
                      />
                    </div>
                  </div>
                )}
                {showRecommendedBy && (
                  <div className="w-[180px] flex items-center -space-x-2">
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
                {showNotes && (
                  <div className="w-[94px] flex justify-end">
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
            );
          })}
        </div>
      </div>

      {/* MOBILE */}
      <div className="w-full flex flex-col md:hidden">
        {/* MOBILE DETAIL CARD */}
        {detailIndex !== null && (
          <div className="w-full bg-white border-b border-gray-200 p-4 mb-2">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
              onClick={() => setDetailIndex(null)}
            >
              <ArrowLeft2 size={20} />
              <span className="text-sm">Back</span>
            </button>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${filtered[detailIndex].color} flex items-center justify-center text-sm font-semibold`}
                >
                  {filtered[detailIndex].initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-base">{filtered[detailIndex].name}</span>
                  <span className="text-sm text-gray-500">{filtered[detailIndex].email}</span>
                </div>
              </div>
              <button
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                onClick={() => setShowDeletePopup(true)}
              >
                <Trash size={20} />
              </button>
            </div>
            {showConnectedOn && (
              <div className="text-sm text-gray-600 mb-2">
                Connected on {filtered[detailIndex].connectedOn}
              </div>
            )}
          </div>
        )}

        <div className="max-h-96 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden gap-2 flex flex-col">
          {filtered.map((row, i) => {
            const tags = Array.isArray(row.tags) ? row.tags : [row.tag];
            return (
              <div
                key={i}
                onClick={() => setDetailIndex(detailIndex === i ? null : i)}
                className={`w-full p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                  detailIndex === i ? "bg-[#eef6f1]" : "bg-white hover:bg-[#F8F5F0]"
                }`}
              >
                {/* First row: Initial + Name and Recommended By */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${row.color} flex items-center justify-center text-xs font-semibold`}
                    >
                      {row.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-gray-800">{row.name}</span>
                      {showRecommends && (
                      <div className="flex items-center gap-1">
                        <ProfileTick size={12} color="#6B7280" />
                        <span className="text-xs text-gray-600">{row.recommends} Recommendations</span>
                      </div>
                      )}
                    </div>
                  </div>
                  {showRecommendedBy && (
                    <div className="flex items-center -space-x-2">
                      {row.recommendedBy?.map((p, idx) => (
                        <div
                          key={idx}
                          className={`w-10 h-10 rounded-full ${p.color} border-2 border-white flex items-center justify-center text-[10px] font-semibold`}
                        >
                          {p.initials}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Second row: Category tags */}
                {showCategory && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-gray-700 border border-[#E6E2DD] px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Email row */}
                {showEmail && (
                  <div className="mb-3">
                    <div className="text-gray-700 text-sm">{row.email}</div>
                  </div>
                )}

                {/* Connected On row */}
                {showConnectedOn && (
                  <div className="mb-3">
                    <div className="text-gray-700 text-sm">{row.connectedOn}</div>
                  </div>
                )}

                {/* Notes row */}
                {showNotes && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Note size="16" color="#6B7280" />
                      <span className="text-sm">{row.notesCount} notes</span>
                    </div>
                  </div>
                )}

                {/* Separator line */}
                {showSeparatorLine && (
                  <div className="border-t border-gray-200 mb-3"></div>
                )}  

                {/* Third row: Phone and Arrow */}
                {showPhone && (
                <div className="flex items-center justify-between">
                  
                    <div className="flex items-center gap-2 text-gray-700">
                      <Call size="16" color="#6B7280" />
                      <span className="text-sm">{row.phone}</span>
                    </div>
                  
                  <ArrowRight2 size="20" color="#6B7280" />
                </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DELETE CONFIRMATION POPUP - MOBILE ONLY */}
        {showDeletePopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="relative w-[328px] h-[260px] bg-white rounded-lg p-6 flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setShowDeletePopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>

            <div className="flex items-center justify-between">
              <h2>
                <LogoutCurve color="#1c6c41" size={28} className="mb-2" />
              </h2>
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mb-2">Remove Connection?</h1>
            <div className="flex-1 mb-2 text-[#696F67]">
              If you close now, all progress will be lost. <br />
              This action cannot be undone
            </div>

            <div className="flex gap-4 mb-2">
              <button
                className="flex-1 py-3 px-4 bg-[#1C6C41] text-white rounded-full font-medium hover:bg-green-700"
                onClick={() => {
                  console.log("delete", filtered[detailIndex!]);
                  setShowDeletePopup(false);
                  setDetailIndex(null);
                }}
              >
                Remove
              </button>
              <button
                className="flex-1 py-3 px-4 border-2 border-[#1C6C41] text-[#1C6C41] rounded-full font-medium hover:bg-green-50"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default RecommendationTable;