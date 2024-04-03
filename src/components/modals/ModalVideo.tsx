import useModalVideoCall from "@/hooks/video/useVideoCall"
import Room from "../video/Room"

const ModalVideo = () => {
  const { isOpen } = useModalVideoCall()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 w-full h-full">
      <Room />
    </div>
  )
}

export default ModalVideo
