import { useAuthContext } from "@/context/AuthContext"
import { HomePage, LoginPage } from "@/pages"
import VerifyEmailPage from "@/pages/VerifyEmailPage"
import { Route, Routes } from "react-router-dom"

const RouteNavigate = () => {
  const { authUser } = useAuthContext()

  return (
    <Routes>
      <Route path="/verify-email" element={authUser ? <HomePage /> : <VerifyEmailPage />} />
      <Route path="*" element={authUser ? <HomePage /> : <LoginPage />} />
    </Routes>
  )
}

export default RouteNavigate
