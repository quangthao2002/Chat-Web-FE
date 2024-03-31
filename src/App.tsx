import { Toaster } from "react-hot-toast"
import { ModalProvider, RouteNavigate } from "./provider"
// import { VideoProvider } from "./provider/VideoProvider"

function App() {
  return (
    <>
      <RouteNavigate />
      <ModalProvider />
      <Toaster />
    </>
  )
}

export default App
