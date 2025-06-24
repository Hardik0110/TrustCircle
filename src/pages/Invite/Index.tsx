import { useState } from "react";
import { Import, Export, SmsStar, ArrowDown2, ArrowUp2 } from "iconsax-reactjs";
import InviteTable from "./InviteTable";
import SendInvite from "@/components/SendInvite";

type TabType = "received" | "sent";

const Invite = () => {
  const [activeTab, setActiveTab] = useState<TabType>("received");
  const [showHowInvitesWork, setShowHowInvitesWork] = useState(false);
  const [showSendInvite, setShowSendInvite] = useState(false);

  const tabConfig = [
    { key: "received" as const, label: "Received", icon: Import },
    { key: "sent" as const, label: "Sent", icon: Export }
  ];

  const inviteSteps = [
    "Invite someone you trust to join your circle.",
    "Once they accept, you'll both see each other's recommendations—1st-degree only.",
    "Grow your circle! Invite 5 people to start requesting recommendations."
  ];

  const getTabStyles = (tabKey: TabType) =>
    `flex items-center gap-2 py-3 border-b-2 text-sm sm:text-base ${
      activeTab === tabKey
        ? "border-[#1C6C41] text-black font-medium"
        : "border-transparent text-gray-400"
    }`;

  const getIconColor = (tabKey: TabType) =>
    activeTab === tabKey ? "#1C6C41" : "#D1D5DB";

  const Tabs = () => (
    <div className="flex gap-4 sm:gap-8">
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

  const InviteSteps = () => (
    <div className="mt-4">
      {inviteSteps.map((step, index) => (
        <div key={index} className="flex items-start mb-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-sm mr-2">
            {index + 1}
          </div>
          <p className="text-sm text-gray-700">{step}</p>
        </div>
      ))}
    </div>
  );

  const ImageCard = ({ isMobile }: { isMobile: boolean }) => (
    <div
      className={`${isMobile ? 'w-full' : 'w-[306px] h-[441px] absolute -top-66 right-4'} rounded-[20px] p-2 bg-white shadow-md ${isMobile ? 'mb-8' : 'mt-4'}`}
    >
      <img 
        src="src/assets/inviteimage.png" 
        alt="Invite Image" 
        className="w-full h-auto rounded-t-[18px] mb-4 cursor-pointer"
        onClick={() => setShowSendInvite(true)} // <-- Only image is clickable
      />

      <div className={isMobile ? 'px-2 pb-2' : 'px-4 pb-4'}>
        {isMobile ? (
          <>
            <button 
              onClick={e => {
                e.stopPropagation();
                setShowHowInvitesWork(!showHowInvitesWork);
              }}
              className="w-full flex items-center justify-between text-md font-semibold text-gray-800 focus:outline-none"
            >
              <div className="flex items-center">
                <SmsStar color="#1C6C41" className="inline mr-2" />
                How invites work
              </div>
              {showHowInvitesWork ? (
                <ArrowUp2 size={20} color="#1C6C41" />
              ) : (
                <ArrowDown2 size={20} color="#1C6C41" />
              )}
            </button>
            {showHowInvitesWork && <InviteSteps />}
          </>
        ) : (
          <>
            <h1 className="text-md font-semibold mt-4 ml-2">
              <SmsStar color="#1C6C41" className="inline mr-2" />
              How invites work
            </h1>
            <InviteSteps />
          </>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* SendInvite Drawer */}
      {showSendInvite && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowSendInvite(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-[500px] z-50">
            <SendInvite />
          </div>
        </>
      )}

      {/* Top Section */}
      <div className="w-full max-w-full lg:max-w-[1440px] h-auto lg:h-[346px] -mt-24 bg-gradient-to-b from-transparent to-white pb-8">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-[24px] mt-20 p-4 sm:p-8 md:p-12 font-bold text-center lg:text-left">
            Invite & Strengthen <br /> Your Trust Circle
          </h1>

          {/* Desktop Tabs Section */}
          <div className="hidden lg:block w-full border-b border-gray-200 px-4 sm:px-8 md:px-12">
            <Tabs />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 mt-4 lg:mt-0 gap-8 lg:gap-0 relative">
        
        {/* Mobile Image Card */}
        <div className="lg:hidden block w-full">
          <ImageCard isMobile={true} />
        </div>

        {/* Mobile Tabs Section */}
        <div className="block lg:hidden w-full border-b border-gray-200 px-4 sm:px-8 md:px-12 mb-4">
          <Tabs />
        </div>

        {/* Table Section */}
        <div className="w-full lg:max-w-[998px] mt-4">
          <InviteTable type={activeTab} />
        </div>

        {/* Desktop Image Card */}
        <div className="hidden lg:block">
          <ImageCard isMobile={false} />
        </div>
      </div>
    </div>
  );
};

export default Invite;