import { useEffect, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { LogoutCurve } from 'iconsax-reactjs';

const EditProfile = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe123@gmail.com');
  const [hasPhoto, setHasPhoto] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isEditing, setIsEditing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleRemovePhoto = () => setHasPhoto(false);
  const handleAddPhoto = () => setHasPhoto(true);
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[500px] h-screen bg-[#F8F5F0] flex flex-col z-50 shadow-xl mx-auto
                 sm:w-[500px]"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 sm:p-6 pb-4">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          {isEditing ? 'Edit Profile Details' : 'My Profile'}
        </h1>
        <div className="flex items-center gap-3">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-green-700 font-semibold hover:underline text-sm sm:text-base mr-4"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 sm:px-6">
        <div className="w-full bg-white rounded-xl shadow border relative pb-4">
          {/* Green Header */}
          <div className="bg-[#E8FA92] rounded-t-xl h-[68px]" />

          {/* Profile Photo */}
          <div
            className="absolute top-[40px] left-4 w-[72px] h-[72px] sm:w-[96px] sm:h-[96px] rounded-full border-2 border-white bg-green-200 overflow-hidden z-10
                       flex items-center justify-center text-sm font-semibold text-gray-700"
          >
            {hasPhoto ? 'Photo' : ''}
            {isEditing && (
              <button
                className="absolute -bottom-1.5 -right-2 bg-white border rounded-full p-0.5 shadow"
                onClick={handleAddPhoto}
              >
                <Plus size={14} className="text-green-700" />
              </button>
            )}
          </div>

          {/* Remove Photo */}
          {isEditing && (
            <div className="absolute top-[88px] left-[92px] sm:left-[112px]">
              <button
                onClick={handleRemovePhoto}
                className="flex items-center gap-1 text-green-700 text-xs sm:text-sm font-medium hover:underline"
              >
                <Trash2 size={14} />
                Remove Photo
              </button>
            </div>
          )}

          {/* Inputs */}
          <div className="p-4 pt-28 sm:pt-20">
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              disabled={!isEditing}
              onChange={(e) => setName(e.target.value)}
              className={`w-full mb-4 px-4 py-2 text-sm rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-700 ${
                !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  disabled={!isEditing}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pr-20 sm:pr-24 px-4 py-2 text-sm rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-700 ${
                    !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
                {isEditing && (
                  <button
                    onClick={() => setShowOtp(true)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-green-700 text-xs sm:text-sm font-medium hover:underline"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>

            {/* OTP Section */}
            {isEditing && showOtp && (
              <div className="mt-6">
                <p className="text-sm text-gray-700 mb-2">
                  Please enter the OTP sent to <strong>{email}</strong> to see my recommendations I’ve personally shared.
                </p>
                <div className="flex gap-2 sm:gap-3 justify-start mt-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-[40px] sm:w-[48px] h-[40px] sm:h-[48px] text-center rounded-full bg-[#F8F5F0] text-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {/* Footer */}
      {!isEditing ? (
        <div className="p-4 sm:p-6 flex justify-start">
          <button className="flex items-center gap-2 text-gray-600 font-semibold rounded-full hover:bg-gray-100 px-4 py-2">
            <LogoutCurve size={20} className="inline" color="gray" />
            <span className="text-sm sm:text-base">Logout</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-end gap-3 p-4 sm:p-6 border-t border-gray-200">
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 text-gray-700 bg-white font-semibold rounded-full hover:bg-gray-100 text-sm sm:text-base"
            onClick={() => {
              setIsEditing(false);
              setShowOtp(false);
            }}
          >
            Cancel
          </button>
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#1C6C41] text-white font-semibold rounded-full hover:bg-opacity-90 text-sm sm:text-base">
            {showOtp ? 'Verify & Save' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
