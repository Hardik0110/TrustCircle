import { AddSquare, Lock, Send2 } from "iconsax-reactjs";
import { useState, useCallback } from "react";
import AddRecommendations from "./AddRecommendations";

const ACTIONS = [
  { label: "Recommendations", icon: <AddSquare size="20" />, action: "recommend" },
  { label: "Ask Your Circle", icon: <Lock size="20" />, action: "ask" },
  { label: "Send Invite", icon: <Send2 size="20" />, action: "invite" },
];

type MenuItemProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const MenuItem = ({ label, icon, onClick }: MenuItemProps) => (
  <button
    type="button"
    className="p-2 h-10 bg-white rounded-full flex items-center justify-center text-black font-semibold mb-3 shadow-lg transition-colors"
    onClick={onClick}
  >
    {label}
    <span className="ml-2">{icon}</span>
  </button>
);

export default function CircularFabMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen(open => !open), []);
  const openDrawer = useCallback(() => {
    setDrawer(true);
    setIsOpen(false);
  }, []);
  const closeDrawer = useCallback(() => setDrawer(false), []);

  return (
    <>
      {/* Overlay for FAB menu */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Drawer */}
      {drawer && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={closeDrawer}
          />
          <AddRecommendations onClose={closeDrawer} />
        </>
      )}

      <div className="fixed bottom-25 right-2 flex flex-col items-end md:hidden z-50">
        {/* Menu Items */}
        <div
          className={`flex flex-col items-end transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {ACTIONS.map(({ label, icon, action }) => (
            <MenuItem
              key={action}
              label={label}
              icon={icon}
              onClick={
                action === "recommend" ? openDrawer : () => setIsOpen(false)
              }
            />
          ))}
        </div>

        {/* Main FAB button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="w-14 h-14 bg-[#1C6C41] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:bg-[#1C6C41] transition-all duration-300 z-10"
        >
          <span
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>
      </div>
    </>
  );
}
