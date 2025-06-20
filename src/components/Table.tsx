import { Note, ArrowRight2, Call, ArrowSwapVertical, Sort } from "iconsax-reactjs";
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
}

interface RecommendationTableProps extends ColumnVisibility {
  data?: Recommendation[];
  className?: string;
}

const categories = ["Plumber", "Electrician", "Tutor", "Handymen"];

const RecommendationTable: React.FC<RecommendationTableProps> = ({
  data = recommendationData,
  className = "",
  ...columnVisibility
}) => {
  const { showCategory, showPhone, showRecommendedBy,
          showNotes, showEmail, showConnectedOn,showRecommends,
        } = columnVisibility;

  const [sortAsc, setSortAsc] = useState(true);
  const [showCatPopup, setShowCatPopup] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [openRowPopup, setOpenRowPopup] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowCatPopup(false);
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
        {/* header */}
        <div
          className="bg-[#F8F5F0] px-4 py-2 grid gap-4 items-center text-sm font-medium text-gray-600"
          style={{
            gridTemplateColumns: `
              2fr
              ${showCategory ? "1fr" : ""}
              ${showPhone ? "1.5fr" : ""}
              ${showEmail ? "2fr" : ""}
              ${showConnectedOn ? "1fr" : ""}
              ${showRecommends ? "1fr" : ""}
              ${showRecommendedBy ? "1.5fr" : ""}
              ${showNotes ? "0.5fr" : ""}
            `,
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setSortAsc(!sortAsc)}
            >
              Recommendations
              <ArrowSwapVertical
                size={14}
                color="grey"
                className={sortAsc ? "" : "rotate-180"}
              />
            </span>
            <span className="bg-[#E6E2DD] text-gray-700 rounded-full px-2 py-0.5 text-xs font-semibold">
              {filtered.length}
            </span>
          </div>

          {showCategory && (
            <div className="relative" ref={popupRef}>
              <span className="flex items-center gap-1">
                Category
                <Sort
                  size={15}
                  color="grey"
                  className="cursor-pointer"
                  onClick={() => setShowCatPopup((v) => !v)}
                />
              </span>
              {showCatPopup && (
                <div className="absolute top-full mt-2 right-0 bg-[#F8F5F0] p-4 shadow-lg rounded-md z-10 w-[200px] border-2 border-white">
                  <div className="text-gray-800 font-semibold mb-2">All Categories</div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`px-3 py-1 border-2 rounded-full text-sm
                          ${selectedCat === cat
                            ? "border-[#E6E2DD] bg-white text-gray-900 font-semibold"
                            : "border-[#E6E2DD] bg-white text-gray-700"}
                        `}
                        onClick={() => {
                          setSelectedCat(cat);
                          setShowCatPopup(false);
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {showPhone && <span>Contact number</span>}
          {showEmail && <span>Email</span>}
          {showConnectedOn && <span>Connected on</span>}
          {showRecommends && <span className="flex justify-end">Recommends</span>}
          {showRecommendedBy && (
            <span className="flex items-center gap-1">
              Recommended by
              <Sort size={15} color="grey" className="cursor-pointer" />
            </span>
          )}
          {showNotes && <span className="text-right">Notes</span>}
        </div>

        {/* rows */}
        <div className="h-80 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          {filtered.map((row, i) => {
            const tags = Array.isArray(row.tags) ? row.tags : [row.tag];
            return (
              <div
                key={i}
                className={`group grid gap-4 items-center px-4 py-3 bg-white hover:bg-[#F8F5F0] transition-colors ${
                  i < filtered.length - 1 ? "border-b border-gray-200" : ""
                }`}
                style={{
                  gridTemplateColumns: `
                    2fr
                    ${showCategory ? "1fr" : ""}
                    ${showPhone ? "1.5fr" : ""}
                    ${showEmail ? "2fr" : ""}
                    ${showConnectedOn ? "1fr" : ""}
                    ${showRecommends ? "1fr" : ""}
                    ${showRecommendedBy ? "1.5fr" : ""}
                    ${showNotes ? "0.5fr" : ""}
                  `,
                }}
              >
                {/* Name */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full ${row.color} flex items-center justify-center text-xs font-semibold`}
                  >
                    {row.initials}
                  </div>
                  <span className="text-gray-800">{row.name}</span>
                </div>

                {/* Category multi-tag */}
                {showCategory && (
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      {tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-xs text-gray-700 border border-[#E6E2DD] px-3 py-0.6 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                      {tags.length > 2 && (
                        <button
                          onClick={() =>
                            setOpenRowPopup(openRowPopup === i ? null : i)
                          }
                          className="w-6 h-6 flex items-center justify-center text-xs border border-[#E6E2DD] rounded-full"
                        >
                          +{tags.length - 2}
                        </button>
                      )}
                    </div>
                    {openRowPopup === i && (
                  <div className="absolute top-full mt-2 left-0 bg-white p-2 shadow- rounded-md z-10 w-[200px]">
                    <p className="mb-2 text-sm font-bold">All Categories</p>
                    <div className="grid grid-cols-2 gap-2">
                      {tags.slice(2).map((t) => (
                        <button
                          key={t}
                          className="text-left px-3 py-1 border border-[#E6E2DD] rounded-full text-sm"
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
                  <div className="flex items-center gap-1 text-gray-700">
                    <Call size="16" color="#6B7280" />
                    <span>{row.phone}</span>
                  </div>
                )}
                {showEmail && <div className="text-gray-700">{row.email}</div>}
                {showConnectedOn && <div className="text-gray-700">{row.connectedOn}</div>}
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
            );
          })}
        </div>
      </div>

      {/* MOBILE */}
      <div className="w-full flex flex-col items-center md:hidden space-y-4 max-h-96 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
        {filtered.map((row, i) => {
          const tags = Array.isArray(row.tags) ? row.tags : [row.tag];
          return (
            <div
              key={i}
              className="w-full max-w-[360px] flex items-center justify-between bg-white rounded-xl p-4 shadow"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${row.color} flex items-center justify-center text-xs font-semibold`}
                >
                  {row.initials}
                </div>
                <div>
                  <p className="font-medium text-sm">{row.name}</p>
                  {showEmail && <p className="text-[12px] text-gray-500">{row.email}</p>}
                  {showCategory && <p className="text-[12px] text-gray-500">{tags.join(", ")}</p>}
                </div>
              </div>
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
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationTable;