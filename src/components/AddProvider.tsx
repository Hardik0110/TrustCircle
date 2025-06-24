import { CloseCircle, Edit2 } from "iconsax-reactjs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddProvider = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="h-full bg-white z-50 w-[500px] md:w-[500px] w-full fixed right-0 top-0 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex justify-between p-4 bg-[#F8F5F0]">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Recommend a Service Provider</h1>
            <h5 className="text-md text-gray-500">
              Recommend professional service providers whose services you truly value
            </h5>
          </div>
          <CloseCircle
            size="24"
            color="#1C6C41"
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="border-b p-4">
            <span className="text-gray-500">Add details for</span>
            <button className="text-s text-black border border-[#1C6C41] rounded-full p-2 ml-2 cursor-pointer">
              Catering <Edit2 size={22} color="#1C6C41" className="inline" />
            </button>
          </div>

          {/* Name Field */}
          <div className="flex flex-col gap-2 mt-6">
            <p className="text-xs text-gray-500 ml-4">Service Provider's Name</p>
            <input
              type="text"
              placeholder="ex. Bolt electrical services"
              className="border border-gray-300 rounded-full p-2"
            />
          </div>

          {/* Phone Field */}
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-xs text-gray-500 ml-4">Phone Number</p>
            <PhoneInput
              country={"in"}
              enableSearch
              inputStyle={{
                width: "100%",
                borderRadius: "9999px",
                paddingLeft: "58px", // enough space for flag
                height: "40px",
                borderColor: "#d1d5db",
              }}
              buttonStyle={{
                borderTopLeftRadius: "9999px",
                borderBottomLeftRadius: "9999px",
                backgroundColor: "#fff",
                borderColor: "#d1d5db",
              }}
              containerStyle={{ width: "100%" }}
            />
          </div>


          {/* Note Field */}
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-xs text-gray-500 ml-4">Add Note (optional)</p>
            <textarea
              rows={3}
              placeholder="Add a quick note on why you recommending them"
              className="border border-gray-300 rounded-xl p-2 resize-none w-full"
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 px-4 py-4 bg-[#F8F5F0]">
        <button className="px-4 py-2 border bg-white border-[#1C6C41] text-[#1C6C41] rounded-full text-sm font-bold">
          Save & Add Another
        </button>
        <button className="px-4 py-2 bg-[#1C6C41] text-white rounded-full text-sm font-bold">
          Review & Submit &gt;
        </button>
      </div>
    </div>
  );
};

export default AddProvider;