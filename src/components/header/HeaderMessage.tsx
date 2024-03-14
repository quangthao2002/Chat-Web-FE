import { CiSearch } from "react-icons/ci";
import { MdVideoCall } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
interface IProps {}

const Header = ({}: IProps) => {
  return (
    <div className="h-[68px] border-b flex px-2 bg-white items-center justify-between">
      <div className="flex gap-2">
        <div className="avatar mt-1 ml-2">
          <div className="w-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="flex flex-col  justify-center">
          <p className="text-custom-color font-semibold text-lg">Quang Thảo</p>
          <p className="text-xs opacity-50">Active 12m ago</p>
        </div>
      </div>
      <div className="flex gap-2 pr-4">
        <button className="hover:bg-gray-100 rounded-2xl p-1" title="Thêm bạn vào nhóm">
        <MdGroupAdd size={25}/>
        </button>
        <button className="hover:bg-gray-100 rounded-2xl" title="Tìm bạn tin nhắn">
          <CiSearch size={25}/>
        </button>
        <button className="hover:bg-gray-100 rounded-2xl" title="Cuộc gọi video">
          <MdVideoCall size={25}   />
        </button>
        <button className="hover:bg-gray-100 rounded-2xl" title="thông tin hội thoại"> 
          <IoIosInformationCircle size={25}  />
          </button>
      </div>
    </div>
  )
}

export default Header
