import { CheckCircle, X } from "lucide-react";
import React, { useCallback } from "react";

interface InviteSuccessModalProps {
  onClose: () => void;
  onGoBackToMyCircle: () => void;
  onTrackInvitations: () => void;
}

const ModalButton = ({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full px-6 py-3 font-semibold rounded-full transition duration-150 ease-in-out ${
      primary
        ? "bg-[#1C6C41] text-white hover:bg-opacity-90"
        : "text-[#1C6C41] hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);

const InviteSuccessModal: React.FC<InviteSuccessModalProps> = ({
  onClose,
  onGoBackToMyCircle,
  onTrackInvitations,
}) => {
  const handleClose = useCallback(onClose, [onClose]);
  const handleBack = useCallback(onGoBackToMyCircle, [onGoBackToMyCircle]);
  const handleTrack = useCallback(onTrackInvitations, [onTrackInvitations]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="relative w-full max-w-[400px] bg-white rounded-lg shadow-xl p-6 text-center">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="relative mb-6 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={64} className="text-[#1C6C41]" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-0 z-[-1] opacity-50">
              <svg width="100%" height="100%">
                <pattern
                  id="pattern-grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="#E0E0E0"
                    strokeWidth="1"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern-grid)" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Success! Your Network Just Got Stronger
          </h2>
          <p className="text-sm text-gray-600">
            You've successfully sent invitation to 5 people to your trusted network.
          </p>
        </div>

        <div className="bg-gray-50 rounded-md p-4 text-left mb-8">
          <h3 className="font-semibold text-gray-800 mb-2">What's Next?</h3>
          <ul className="space-y-2">
            {[
              "Once accepted, you can start requesting recommendations.",
              "Invites expire in 7 days, and credits are restored.",
            ].map(text => (
              <li key={text} className="flex items-start text-sm text-gray-700">
                <span className="flex-shrink-0 w-4 h-4 rounded-full border border-gray-400 mr-2 mt-1" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <ModalButton primary onClick={handleBack}>
            Go back to My Circle
          </ModalButton>
          <ModalButton onClick={handleTrack}>
            Track Invitations
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

export default InviteSuccessModal;
