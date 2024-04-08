import useModalVideoCall from "@/hooks/video/useVideoCall"
import { ImPhoneHangUp } from "react-icons/im"
import { IoMdMic } from "react-icons/io"

const VideoControls = () => {
  const { setCloseModal } = useModalVideoCall()

  return (
    <div className="flex items-center gap-5 justify-center p-4">
      <IoMdMic
        onClick={setCloseModal}
        size={43}
        color="#333"
        className="p-3 bg-slate-300 border border-gray-400 hover:opacity-70 cursor-pointer shadow-inner rounded-full"
      />
      <ImPhoneHangUp
        onClick={setCloseModal}
        size={43}
        color="#fff"
        className="p-3 bg-red-500 border border-red-400 hover:opacity-70 cursor-pointer shadow-inner rounded-full"
      />
    </div>
  )
}

export default VideoControls
