import RecommendationTable from "@/components/Table"

const ForgotPasswordEmail = () => {
  return (
    <div className="flex items-center justify-center h-[1044px] bg-[#F8F5F0] px-4">
      <div className="w-full max-w-[600px] bg-white rounded-md shadow space-y-4">
        {/* Header Image */}
        <img
          src="src/assets/headerimage.png"
          alt="TrustCircle Banner"
          className="w-[600px] h-[122px]"
        />

        {/* Greeting */}
        <div className="text-sm text-gray-800 p-5 mb-0 pb-0">
          <p className="text-[16px]">Hi Tom,</p>
          <p className="mt-3">
            I use TrustCircle to keep track of service providers I actually trust - so I never have to rely on random searches or questionable reviews.
          </p>
          <p className="mt-3">
            I’ve added you to my trusted network of service providers here:<br />
            <a href="" className="text-green-600 font-semibold underline">
              www.trustcircle.com/markshaw
            </a>
          </p>
          <p className="mt-3">You’ll see service providers I’ve personally shared, like:</p>
        </div>

        {/* Table */}
        <div className="p-6 mt-[-20px]">
          <div className="w-[536px] h-[320px] rounded-md overflow-hidden  mt-3">
            <RecommendationTable  showCategory={true} showPhone={true} showRecommendedBy={false} showNotes={false} showRecommends={false} showEmail={false} showConnectedOn={false}/>
          </div>

          {/* CTA and OTP */}
          <div className="flex items-center mt-5 w-full">
            <button className="bg-[#1C6C41] w-[260px] h-[56px] text-white px-6 py-2 rounded-full font-medium">
              Join TrustCircle
            </button>
            <div className="flex items-start ml-4 text-sm text-gray-700 flex-col">
              <span>Verify your email with this OTP</span>
              <div className="flex gap-1 mt-1">
                {["5", "4", "3", "3"].map((digit, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-[#F8F5F0] flex items-center justify-center text-sm font-bold"
                  >
                    {digit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-600 mt-6">
            Since invites are limited, I wanted to make sure you got one. <br />
            Hope this is useful!
            <br />
            <br />
            Mark
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordEmail
