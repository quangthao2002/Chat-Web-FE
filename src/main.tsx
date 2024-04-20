import React from "react"
import ReactDOM from "react-dom"
import App from "./App.tsx"
import "./index.css"
import { AuthContextProvider } from "./context/AuthContext"
import { BrowserRouter } from "react-router-dom"
import TabProvider from "./context/TabContext"
import VideoProvider from "./context/VideoContext"
import { SidebarProvider } from "./context/SideBarContext"
import { ModalProvider } from "./context/ModalContext.tsx"
import Chatbot from "./components/chatbot/Chatbot.jsx"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TabProvider>
          <ModalProvider>
            <SidebarProvider>
              <VideoProvider>
                <App />
                <Chatbot />
              </VideoProvider>
            </SidebarProvider>
          </ModalProvider>
        </TabProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)
