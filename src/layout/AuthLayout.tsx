import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F5F0] ">
      <Outlet />
    </div>
  )
}

export default AuthLayout
