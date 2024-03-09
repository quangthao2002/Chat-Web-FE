import { HomePage, LoginPage } from "@/pages"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

const RouteNavigate = () => {
  return <RouterProvider router={router} />
}

export default RouteNavigate
