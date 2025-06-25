import React, { useState } from 'react';
import { Add, CloseCircle, Send2, SmsStar, TickCircle } from 'iconsax-reactjs';

interface Invite {
  name: string;
  email: string;
}

const SendInvite = ({ onClose }: { onClose: () => void }) => {
  const [invites, setInvites] = useState<Invite[]>([{ name: '', email: '' }]);
  const [showNameAsGuide, setShowNameAsGuide] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleAddInvite = () => {
    setInvites([...invites, { name: '', email: '' }]);
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof Invite;
    const newInvites = [...invites];
    newInvites[index][key] = value;
    setInvites(newInvites);
  };

  const handleRemoveInvite = (index: number) => {
    const newInvites = invites.filter((_, i) => i !== index);
    setInvites(newInvites);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleGoBackToMyCircle = () => {
    setShowSuccessModal(false);
  };

  const handleTrackInvitations = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] h-full flex flex-col border border-gray-200 relative">
        {showSuccessModal ? (
          <div className="p-6 text-center h-full flex flex-col justify-center">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <CloseCircle size="24" />
            </button>

            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative w-24 h-24 mb-4">
                <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                  <TickCircle size={64} className="text-[#1C6C41]" strokeWidth={1.5}/>
                </div>
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

            <div className="flex flex-col gap-3">
              <button
                onClick={handleGoBackToMyCircle}
                className="w-full px-6 py-3 bg-[#1C6C41] text-white font-semibold rounded-full hover:bg-opacity-90 transition duration-150 ease-in-out"
              >
                Go back to My Circle
              </button>
              <button
                onClick={handleTrackInvitations}
                className="w-full px-6 py-3 text-[#1C6C41] font-semibold rounded-full hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                Track Invitations
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-6 bg-[#F8F5F0] pb-0">
              <h2 className="text-xl font-semibold text-gray-800">Invite to your circle</h2>
              <div className="flex items-center gap-3">
                <span className="flex items-center text-sm font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                  <SmsStar size="16" className="mr-1 text-gray-500" />
                  5 Invite
                </span>
                <button 
                  className="text-gray-400 hover:text-gray-600" 
                  onClick={onClose}
                  type="button"
                >
                  <CloseCircle size="24" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed bg-[#F8F5F0] p-4">
              When you invite someone, TrustCircle shares 5 trusted pros from your network to help them start.
            </p>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
              {invites.map((invite, index) => (
                <div key={index} className="mb-4 bg-[#F8F5F0] p-4 rounded-md relative">
                  {invites.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveInvite(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 rounded-full p-1"
                      aria-label="Remove invite field"
                    >
                      <CloseCircle size="20" />
                    </button>
                  )}
                  <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id={`name-${index}`}
                    name="name"
                    placeholder="Enter full name"
                    value={invite.name}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white focus:ring-[#1C6C41] focus:border-[#1C6C41] mb-3"
                    required
                  />
                  <label htmlFor={`email-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id={`email-${index}`}
                    name="email"
                    placeholder="Enter email"
                    value={invite.email}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white focus:ring-[#1C6C41] focus:border-[#1C6C41]"
                    required
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddInvite}
                className="flex items-center justify-center px-4 py-2 border border-[#1C6C41] text-[#1C6C41] font-semibold rounded-full hover:bg-[#F2F7F4] self-start mb-6"
              >
                <Add size="20" className="mr-2" /> Invite More
              </button>
            </form>

            <label className="flex items-center text-sm text-gray-700 p-4">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-[#1C6C41] rounded border-gray-300 focus:ring-[#1C6C41] mr-2"
                checked={showNameAsGuide}
                onChange={() => setShowNameAsGuide(!showNameAsGuide)}
              />
              Show your name as a guide to help the invitee complete onboarding.
            </label>

            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-[#F8F5F0]">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 bg-white font-semibold rounded-full hover:bg-gray-100"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 flex items-center bg-[#1C6C41] text-white font-semibold rounded-full hover:bg-opacity-90"
                onClick={handleSubmit}
              >
                Send Invite <Send2 size="16" className="ml-2" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SendInvite;