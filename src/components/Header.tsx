import { MoreCircle, ProfileTick, SmsStar, UserCirlceAdd } from "iconsax-reactjs";
import { CardHeader } from "./ui/card";
  import { useLocation, useNavigate } from "react-router-dom";

interface NavButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  width?: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface MobileNavButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, label, width = "auto", isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 h-[40px] justify-center text-sm font-medium transition-all duration-200 ${width} ${
      isActive
        ? "bg-[#1C6C41] text-[#E9FF95] rounded-full"
        : "text-gray-400 hover:bg-[#1C6C41] hover:text-[#E9FF95] hover:rounded-full"
    }`}
  >
    <Icon className="h-6 w-6" />
    {label}
  </button>
);

const MobileNavButton: React.FC<MobileNavButtonProps> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center text-xs rounded-lg p-2 transition-all duration-200 ${
      isActive
        ? "bg-[#1C6C41] text-[#E9FF95]"
        : "text-white hover:bg-[#1C6C41] hover:text-[#E9FF95]"
    }`}
  >
    <Icon className="h-6 w-6" />
    {label}
  </button>
);

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: Array<{ icon: React.ComponentType<{ className?: string }>; label: string; width: string; path: string }> = [
    { icon: ProfileTick, label: "Recommendations", width: "w-[219px]", path: "/recommendations" },
    { icon: MoreCircle, label: "MyCircle", width: "w-[141px]", path: "/mycircle" },
    { icon: UserCirlceAdd, label: "Requests", width: "w-[144px]", path: "/requests" },
  ];

  const mobileNavItems: Array<{ icon: React.ComponentType<{ className?: string }>; label: string; path: string }> = [
    { icon: ProfileTick, label: "Rec", path: "/recommendations" },
    { icon: MoreCircle, label: "MyCircle", path: "/mycircle" },
    { icon: UserCirlceAdd, label: "Requests", path: "/requests" },
  ];

  return (
    <>
      {/* Top Header */}
      <CardHeader className="w-full h-[72px] bg-[#17321F] p-4 sticky top-0 z-50 flex items-center justify-between rounded-none md:rounded-full md:mx-4 md:mt-4">
        {/* Left */}
        <div className="flex items-center">
          <img
            src="src/assets/Ellipse.png"
            alt="TrustCircle Logo"
            className="h-8 w-8"
          />
          <span className="ml-3 text-white font-bold text-[20px]">
            TrustCircle
          </span>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          {navItems.map(({ icon, label, width, path }) => (
            <NavButton
              key={label}
              icon={icon}
              label={label}
              width={width}
              isActive={location.pathname === path}
              onClick={() => navigate(path)}
            />
          ))}
        </nav>

        {/* Right: Visible in all views */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/invites")}
            className="flex items-center gap-2 text-gray-400 hover:bg-[#1C6C41] hover:text-[#E9FF95] px-3 py-1 border border-gray-500 rounded-full text-xs font-medium transition-all duration-200"
          >
            <SmsStar className="h-5 w-5" />
            <span className="hidden sm:block">Invites</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#FDDDE1] flex items-center justify-center text-sm font-bold text-gray-800">
            SA
          </div>
        </div>
      </CardHeader>

      {/* Bottom Nav: Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#17321F] md:hidden rounded-t-3xl p-3 flex justify-around items-center z-50">
        {mobileNavItems.map(({ icon, label, path }) => (
          <MobileNavButton
            key={label}
            icon={icon}
            label={label}
            isActive={location.pathname === path}
            onClick={() => navigate(path)}
          />
        ))}
      </nav>
    </>
  );
};

export default Header;