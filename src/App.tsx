import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import AuthLayout from "./Layout/AuthLayout"
import MainPage from "./pages/Recommendations/MainPage"
import ForgotPasswordEmail from "./pages/Auth/ForgotPasswordEmail"
import OtpVerification from "./pages/Auth/OtpVerification"

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with main layout */}
        <Route element={<MainLayout />}>
          <Route path="/recommendations" element={<MainPage />} />
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
