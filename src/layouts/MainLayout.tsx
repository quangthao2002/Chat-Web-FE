import Categories from "@/components/categories"
import Sidebar from "@/components/sidebar"
import React from "react"

interface IProps {
  children: React.ReactNode
}
const MainLayout = ({ children }: IProps) => {
  return (
    <div className="flex overflow-hidden max-h-screen">
      <Categories />
      <Sidebar />
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  )
}

export default MainLayout
