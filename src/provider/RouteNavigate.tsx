import React from "react"
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom"
import { HomePage, LoginPage } from "@/pages"

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
