import {
  CloseCircle,
  MoreCircle,
  ProfileTick,
  SmsStar,
  UserCirlceAdd,
} from "iconsax-reactjs";
import { CardHeader } from "./ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import CircularFabMenu from "./CategoryFabMenu";
import { useState, useCallback } from "react";
import AddProfile from "@/pages/Profile/AddProfile";

const NAV_ITEMS = [
  { icon: ProfileTick, label: "Recommendations", width: "w-[219px]", path: "/recommendations" },
  { icon: MoreCircle, label: "MyCircle", width: "w-[141px]", path: "/mycircle" },
  { icon: UserCirlceAdd, label: "Requests", width: "w-[144px]", path: "/requests" },
];

const Mobile_NAV = [
  { icon: ProfileTick, label: "Rec", path: "/recommendations" },
  { icon: MoreCircle, label: "MyCircle", path: "/mycircle" },
  { icon: UserCirlceAdd, label: "Requests", path: "/requests" },
];

type NavButtonProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  width: string;
  active: boolean;
  onClick: () => void;
};

const NavButton = ({ Icon, label, width, active, onClick }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 justify-center h-[40px] text-sm font-medium transition-all duration-200 ${width} ${
      active
        ? "bg-[#1C6C41] text-[#E9FF95] rounded-full"
        : "text-gray-400 hover:bg-[#1C6C41] hover:text-[#E9FF95] hover:rounded-full"
    }`}
  >
    <Icon className="h-6 w-6" />
    {label}
  </button>
);

type MobileNavButtonProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active: boolean;
  onClick: () => void;
};

const MobileNavButton = ({ Icon, label, active, onClick }: MobileNavButtonProps) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center text-xs rounded-lg p-2 transition-all duration-200 ${
      active
        ? "bg-[#1C6C41] text-[#E9FF95]"
        : "text-white hover:bg-[#1C6C41] hover:text-[#E9FF95]"
    }`}
  >
    <Icon className="h-6 w-6" />
    {label}
  </button>
);

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  interface GoToFunction {
    (path: string): void;
  }

  const goTo: GoToFunction = useCallback((path: string) => navigate(path), [navigate]);
  const toggleProfile = useCallback(() => setProfileOpen(open => !open), []);
  const closeProfile = useCallback(() => setProfileOpen(false), []);

  return (
    <>
      <CardHeader className="w-full h-[72px] bg-[#17321F] p-4 sticky top-0 z-50 flex items-center justify-between rounded-none md:rounded-full md:mx-4 md:mt-4">
        <div className="flex items-center">
          <img src="src/assets/Ellipse.png" alt="Logo" className="h-8 w-8" />
          <span className="ml-3 text-white font-bold text-[20px]">TrustCircle</span>
        </div>

        <nav className="hidden md:flex items-center gap-3">
          {NAV_ITEMS.map(item => (
            <NavButton
              key={item.path}
              Icon={item.icon}
              label={item.label}
              width={item.width}
              active={pathname === item.path}
              onClick={() => goTo(item.path)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavButton
            Icon={SmsStar}
            label="Invites"
            width="w-[110px]"
            active={pathname === "/invite"}
            onClick={() => goTo("/invite")}
          />
          <button
            onClick={toggleProfile}
            className="w-8 h-8 rounded-full bg-[#FDDDE1] flex items-center justify-center text-sm font-bold text-gray-800"
          >
            SA
          </button>
        </div>
      </CardHeader>

      {profileOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={closeProfile} />
          <div className="fixed right-0 top-0 h-full w-[500px] bg-white z-50 shadow-2xl flex flex-col">
            <AddProfile onClose={closeProfile} />
            <button
              type="button"
              onClick={closeProfile}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <CloseCircle size={24} />
            </button>
          </div>
        </>
      )}

      <CircularFabMenu />

      <nav className="fixed bottom-0 left-0 right-0 bg-[#17321F] md:hidden rounded-t-3xl p-3 flex justify-around items-center z-50">
        {Mobile_NAV.map(item => (
          <MobileNavButton
            key={item.path}
            Icon={item.icon}
            label={item.label}
            active={pathname === item.path}
            onClick={() => goTo(item.path)}
          />
        ))}
      </nav>
    </>
  );
};

export default Header;
