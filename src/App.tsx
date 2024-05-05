import { Toaster } from "react-hot-toast"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ModalProvider, RouteNavigate } from "./provider"

function App() {
  return (
    <>
      <RouteNavigate />
      <ModalProvider />
      <Toaster />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
