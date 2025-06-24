import {
  AddCircle,
  CloseCircle,
  SearchNormal1,
  MinusCirlce,
  ArrowRight2,
  ElementPlus,
} from "iconsax-reactjs";
import { useState } from "react";
import categoriesData from "@/lib/data/categoriesData.json";
import AddProvider from "./AddProvider";

const AddRecommendations = ({ onClose }: { onClose: () => void }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categoriesData);
  const [showAddProvider, setShowAddProvider] = useState(false); 

  const toggleCategory = (category: string) => {
    setExpandedCategory(prev => (prev === category ? null : category));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = categoriesData.filter(({ category }) =>
      category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleFocus = () => {
    setFilteredCategories([]);
  };

  
  if (showAddProvider) {
    return (
      <AddProvider onClose={() => setShowAddProvider(false)} />
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-[500px] md:w-[500px] w-full bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between p-4 bg-[#F8F5F0]">
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
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-4">
        <div className="relative w-[452px] md:w-[452px] w-full h-[40px]">
          <SearchNormal1
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            size="20"
            color="#1C6C41"
          />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            className="w-full h-full pl-10 pr-4 border border-gray-300 rounded-md text-sm outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 flex flex-col gap-4">
        {filteredCategories.length === 0 && search.trim() !== "" ? (
          <div className="w-[452px] md:w-[452px] w-full h-[244px] border border-gray-300 rounded-[20px] flex flex-col justify-center items-center gap-4 bg-[#F8F5F0] text-center">
            <div className="rounded-full bg-white p-4">
                <ElementPlus size="48" color="#1C6C41" />
            </div>
            <h5 className="text-sm font-medium leading-snug">
                Would you like to create a custom <br />category for this service?
            </h5>
            <button
              className="px-4 py-2 bg-[#F8F5F0] text-[#1C6C41] text-md font-semibold cursor-pointer"
              onClick={() => setShowAddProvider(true)} 
            >
                + Create a custom category
            </button>
        </div>
        ) : (
          filteredCategories.map(({ category, subcategories }) => {
            const isExpanded = expandedCategory === category;

            return (
              <div key={category} className="border border-gray-300 rounded-[20px] bg-white overflow-hidden">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-start gap-3 w-full px-2 py-2 bg-[#F8F5F0]"
                >
                  {isExpanded ? (
                    <MinusCirlce size="22" color="#1C6C41" />
                  ) : (
                    <AddCircle size="22" color="#a5a5a5" />
                  )}
                  <div className="flex flex-col text-left">
                    <span className="text-sm text-black">{category}</span>
                    <span className="text-xs text-gray-400">
                      Description of the category can go here
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <ul className="px-8 pb-4 pt-2 flex flex-col gap-2 bg-[#F8F5F0]">
                    {subcategories.map((sub: string) => (
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
          })
        )}
      </div>
    </div>
  );
};

export default AddRecommendations;