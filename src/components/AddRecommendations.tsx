import {
  AddCircle,
  CloseCircle,
  SearchNormal1,
  MinusCirlce,
  ArrowRight2,
  ElementPlus,
} from "iconsax-reactjs";
import { useState, useMemo } from "react";
import categoriesData from "@/lib/data/categoriesData.json";
import AddProvider from "./AddProvider";

const WIDTH_CLASSES = "w-full max-w-[452px]";

const CategoryItem = ({
  name,
  isExpanded,
  onToggle,
  subcategories,
}: {
  name: string;
  isExpanded: boolean;
  onToggle: () => void;
  subcategories: string[];
}) => (
  <div className="border border-gray-300 rounded-[20px] bg-white overflow-hidden">
    <button
      onClick={onToggle}
      className="flex items-start gap-3 w-full px-2 py-2 bg-[#F8F5F0]"
    >
      {isExpanded ? (
        <MinusCirlce size="22" color="#1C6C41" />
      ) : (
        <AddCircle size="22" color="#a5a5a5" />
      )}
      <div className="flex flex-col text-left">
        <span className="text-sm text-black">{name}</span>
        <span className="text-xs text-gray-400">
          Description of the category can go here
        </span>
      </div>
    </button>

    {isExpanded && (
      <ul className="px-8 pb-4 pt-2 flex flex-col gap-2 bg-[#F8F5F0]">
        {subcategories.map(sub => (
          <li
            key={sub}
            className="flex justify-between items-center text-sm hover:bg-gray-50 cursor-pointer py-2 px-2 border border-gray-200 rounded-[8px] bg-white"
          >
            {sub}
            <ArrowRight2 size="16" color="#1C6C41" />
          </li>
        ))}
      </ul>
    )}
  </div>
);

const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <div
    className={`${WIDTH_CLASSES} h-[244px] border border-gray-300 rounded-[20px] flex flex-col justify-center items-center gap-4 bg-[#F8F5F0] text-center`}
  >
    <div className="rounded-full bg-white p-4">
      <ElementPlus size="48" color="#1C6C41" />
    </div>
    <h5 className="text-sm font-medium leading-snug">
      Would you like to create a custom <br />category for this service?
    </h5>
    <button
      className="px-4 py-2 bg-[#F8F5F0] text-[#1C6C41] text-md font-semibold"
      onClick={onCreate}
      type="button"
    >
      + Create a custom category
    </button>
  </div>
);

const AddRecommendations = ({ onClose }: { onClose: () => void }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showAddProvider, setShowAddProvider] = useState(false);

  const filtered = useMemo(
    () =>
      search
        ? categoriesData.filter(c =>
            c.category.toLowerCase().includes(search.toLowerCase())
          )
        : categoriesData,
    [search]
  );

  if (showAddProvider) return <AddProvider onClose={() => setShowAddProvider(false)} />;

  return (
    <div className="fixed right-0 top-0 h-full w-[500px] bg-white z-50 overflow-y-auto">
      <header className="flex justify-between p-4 bg-[#F8F5F0]">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Recommend a Service Provider</h1>
          <h5 className="text-md text-gray-500">
            Recommend professional service providers whose services you truly value
          </h5>
        </div>
        <CloseCircle
          size="24"
          color="#1C6C41"
          className="cursor-pointer"
          onClick={onClose}
        />
      </header>

      <div className="px-4 pt-4">
        <div className={`relative ${WIDTH_CLASSES} h-[40px]`}>  
          <SearchNormal1
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            size="20"
            color="#1C6C41"
          />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-full pl-10 pr-4 border border-gray-300 rounded-md text-sm outline-none"
          />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {filtered.length === 0 && search.trim() ? (
          <EmptyState onCreate={() => setShowAddProvider(true)} />
        ) : (
          filtered.map(c => (
            <CategoryItem
              key={c.category}
              name={c.category}
              subcategories={c.subcategories}
              isExpanded={expanded === c.category}
              onToggle={() =>
                setExpanded(prev => (prev === c.category ? null : c.category))
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AddRecommendations;
