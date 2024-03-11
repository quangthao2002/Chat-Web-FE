import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

// useContext giúp chúng ta truy cập vào giá trị của AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
}
//AuthContext được tạo ra để chia sẻ dữ liệu xác thực người dùng qua các component.
//  AuthContextProvider là một component bao bọc cung cấp giá trị cho AuthContext.
//  Các component con của AuthContextProvider có thể sử dụng Hook useContext để truy cập vào giá trị của AuthContext
export const AuthContextProvider = ({ children }) => {
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("tokens-user")) || null)
    return (
        <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}