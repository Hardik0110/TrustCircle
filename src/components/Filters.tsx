import { SearchNormal1 } from "iconsax-reactjs";
import { X } from "lucide-react"; // Or use any close icon
import { useState } from "react";

const categories = {
  "Food and Dining": ["Category 1", "Category 2", "Category 3"],
  "Home & Property": ["I", "II", "III"],
  "User Generated": ["A", "B", "C"],
};

const Filters = ({ onClose }: { onClose?: () => void }) => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const toggle = (category: string) => {
    setSelected(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col gap-2 p-4 rounded-none shadow-md w-full h-full overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden md:relative md:w-[284px] md:h-[515px] md:rounded-lg md:shadow-md md:z-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex items-center gap-3">
          <span
            className="text-green-800 cursor-pointer text-sm font-bold"
            onClick={() => setSelected({})}
          >
            Clear All
          </span>
          {onClose && (
            <X className="w-5 h-5 text-black cursor-pointer" onClick={onClose}/>
          )}
        </div>
      </div>

      <div className="relative">
        <SearchNormal1
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          size="20"
          color="#1C6C41"
        />
        <input
          type="text"
          placeholder="Search..."
          className="pl-12 w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {Object.entries(categories).map(([section, items]) => (
        <div key={section} className="gap-2 border-b pb-4">
          <h3 className="text-md font-semibold">{section}</h3>
          <ul className="space-y-2 p-2">
            {items.map(item => (
              <li
                key={item}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggle(item)}
              >
                <span
                  className={`w-4 h-4 rounded-sm border border-[#1C6C41] flex items-center justify-center ${
                    selected[item] ? "bg-[#1C6C41]" : "bg-white"
                  }`}
                >
                  {selected[item] && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-[#696F67]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="relative bottom-0 left-0 right-0 bg-white mt-4">
        <button
          className="w-full h-[40px] bg-[#1C6C41] text-white rounded-full font-semibold"
          onClick={() => console.log("Apply Filters")}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
