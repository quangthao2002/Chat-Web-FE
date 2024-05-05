/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModalContext } from "@/context/ModalContext"
import Room from "./Room"
import Test from "../test-video/Test"

const ModalVideo = () => {
  const { isModalOpenVideoCall } = useModalContext()

  if (!isModalOpenVideoCall) return null

  return (
    <div className={`fixed inset-0 z-50 w-full h-full`}>
      <Room />
      {/* <Test /> */}
    </div>
  )
}

export default ModalVideo
