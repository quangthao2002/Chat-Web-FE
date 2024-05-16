import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import { AuthContextProvider } from "./context/AuthContext"
import { ChatbotProvider } from "./context/ConversationChatbotContext.jsx"
import { ModalProvider } from "./context/ModalContext.tsx"
import { SidebarProvider } from "./context/SideBarContext.tsx"
import TabProvider from "./context/TabContext"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TabProvider>
          <ModalProvider>
            <SidebarProvider>
              <ChatbotProvider>
                <App />
              </ChatbotProvider>
            </SidebarProvider>
          </ModalProvider>
        </TabProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)
