import { AddSquare, Lock, Send2 } from "iconsax-reactjs";
import { useState } from "react";
import AddRecommendations from "./AddRecommendations"; // Import the drawer

export default function CircularFabMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddRecommendations, setShowAddRecommendations] = useState(false); // Drawer state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay for FAB menu */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* AddRecommendations Drawer */}
      {showAddRecommendations && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowAddRecommendations(false)}
          />
          <AddRecommendations onClose={() => setShowAddRecommendations(false)} />
        </>
      )}

      <div className="fixed bottom-25 right-2 flex flex-col items-end md:hidden z-50 ">
        {/* Menu buttons */}
        <div
          className={`flex flex-col items-end transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <button
            className="p-2 h-10 bg-white rounded-full flex items-center justify-center text-black font-semibold mb-3 shadow-lg transition-colors"
            onClick={() => {
              setShowAddRecommendations(true);
              setIsOpen(false);
            }}
          >
            Recommendations
            <AddSquare size="20" color="black" className="ml-2" />
          </button>
          <button className="p-2 h-10 bg-white rounded-full flex items-center justify-center text-black font-semibold mb-3 shadow-lg  transition-colors">
            Ask Your Circle
            <Lock size="20" color="black" className="ml-2" />
          </button>
          <button className="p-2 h-10 bg-white rounded-full flex items-center justify-center text-black font-semibold mb-3 shadow-lg  transition-colors">
            Send Invite
            <Send2 size="20" color="black" className="ml-2" />
          </button>
        </div>

        {/* Main FAB button */}
        <button
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