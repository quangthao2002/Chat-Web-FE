import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { AuthContextProvider } from "./context/AuthContext.jsx"
// import { VideoProvider } from "./context/VideoProvider.tsx"
import { BrowserRouter } from "react-router-dom"
import TabProvider from "./context/TabContext.tsx"
import VideoProvider from "./context/VideoContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TabProvider>
          <VideoProvider>
            <App />
          </VideoProvider>
        </TabProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
