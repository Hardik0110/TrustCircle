import { DirectInbox, DirectSend, Lock1, UserCirlceAdd } from "iconsax-reactjs";
import { useState } from "react";
import RequestTable from "./RequestsTable";
import AddProvider from "@/components/AddProvider";

type TabType = "Requests From Circle" | "Created By Me";

const Requests = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Requests From Circle");
  const [showAddProvider, setShowAddProvider] = useState(false);

  const tabConfig = [
    { key: "Requests From Circle" as const, label: "Requests From Circle", icon: DirectInbox },
    { key: "Created By Me" as const, label: "Created By Me", icon: DirectSend },
  ];

  const getTabStyles = (tabKey: TabType) =>
    `flex items-center gap-2 whitespace-nowrap border-b-2 text-sm sm:text-base ${
      activeTab === tabKey
        ? "border-[#1C6C41] text-black font-medium"
        : "border-transparent text-gray-400"
    }`;

  const getIconColor = (tabKey: TabType) =>
    activeTab === tabKey ? "#1C6C41" : "#D1D5DB";

  const Tabs = () => (
    <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar px-4 sm:px-8 md:px-12 mb-2">
      {tabConfig.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={getTabStyles(key)}
        >
          <Icon size={18} color={getIconColor(key)} />
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      {/* Add Provider Drawer */}
      {showAddProvider && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowAddProvider(false)}
          />
          <AddProvider onClose={() => setShowAddProvider(false)} />
        </>
      )}

      <div className="w-full max-w-full lg:max-w-[1440px] h-auto lg:h-[241px] -mt-24 bg-gradient-to-b from-transparent to-white pb-8">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-[24px] mt-20 p-4 sm:p-8 md:p-12 font-bold text-center lg:text-left">
            <UserCirlceAdd size={38} color="#1C6C41" className="inline mr-2" /> Requests
          </h1>

          {/* Responsive Tabs Section (visible on all screens) */}
          <Tabs />

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row sm:px-8 md:px-12 mt-4 lg:mt-0 lg:gap-8 relative">
            <div className="w-full lg:max-w-[998px] mt-4">
              <RequestTable type={activeTab === "Requests From Circle" ? "circle" : "created"} />
            </div>

            <div className="hidden lg:block relative w-[306px] h-[174px] mt-4">
              <img
                src="src/assets/askyourcircle.png"
                alt=""
                className="w-full h-full rounded-[20px] object-cover"
              />
              <button
                className="absolute top-[95px] left-[14px] rounded-full w-[175px] h-[40px] bg-white text-black text-m font-bold cursor-pointer border-1 border-green-700"
                onClick={() => setShowAddProvider(true)}
              >
                <Lock1 className="inline mr-2" size="20" color="#000000" />
                Ask Your Circle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
