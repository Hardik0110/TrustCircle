import { useEffect, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Edit, LogoutCurve } from 'iconsax-reactjs';

const EditProfile = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe123@gmail.com');
  const [hasPhoto, setHasPhoto] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);


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

  const handleVerifyAndSave = () => {
    setIsEditing(false);
    setShowOtp(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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

  // Mobile Component
  const MobileView = () => (
    <div className="w-full h-screen bg-[#F8F5F0] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-3 py-3 flex-shrink-0">
        <h1 className="text-base font-semibold text-gray-800">
          {isEditing ? 'Edit Profile Details' : 'My Profile'}
        </h1>
        <div className="flex items-center">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-black font-semibold hover:underline text-sm"
            >
             <Edit size={14} color='#1C6C41' className='inline mr-1'/> Edit 
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-3 flex-1 overflow-y-auto">
        <div className="w-full bg-white rounded-xl shadow border relative pb-4 overflow-hidden min-h-0">
          {/* Green Header */}
          <div className="bg-[#E8FA92] rounded-t-xl h-16 w-full" />

          {/* Profile Photo */}
          <div
            className="absolute top-8 left-3 w-12 h-12 rounded-full border-2 border-white bg-green-200 overflow-hidden z-10
                       flex items-center justify-center text-xs font-semibold text-gray-700"
          >
            {hasPhoto ? 'Photo' : ''}
            {isEditing && (
              <button
                className="absolute -bottom-0.5 -right-1 bg-white border rounded-full p-0.5 shadow"
                onClick={handleAddPhoto}
              >
                <Plus size={10} className="text-green-700" />
              </button>
            )}
          </div>

          {/* Remove Photo */}
          {isEditing && (
            <div className="absolute top-16 left-16">
              <button
                onClick={handleRemovePhoto}
                className="flex items-center gap-1 text-green-700 text-xs font-medium hover:underline whitespace-nowrap"
              >
                <Trash2 size={10} />
                Remove
              </button>
            </div>
          )}

          {/* Inputs */}
          <div className="px-3 pt-16 pb-4">
            <label className="block text-xs text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              disabled={!isEditing}
              onChange={(e) => setName(e.target.value)}
              className={`w-full mb-3 px-3 py-2 text-sm rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-700 ${
                !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />

            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  disabled={!isEditing}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pr-14 px-3 py-2 text-sm rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-700 ${
                    !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
                {isEditing && (
                  <button
                    className="px-6 py-3 bg-[#1C6C41] text-white font-semibold rounded-full hover:bg-opacity-90 text-base"
                    onClick={() => {
                      setIsEditing(false);
                      setShowOtp(false);
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                    }}
                  >
                    {showOtp ? 'Verify & Save' : 'Save Changes'}
                  </button>
                )}
              </div>
            </div>

            {/* OTP Section */}
            {isEditing && showOtp && (
              <div className="mt-3">
                <p className="text-xs text-gray-700 mb-2 leading-relaxed">
                  Enter OTP sent to <strong className="break-words">{email}</strong>
                </p>
                <div className="flex gap-1.5 justify-start mt-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-8 h-8 text-center rounded-full bg-[#F8F5F0] text-sm flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      {!isEditing ? (
        <div className="px-3 py-3 flex justify-start flex-shrink-0">
          <button className="flex items-center gap-2 text-gray-600 font-semibold rounded-full hover:bg-gray-100 px-3 py-2">
            <LogoutCurve size={16} className="inline" color="gray" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-end gap-2 px-3 py-3 border-t border-gray-200 flex-shrink-0">
          <button
            className="px-3 py-2 border border-gray-300 text-gray-700 bg-white font-semibold rounded-full hover:bg-gray-100 text-sm"
            onClick={() => {
              setIsEditing(false);
              setShowOtp(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 bg-[#1C6C41] text-white font-semibold rounded-full hover:bg-opacity-90 text-sm"
            onClick={handleVerifyAndSave}
          >
            {showOtp ? 'Verify & Save' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );

  // Desktop Component
  const DesktopView = () => (
    <div className="w-full max-w-[500px] h-screen bg-[#F8F5F0] flex flex-col z-50 shadow-xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {isEditing ? 'Edit Profile Details' : 'My Profile'}
        </h1>
        <div className="flex items-center">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-black font-semibold hover:underline text-base mr-4"
            >
             <Edit size={18} color='#1C6C41' className='inline mr-1'/> Edit 
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6">
        <div className="w-full bg-white rounded-xl shadow border relative pb-4">
          {/* Green Header */}
          <div className="bg-[#E8FA92] rounded-t-xl h-[68px]" />

          {/* Profile Photo */}
          <div
            className="absolute top-[40px] left-4 w-[96px] h-[96px] rounded-full border-2 border-white bg-green-200 overflow-hidden z-10
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
            <div className="absolute top-[88px] left-[112px]">
              <button
                onClick={handleRemovePhoto}
                className="flex items-center gap-1 text-green-700 text-sm font-medium hover:underline"
              >
                <Trash2 size={14} />
                Remove Photo
              </button>
            </div>
          )}

          {/* Inputs */}
          <div className="p-4 pt-20">
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
                  className={`w-full pr-24 px-4 py-2 text-sm rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-700 ${
                    !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
                {isEditing && (
                  <button
                    onClick={() => setShowOtp(true)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-green-700 text-sm font-medium hover:underline"
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
                  Please enter the OTP sent to <strong>{email}</strong> to see my recommendations I've personally shared.
                </p>
                <div className="flex gap-3 justify-start mt-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-[48px] h-[48px] text-center rounded-full bg-[#F8F5F0] text-lg"
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
        <div className="p-6 flex justify-start">
          <button className="flex items-center gap-2 text-gray-600 font-semibold rounded-full hover:bg-gray-100 px-4 py-2">
            <LogoutCurve size={20} className="inline" color="gray" />
            <span className="text-base">Logout</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            className="px-6 py-3 border border-gray-300 text-gray-700 bg-white font-semibold rounded-full hover:bg-gray-100 text-base"
            onClick={() => {
              setIsEditing(false);
              setShowOtp(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-[#1C6C41] text-white font-semibold rounded-full hover:bg-opacity-90 text-base"
            onClick={handleVerifyAndSave}
          >
            {showOtp ? 'Verify & Save' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="relative h-full">
    <div className="block sm:hidden">
      <MobileView />
    </div>
    <div className="hidden sm:block">
      <DesktopView />
    </div>
    {showToast && (
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow-md z-50">
        Your profile details have been updated
      </div>
    )}
  </div>
  );
};

export default EditProfile;