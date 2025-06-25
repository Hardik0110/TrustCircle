import { ChevronDown } from "lucide-react";
import { Note1 } from "iconsax-reactjs";
import jsonData from "@/lib/data/requestsData.json"; 

const colors = [
  "bg-red-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
];

const getColorClass = (index: number) => colors[index % colors.length];

const RequestTable = ({ type }: { type: "circle" | "created" }) => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block relative w-[998px] max-h-[360px] overflow-y-auto border-2 border-white rounded-[20px]">
        <div className="bg-[#F8F5F0] px-4 py-2 flex items-center text-sm font-medium text-gray-600">
          {type === "circle" && <div className="flex-[3]">From</div>}
          <div className="flex-[3]">Requested For</div>
          <div className="flex-[2]">Expires In</div>
          <div className="flex-[3]">Note</div>
          {type === "circle" && <div className="flex-[2]"></div>}
          {type === "created" && <div className="flex-[3]">Recommendations</div>}
          {type === "created" && <div className="flex-[1]"></div>}
        </div>

        <div className="h-[300px] overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          {jsonData.map((item, i) => (
            <div
              key={i}
              className="group flex items-center px-4 py-3 border-gray-200 bg-white hover:bg-[#F8F5F0] transition-colors"
            >
              {type === "circle" && (
                <div className="flex-[3] flex items-center gap-3 text-gray-800">
                  <div
                    className={`${getColorClass(i)} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold uppercase select-none`}
                  >
                    {item.from?.initials || "--"}
                  </div>
                  {item.from?.name || "Unknown"}
                </div>
              )}
                <div className="flex-[3] text-gray-500">
                    <div className="border border-gray-300 rounded-full px-3 py-0 text-xs bg-white inline-block max-w-full whitespace-normal break-words">
                      {item.requestedFor}
                    </div>
                </div>
              <div className="flex-[2] text-gray-700 text-xs">{item.expiresIn}</div>
              <div className="flex-[3] text-gray-700">
                <Note1 size={18} className="text-gray-500" />
              </div>
              {type === "circle" && (
                <div className="flex-[2] flex justify-end">
                  <button className="px-4 py-2 bg-[#1C6C41] text-white rounded-full text-sm font-semibold">
                    Recommend
                  </button>
                </div>
              )}
              {type === "created" && (
                <>
                  <div className="flex-[3] flex gap-2">
                    {(item.recommendations || []).map((rec: any, idx: number) => (
                      <div
                        key={idx}
                        className={`${getColorClass(idx)} w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white`}
                      >
                        {rec.initials}
                      </div>
                    ))}
                  </div>
                  <div className="flex-[1] flex justify-center">
                    <ChevronDown className="text-gray-600 w-4 h-4" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden block w-full">
        {jsonData.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm mb-4 border border-gray-200 p-4"
          >
            {type === "circle" && (
              <div className="mb-2 flex items-center">
                <div
                  className={`${getColorClass(i)} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold uppercase text-lg select-none mr-3`}
                >
                  {item.from?.initials || "--"}
                </div>
                <div className="font-semibold text-gray-800">
                  {item.from?.name || "Unknown"}
                </div>
              </div>
            )}

            <div className="mb-2">
              <div className="text-sm text-gray-600">Requested For</div>
              <div className="font-semibold text-gray-800">{item.requestedFor}</div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-gray-600">Expires In</div>
              <div className="text-gray-700">{item.expiresIn}</div>
            </div>
            <div className="mb-2">
              <div className="text-sm text-gray-600">Note</div>
              <Note1 size={20} className="text-gray-500" />
            </div>

            {type === "circle" && (
              <div className="mt-4">
                <button className="w-full py-2 bg-[#1C6C41] text-white rounded-full text-sm font-semibold">
                  Recommend
                </button>
              </div>
            )}

            {type === "created" && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-1">Recommendations</div>
                <div className="flex gap-2 mb-2">
                  {(item.recommendations || []).map((rec: any, idx: number) => (
                    <div
                      key={idx}
                      className={`${getColorClass(idx)} w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white`}
                    >
                      {rec.initials}
                    </div>
                  ))}
                </div>
                <button className="flex items-center text-sm font-medium text-gray-700">
                  More <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RequestTable;
