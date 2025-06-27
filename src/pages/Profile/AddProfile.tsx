import { useEffect, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Edit, LogoutCurve } from 'iconsax-reactjs';

interface EditProfileProps {
  onClose: () => void;
}

const EditProfile = ({ onClose }: EditProfileProps) => {
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

  const handleCancel = () => {
    setIsEditing(false);
    setShowOtp(false);
  };

  const handleSaveChanges = () => {
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

  const ProfilePhoto = ({ size }: { size: 'small' | 'large', isMobile: boolean }) => {
    const sizeClasses = size === 'small' ? 'w-12 h-12 top-8 left-3' : 'w-[96px] h-[96px] top-[40px] left-4';
    const iconSize = size === 'small' ? 10 : 14;
    const buttonPosition = size === 'small' ? '-bottom-0.5 -right-1' : '-bottom-1.5 -right-2';
    
    return (
      <div className={`absolute ${sizeClasses} rounded-full border-2 border-white bg-green-200 overflow-hidden z-10 flex items-center justify-center ${size === 'small' ? 'text-xs' : 'text-sm'} font-semibold text-gray-700`}>
        {hasPhoto ? 'Photo' : ''}
        {isEditing && (
          <button
            className={`absolute ${buttonPosition} bg-white border rounded-full p-0.5 shadow`}
            onClick={handleAddPhoto}
          >
            <Plus size={iconSize} className="text-green-700" />
          </button>
        )}
      </div>
    );
  };

  const RemovePhotoButton = ({ isMobile }: { isMobile: boolean }) => {
    if (!isEditing) return null;
    
    const position = isMobile ? 'top-16 left-16' : 'top-[88px] left-[112px]';
    const iconSize = isMobile ? 10 : 14;
    const text = isMobile ? 'Remove' : 'Remove Photo';
    
    return (
      <div className={`absolute ${position}`}>
        <button
          onClick={handleRemovePhoto}
          className={`flex items-center gap-1 text-green-700 ${isMobile ? 'text-xs' : 'text-sm'} font-medium hover:underline ${isMobile ? 'whitespace-nowrap' : ''}`}
        >
          <Trash2 size={iconSize} />
          {text}
        </button>
      </div>
    );
  };

  const InputField = ({ 
    label, 
    type, 
    value, 
    onChange, 
    showVerifyBtn = false, 
    isMobile 
  }: { 
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    showVerifyBtn?: boolean;
    isMobile: boolean;
  }) => {
    const inputClasses = `w-full ${showVerifyBtn ? (isMobile ? 'pr-14' : 'pr-24') : ''} ${isMobile ? 'px-3 py-2' : 'px-4 py-2'} text-sm rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-700 ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`;
    
    return (
      <div className={isMobile ? 'mb-3' : 'mb-4'}>
        <label className={`block ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mb-1`}>{label}</label>
        <div className="relative">
          <input
            type={type}
            value={value}
            disabled={!isEditing}
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
          />
          {isEditing && showVerifyBtn && !isMobile && (
            <button
              onClick={() => setShowOtp(true)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-green-700 text-sm font-medium hover:underline"
            >
              Verify
            </button>
          )}
        </div>
      </div>
    );
  };

  const OTPSection = ({ isMobile }: { isMobile: boolean }) => {
    if (!isEditing || !showOtp) return null;
    
    const inputSize = isMobile ? 'w-8 h-8' : 'w-[48px] h-[48px]';
    const textSize = isMobile ? 'text-sm' : 'text-lg';
    const description = isMobile 
      ? <p className="text-xs text-gray-700 mb-2 leading-relaxed">Enter OTP sent to <strong className="break-words">{email}</strong></p>
      : <p className="text-sm text-gray-700 mb-2">Please enter the OTP sent to <strong>{email}</strong> to see my recommendations I've personally shared.</p>;
    
    return (
      <div className={isMobile ? 'mt-3' : 'mt-6'}>
        {description}
        <div className={`flex ${isMobile ? 'gap-1.5' : 'gap-3'} justify-start ${isMobile ? 'mt-2' : 'mt-3'}`}>
          {otp.map((digit, index) => (
            <input
              key={index}
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className={`${inputSize} text-center rounded-full bg-[#F8F5F0] ${textSize} flex-shrink-0`}
            />
          ))}
        </div>
      </div>
    );
  };

  const EditButton = ({ isMobile }: { isMobile: boolean }) => {
    if (isEditing) return null;
    
    return (
      <button
        onClick={() => setIsEditing(true)}
        className={`text-black font-semibold hover:underline ${isMobile ? 'text-sm' : 'text-base mr-4'}`}
      >
        <Edit size={isMobile ? 14 : 18} color='#1C6C41' className='inline mr-1'/> Edit 
      </button>
    );
  };

  const LogoutButton = ({ isMobile }: { isMobile: boolean }) => {
    if (isEditing) return null;
    
    return (
      <button className={`flex items-center gap-2 text-gray-600 font-semibold rounded-full hover:bg-gray-100 ${isMobile ? 'px-3 py-2' : 'px-4 py-2'}`}>
        <LogoutCurve size={isMobile ? 16 : 20} className="inline" color="gray" />
        <span className={isMobile ? 'text-sm' : 'text-base'}>Logout</span>
      </button>
    );
  };

  const ActionButtons = ({ isMobile }: { isMobile: boolean }) => {
    if (!isEditing) return null;
    
    return (
      <div className={`flex justify-end gap-${isMobile ? '2' : '3'} ${isMobile ? 'px-3 py-3' : 'p-6'} border-t border-gray-200 flex-shrink-0`}>
        <button
          className={`${isMobile ? 'px-3 py-2' : 'px-6 py-3'} border border-gray-300 text-gray-700 bg-white font-semibold rounded-full hover:bg-gray-100 ${isMobile ? 'text-sm' : 'text-base'}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={`${isMobile ? 'px-3 py-2' : 'px-6 py-3'} bg-[#1C6C41] text-white font-semibold rounded-full hover:bg-opacity-90 ${isMobile ? 'text-sm' : 'text-base'}`}
          onClick={handleVerifyAndSave}
        >
          {showOtp ? 'Verify & Save' : 'Save Changes'}
        </button>
      </div>
    );
  };

  const MobileView = () => (
    <div className="w-full h-screen bg-[#F8F5F0] flex flex-col overflow-hidden">
      <div className="flex justify-between items-center px-3 py-3 flex-shrink-0">
        <h1 className="text-base font-semibold text-gray-800">
          {isEditing ? 'Edit Profile Details' : 'My Profile'}
        </h1>
        <div className="flex items-center">
          <EditButton isMobile={true} />
        </div>
      </div>

      <div className="px-3 flex-1 overflow-y-auto">
        <div className="w-full bg-white rounded-xl shadow border relative pb-4 overflow-hidden min-h-0">
          <div className="bg-[#E8FA92] rounded-t-xl h-16 w-full" />
          <ProfilePhoto size="small" isMobile={true} />
          <RemovePhotoButton isMobile={true} />

          <div className="px-3 pt-16 pb-4">
            <InputField 
              label="Name" 
              type="text" 
              value={name} 
              onChange={setName} 
              isMobile={true}
            />
            
            <div className="mb-3">
              <InputField 
                label="Email" 
                type="email" 
                value={email} 
                onChange={setEmail} 
                showVerifyBtn={true} 
                isMobile={true}
              />
              {isEditing && (
                <button
                  className="px-6 py-3 bg-[#1C6C41] text-white font-semibold rounded-full hover:bg-opacity-90 text-base"
                  onClick={handleSaveChanges}
                >
                  {showOtp ? 'Verify & Save' : 'Save Changes'}
                </button>
              )}
            </div>

            <OTPSection isMobile={true} />
          </div>
        </div>
      </div>

      {!isEditing ? (
        <div className="px-3 py-3 flex justify-start flex-shrink-0">
          <LogoutButton isMobile={true} />
        </div>
      ) : (
        <ActionButtons isMobile={true} />
      )}
    </div>
  );

  const DesktopView = () => (
    <div className="w-full max-w-[500px] h-screen bg-[#F8F5F0] flex flex-col z-50 shadow-xl mx-auto">
      <div className="flex justify-between items-center p-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {isEditing ? 'Edit Profile Details' : 'My Profile'}
        </h1>
        <div className="flex items-center">
          <EditButton isMobile={false} />
        </div>
      </div>

      <div className="px-6">
        <div className="w-full bg-white rounded-xl shadow border relative pb-4">
          <div className="bg-[#E8FA92] rounded-t-xl h-[68px]" />
          <ProfilePhoto size="large" isMobile={false} />
          <RemovePhotoButton isMobile={false} />

          <div className="p-4 pt-20">
            <InputField 
              label="Name" 
              type="text" 
              value={name} 
              onChange={setName} 
              isMobile={false}
            />
            
            <InputField 
              label="Email" 
              type="email" 
              value={email} 
              onChange={setEmail} 
              showVerifyBtn={true} 
              isMobile={false}
            />

            <OTPSection isMobile={false} />
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {!isEditing ? (
        <div className="p-6 flex justify-start">
          <LogoutButton isMobile={false} />
        </div>
      ) : (
        <ActionButtons isMobile={false} />
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