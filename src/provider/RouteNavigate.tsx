import { useAuthContext } from "@/context/AuthContext"
import { HomePage, LoginPage } from "@/pages"
import { Route, Routes } from "react-router-dom"

const RouteNavigate = () => {
  const { authUser } = useAuthContext()

  return (
    <Routes>
      <Route path="*" element={authUser ? <HomePage /> : <LoginPage />} />
    </Routes>
  )
}

export default RouteNavigate
