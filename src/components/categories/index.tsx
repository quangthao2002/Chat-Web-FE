import useLogOut from "@/hooks/useLogOut"
import { BiLogOut, BiMessageRoundedDetail } from "react-icons/bi"
import { CiCloudOn } from "react-icons/ci"
import { PiToolboxLight } from "react-icons/pi"
import { RiCalendarTodoLine } from "react-icons/ri"
import { TiContacts } from "react-icons/ti"
const Categories = () => {
  const { loading, logout } = useLogOut()
  return (
    <div className="w-[64px] h-screen bg-primary ">
      <div className="flex flex-col items-center gap-9 justify-between">
        <div className="avatar cursor-pointer">
          <div className="w-12 mt-1 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <button className="btn btn-circle  text-white bg-primary border-none">
            <BiMessageRoundedDetail size={35} />
          </button>
          <button className="btn btn-circle   text-white bg-primary border-none">
            <TiContacts size={35} />
          </button>
          <button className="btn btn-circle   text-white bg-primary border-none">
            <RiCalendarTodoLine size={35} />
          </button>
        </div>
        <div className="flex flex-col mt-64 gap-2">
          <button className="btn btn-circle   text-white bg-primary border-none">
            <CiCloudOn size={35} />
          </button>
          <button className="btn btn-circle   text-white bg-primary border-none">
            <PiToolboxLight size={32} />
          </button>
          <button className="btn btn-circle  text-white bg-primary border-none">
            {loading ? (
              <div className="spinner spinner-primary"></div>
            ) : (
              <BiLogOut size={35} onClick={() => logout()} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Categories
