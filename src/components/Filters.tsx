import { SearchNormal1 } from "iconsax-reactjs";
import { X } from "lucide-react";
import { useState, useCallback } from "react";

const categories = {
  "Food and Dining": ["Category 1", "Category 2", "Category 3"],
  "Home & Property": ["I", "II", "III"],
  "User Generated": ["A", "B", "C"],
};

const Checkbox = ({ checked }: { checked: boolean }) => (
  <span
    className={`w-4 h-4 rounded-sm border border-[#1C6C41] flex items-center justify-center ${
      checked ? "bg-[#1C6C41]" : "bg-white"
    }`}
  >
    {checked && (
      <svg
        className="w-3 h-3 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    )}
  </span>
);

const Section = ({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: Record<string, boolean>;
  onToggle: (item: string) => void;
}) => (
  <div className="gap-2 border-b pb-4">
    <h3 className="text-md font-semibold">{title}</h3>
    <ul className="space-y-2 p-2">
      {items.map(item => (
        <li
          key={item}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onToggle(item)}
        >
          <Checkbox checked={!!selected[item]} />
          <span className="text-[#696F67]">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Filters = ({ onClose }: { onClose?: () => void }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggle = useCallback((item: string) => {
    setSelected(prev => ({ ...prev, [item]: !prev[item] }));
  }, []);

  const clearAll = useCallback(() => setSelected({}), []);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col gap-2 p-4 md:relative md:w-[284px] md:h-[515px] md:rounded-lg md:shadow-md md:z-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-green-800 text-sm font-bold"
            onClick={clearAll}
          >
            Clear All
          </button>
          {onClose && <X className="w-5 h-5 cursor-pointer" onClick={onClose} />}
        </div>
      </div>

      <div className="relative">
        <SearchNormal1
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          size={20}
          color="#1C6C41"
        />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-12 w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
        {Object.entries(categories).map(([section, items]) => (
          <Section
            key={section}
            title={section}
            items={items.filter(item =>
              item.toLowerCase().includes(search.toLowerCase())
            )}
            selected={selected}
            onToggle={toggle}
          />
        ))}
      </div>

      <button
        type="button"
        className="w-full h-[40px] bg-[#1C6C41] text-white rounded-full font-semibold mt-auto"
        onClick={() => console.log("Apply Filters")}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
