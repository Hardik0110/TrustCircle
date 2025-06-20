import { Outlet, useLocation } from "react-router-dom"
import Header from "@/components/Header"

const MainLayout = () => {
  const { pathname } = useLocation()
  const hideHeaderRoutes = ["/otp-verification", "/forgot-password"]

  return (
    <div className="bg-[#F8F5F0] min-h-screen">
      <div className="w-full max-w-[1440px] mx-auto md:px-4  flex flex-col gap-6">
        {!hideHeaderRoutes.includes(pathname) && <Header />}
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
