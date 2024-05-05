import { useAuthContext } from "@/context/AuthContext"
import { useModalContext } from "@/context/ModalContext"
import useSocket from "@/zustand/useSocket"
import { useVideoCallStore } from "@/zustand/useVideoCallStore"
import { FaPhoneAlt } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"

const ModalCalling = () => {
  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id
  const { answerCall } = useSocket(userId)
  const { handleOpenModalVideoCall } = useModalContext()
  const { isCalling, setCalling, callingUserId } = useVideoCallStore()

  const handleAccept = async () => {
    handleOpenModalVideoCall()
    setCalling(false)
    answerCall(callingUserId)
  }

  const handleReject = () => {
    setCalling(false)
  }

  if (!isCalling) return null

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[100] w-full h-full`}>
      <div className="p-4 rounded-xl shadow-lg bg-zinc-200 w-[20rem] ">
        <div className="flex items-center gap-2 w-full justify-center">
          <span className="text-[20px]">Dav</span>
          <span className="text-[20px]">đang gọi...</span>
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
      </div>
    </div>
  )
}

export default ModalCalling
