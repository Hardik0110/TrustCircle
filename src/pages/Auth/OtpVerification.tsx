import { Card } from "@/components/ui/card";
import ImageSwitcher from "@/components/ui/imageswitcher";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const OtpVerification = () => {
  const isMobile = useIsMobile();

  return (
    <Card className="w-full max-w-[920px] bg-white shadow-md p-5 rounded-[40px] border border-gray-200">
      <div className={`w-full h-full flex ${isMobile ? "flex-col-reverse" : "flex-row"}`}>
        
        {/* Left Column (Image) */}
        <div className={`${isMobile ? "w-full mt-6 flex justify-center" : "w-full flex items-start justify-start"}`}>
          <ImageSwitcher />
        </div>

        {/* Right Column (OTP Form) */}
        <div className="p-15 flex flex-col justify-start items-start h-full w-full">
          <img src="src/assets/logo.png" alt="" className="h-[26px] w-[134px]" />
          <h1 className="text-[30px] mt-5">Welcome John!</h1>
          <p className="text-[14px] text-gray-500">
            Please enter the OTP sent to <span className="font-bold text-black">johns@gmail.com</span> to see my recommendations I've personally shared
          </p>
          <h3 className="mt-10 text-[14px]">Enter OTP</h3>

          <div className="flex gap-4 mt-3">
            {[...Array(4)].map((_, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 rounded-full bg-[#F8F5F0] border border-[#c0b8aa] text-center text-xl font-semibold outline-none"
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-10 w-full">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <span className="relative w-5 h-5">
                <input
                  type="checkbox"
                  className="appearance-none w-5 h-5 border border-gray-300 rounded-sm bg-white checked:bg-[#1C6C41] checked:border-[#1C6C41] peer"
                />
                <svg
                  className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8L6 11L13 4" />
                </svg>
              </span>
              <span className="text-sm text-gray-500">I accept T&C and Privacy Policy of TrustCircle</span>
            </label>

            <button className="bg-[#1C6C41] rounded-full w-full h-[40px] text-white">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OtpVerification;
