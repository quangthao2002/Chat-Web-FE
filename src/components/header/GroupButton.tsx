import { useAuthContext } from "@/context/AuthContext"
import { useModalContext } from "@/context/ModalContext"
import useConversation from "@/zustand/useConversation"
import useSocket from "@/zustand/useSocket"

import { CiSearch } from "react-icons/ci"
import { GoDeviceCameraVideo } from "react-icons/go"
import { IoIosInformationCircle } from "react-icons/io"
import { MdGroupAdd } from "react-icons/md"

const GroupButton = () => {
  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id
  const { callUser } = useSocket(userId)
  const {
    handleOpenSidebar,
    handleOpenModalVideoCall: originalOpenModalVideoCall,
    handleOpenModalAddMember,
  } = useModalContext()
  const { selectedConversation } = useConversation()

  const handleOpenModalVideoCall = () => {
    callUser(selectedConversation?.id)
    originalOpenModalVideoCall()
  }

  return (
    <div className="flex gap-6 pr-4">
      <MdGroupAdd
        onClick={handleOpenModalAddMember}
        size={35}
        className="hover:bg-gray-100 rounded-2xl p-1"
        title="Thêm bạn vào nhóm"
      />

      <CiSearch size={35} className="hover:bg-gray-100 rounded-2xl" title="Tìm bạn tin nhắn" />

      <GoDeviceCameraVideo
        size={35}
        className="hover:bg-gray-100 rounded-2xl"
        title="Cuộc gọi video"
        onClick={handleOpenModalVideoCall}
      />

      <IoIosInformationCircle
        size={35}
        className="hover:bg-gray-100 rounded-2xl"
        title="Thông tin hội thoại"
        onClick={handleOpenSidebar}
      />
    </div>
  )
}

export default GroupButton
