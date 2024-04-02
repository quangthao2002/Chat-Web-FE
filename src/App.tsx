import { Toaster } from "react-hot-toast"
import { ModalProvider, RouteNavigate } from "./provider"

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
