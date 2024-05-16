// sidebarContext.js
import React, { createContext, useContext, useState } from "react"

interface SidebarContextType {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}
const SidebarContext = createContext({} as SidebarContextType)
export const useSidebarContext = () => useContext(SidebarContext)

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState)
  }

  return <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>{children}</SidebarContext.Provider>
}
