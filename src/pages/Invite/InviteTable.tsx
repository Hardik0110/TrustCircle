import { TickCircle, CloseCircle } from "iconsax-reactjs";
import data from "@/lib/data/invitesData.json";

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

const InviteTable = ({ type }: { type: "received" | "sent" }) => {
  return (
    <>
      {/* Desktop View - Remains unchanged */}
      <div className="hidden lg:block relative w-[998px] max-h-[360px] overflow-y-auto border-2 border-white rounded-[20px]">
        {/* Header */}
        <div className="bg-[#F8F5F0] px-4 py-2 flex items-center text-sm font-medium text-gray-600">
          <div className="flex-[2]">Name</div>
          <div className="flex-[3]">Email</div>
          <div className="flex-[2]">Expires On</div>
          {type === "received" && <div className="flex-[2] text-center"></div>}
        </div>

        {/* Rows */}
        <div className="h-[300px] overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          {data.map((person, i) => (
            <div
              key={i}
              className="group flex items-center px-4 py-3 border-gray-200 bg-white hover:bg-[#F8F5F0] transition-colors"
            >
              <div className="flex-[2] flex items-center gap-3 text-gray-800">
                <div
                  className={`${getColorClass(i)} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold uppercase select-none`}
                >
                  {person.name
                    .split(" ")
                    .map((n) => n.charAt(0))
                    .slice(0, 2)
                    .join("")}
                </div>
                {person.name}
              </div>
              <div className="flex-[3] text-gray-700">{person.email}</div>
              <div className="flex-[2] text-gray-700">{person.expiresIn}</div>

              {type === "received" && (
                <div className="flex-[2] flex justify-center gap-4">
                  <button className="flex items-center gap-1 px-3 py-2 border font-bold text-white bg-[#1C6C41] rounded-full text-xs">
                    <TickCircle size={16} color="white" /> Accept
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 border font-bold border-[#1C6C41] text-black bg-white rounded-full text-xs">
                    <CloseCircle size={16} color="black" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="lg:hidden block w-full"> 
        {data.map((person, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm mb-4 border border-gray-200 mx-0 p-4" 
          >
            <div className="flex items-center mb-2">
              <div
                className={`${getColorClass(i)} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold uppercase text-lg select-none mr-3`}
              >
                {person.name
                  .split(" ")
                  .map((n) => n.charAt(0))
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <div className="font-semibold text-lg text-gray-800">
                  {person.name}
                </div>
                <div className="text-sm text-gray-600">Expires in: {person.expiresIn}</div>
              </div>
            </div>

            {type === "received" && (
              <div className="flex justify-around mt-4 gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 border font-bold text-white bg-[#1C6C41] rounded-full text-sm">
                  <TickCircle size={18} color="white" /> Accept
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 border font-bold border-[#1C6C41] text-black bg-white rounded-full text-sm">
                  <CloseCircle size={18} color="black" /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default InviteTable;