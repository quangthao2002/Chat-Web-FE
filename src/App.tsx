import { Toaster } from "react-hot-toast"
import { ModalProvider, RouteNavigate } from "./provider"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <RouteNavigate />
      <ModalProvider />
      <Toaster />
      <ToastContainer />
    </>
  )
}

export default App
