import { BiMessageRoundedDetail } from "react-icons/bi"
import { TiContacts } from "react-icons/ti";
import { RiCalendarTodoLine } from "react-icons/ri";
import { CiCloudOn } from "react-icons/ci";
import { IoSettingsSharp } from "react-icons/io5";
import { FaToolbox } from "react-icons/fa";
const Categories = () => {
  return (
    <div className="w-[64px] h-screen bg-primary ">
      <div className="flex flex-col items-center gap-9 justify-between">
        <div className="avatar cursor-pointer">
          <div className="w-12 mt-1 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <button className="btn btn-circle  text-primary">
            <BiMessageRoundedDetail size={35} />
          </button>
          <button className="btn btn-circle  text-primary">
          <TiContacts size={35} />
          </button>
          <button className="btn btn-circle  text-primary">
          <RiCalendarTodoLine size={35} />
          </button>
        </div>
        <div className="flex flex-col mt-64 gap-2">
          <button className="btn btn-circle  text-primary">
            <CiCloudOn  size={35} />
          </button>
          <button className="btn btn-circle  text-primary">
          <FaToolbox size={35} />
          </button>
          <button className="btn btn-circle  text-primary">
          <IoSettingsSharp  size={35} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Categories
