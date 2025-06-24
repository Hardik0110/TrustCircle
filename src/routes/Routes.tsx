import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import AuthLayout from "../layout/AuthLayout"
import Index from "../pages/Recommendations/Index"
import MyCircle from "../pages/MyCircle/Index"
import ForgotPasswordEmail from "../pages/Auth/ForgotPasswordEmail"
import OtpVerification from "../pages/Auth/OtpVerification"
import Requests from "../pages/Requests/Index"
import Invite from "@/pages/Invite/Index"

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with main layout */}
        <Route element={<MainLayout />}>
          <Route path="/recommendations" element={<Index />} />
          <Route path="/mycircle" element={<MyCircle />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/invite" element={<Invite />} />
        </Route>

        {/* Routes with auth layout */}
        <Route element={<AuthLayout />}>
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/forgot-password" element={<ForgotPasswordEmail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
