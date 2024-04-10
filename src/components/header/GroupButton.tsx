import { useSidebarContext } from "@/context/SideBarContext"
import useModalVideoCall from "@/zustand/useVideoCall"
import { CiSearch } from "react-icons/ci"
import { GoDeviceCameraVideo } from "react-icons/go"
import { IoIosInformationCircle } from "react-icons/io"
import { MdGroupAdd } from "react-icons/md"

const GroupButton = () => {
  const { setOpenModal } = useModalVideoCall()

  const { toggleSidebar } = useSidebarContext();

  return (
    <div className="flex gap-6 pr-4">
      <button className="hover:bg-gray-100 rounded-2xl p-1" title="Thêm bạn vào nhóm">
        <MdGroupAdd size={35} />
      </button>
      <button className="hover:bg-gray-100 rounded-2xl" title="Tìm bạn tin nhắn">
        <CiSearch size={35} />
      </button>
      <button onClick={setOpenModal} className="hover:bg-gray-100 rounded-2xl" title="Cuộc gọi video">
        <GoDeviceCameraVideo size={35} />
      </button>
      <button className="hover:bg-gray-100 rounded-2xl" title="thông tin hội thoại"  onClick={toggleSidebar}>
        <IoIosInformationCircle size={35} />
      </button>
    </div>
  )
}

export default GroupButton
