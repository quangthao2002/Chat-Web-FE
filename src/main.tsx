import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { AuthContextProvider } from "./context/AuthContext.jsx"
// import { VideoProvider } from "./context/VideoProvider.tsx"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        {/* <VideoProvider> */}
        <App />
        {/* </VideoProvider> */}
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
