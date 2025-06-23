import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";

const MainLayout = () => {
  const { pathname } = useLocation();
  const hideHeaderRoutes = ["/otp-verification", "/forgot-password"];

  return (
    <div className="flex flex-col h-screen bg-[#F8F5F0]">
      <div className="w-full max-w-[1440px] mx-auto md:px-4 flex flex-col flex-1">
        {/* fixed headers */}
        {!hideHeaderRoutes.includes(pathname) && <Header />}

        {/* scrollable content */}
        <main className="flex-1 overflow-y-auto py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
