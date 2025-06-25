import React from 'react';
import { CheckCircle, X } from 'lucide-react'; // Using lucide-react icons

interface InviteSuccessModalProps {
  onClose: () => void;
  onGoBackToMyCircle: () => void; // Optional: Callback for "Go back to My Circle"
  onTrackInvitations: () => void; // Optional: Callback for "Track Invitations"
}

const InviteSuccessModal: React.FC<InviteSuccessModalProps> = ({
  onClose,
  onGoBackToMyCircle,
  onTrackInvitations
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[400px] p-6 text-center relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          <X size="24" />
        </button>

        {/* Success Icon and Message */}
        <div className="flex flex-col items-center justify-center mb-6">
          {/* Green Checkmark Circle */}
          <div className="relative w-24 h-24 mb-4">
            <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={64} className="text-[#1C6C41]" strokeWidth={1.5}/> {/* Increased size, green color */}
            </div>
            {/* Background pattern - mimicking the image */}
            <div className="absolute inset-0 z-[-1] opacity-50">
              <svg width="100%" height="100%">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E0E0E0" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Success! Your Network Just Got Stronger</h2>
          <p className="text-sm text-gray-600">You've successfully sent invitation to 5 people to your trusted network.</p>
        </div>

        {/* What's Next Section */}
        <div className="bg-gray-50 rounded-md p-4 text-left mb-8">
          <h3 className="font-semibold text-gray-800 mb-2">What's Next?</h3>
          <ul className="space-y-2">
            <li className="flex items-start text-sm text-gray-700">
              <span className="flex-shrink-0 w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-xs mr-2 mt-1"></span>
              Once accepted, you can start requesting recommendations.
            </li>
            <li className="flex items-start text-sm text-gray-700">
              <span className="flex-shrink-0 w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-xs mr-2 mt-1"></span>
              Invites expire in 7 days, and credits are restored.
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onGoBackToMyCircle}
            className="w-full px-6 py-3 bg-[#1C6C41] text-white font-semibold rounded-full hover:bg-opacity-90 transition duration-150 ease-in-out"
          >
            Go back to My Circle
          </button>
          <button
            onClick={onTrackInvitations}
            className="w-full px-6 py-3 text-[#1C6C41] font-semibold rounded-full hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            Track Invitations
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteSuccessModal;
