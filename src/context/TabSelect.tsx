// import { createContext, useContext, useEffect, useState } from "react"
// import { useLocation } from "react-router-dom"

// export const TabSelectContext = createContext()

// export const useTabSelectContext = () => {
//   return useContext(TabSelectContext)
// }

// export const TabSelectContextProvider = ({ children }) => {
//   const token = JSON.parse(localStorage.getItem("tokens-user")) || null
//   const [TabSelectUser, setTabSelectUser] = useState(token)

//   return <TabSelectContext.Provider value={{ TabSelectUser, setTabSelectUser }}>{children}</TabSelectContext.Provider>
// }
