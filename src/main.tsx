import React from "react"
import ReactDOM from "react-dom"
import App from "./App.tsx"
import "./index.css"
import { AuthContextProvider } from "./context/AuthContext"
import { BrowserRouter } from "react-router-dom"
import TabProvider from "./context/TabContext"
import VideoProvider from "./context/VideoContext"
import { SidebarProvider } from "./context/SideBarContext"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TabProvider>
          <SidebarProvider>
            <VideoProvider>
              <App />
            </VideoProvider>
          </SidebarProvider>
        </TabProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)
