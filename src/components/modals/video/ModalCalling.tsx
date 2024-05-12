import Mp3Sound from "@/assets/mp3/sound.mp3"
import { useAuthContext } from "@/context/AuthContext"
import { useModalContext } from "@/context/ModalContext"
import useSocket from "@/zustand/useSocket"
import { useVideoCallStore } from "@/zustand/useVideoCallStore"
import { useRef } from "react"
import { FaPhoneAlt } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"

const ModalCalling = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id
  const { answerCall } = useSocket(userId)
  const { handleOpenModalVideoCall } = useModalContext()
  const { isCalling, setCalling, callingUserId, callingUserName, callingUserAvatar } = useVideoCallStore()

  const handleAccept = async () => {
    handleOpenModalVideoCall()
    answerCall(callingUserId)
    setCalling(false)
  }

  const handleReject = () => {
    setCalling(false)
  }

  if (!isCalling) return null

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[100] w-full h-full`}>
      <div className="p-4 rounded-xl shadow-lg bg-zinc-200 w-[30rem] flex flex-col gap-6 items-center justify-center">
        <div className="avatar w-20 h-20 rounded-full overflow-hidden border border-white/40">
          <img src={callingUserAvatar} alt="calling-user" />
        </div>

        <div className="flex items-center w-full justify-center">
          <span className="text-[20px]">{callingUserName} đang gọi...</span>
        </div>

        <div className="flex items-center gap-8 justify-center mt-4">
          <button
            type="button"
            onClick={handleReject}
            className="p-3 bg-red-500 border border-red-400 hover:opacity-70 cursor-pointer shadow-inner rounded-full"
            title="Từ chối"
          >
            <IoCloseSharp size={26} color="white" />
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="p-3 bg-green-500 border border-green-400 hover:opacity-70 cursor-pointer shadow-inner rounded-full"
            title="Trả lời"
          >
            <FaPhoneAlt size={26} color="white" />
          </button>
        </div>

        <audio ref={audioRef} id="audio" src={Mp3Sound} loop autoPlay />
      </div>
    </div>
  )
}

export default ModalCalling
