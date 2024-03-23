import { Toaster } from "react-hot-toast"
import { ModalProvider, RouteNavigate } from "./provider"

function App() {
  return (
    <div>
      <RouteNavigate />
      <ModalProvider />
      <Toaster />
    </div>
  )
}

export default App
