import { useAuthContext } from "@/context/AuthContext"
import useLogOut from "@/hooks/useLogOut"
import { useState } from "react"
import { BiLogOut, BiMessageRoundedDetail } from "react-icons/bi"
import { CiCloudOn } from "react-icons/ci"
import { PiToolboxLight } from "react-icons/pi"
import { RiCalendarTodoLine } from "react-icons/ri"
import { TiContacts } from "react-icons/ti"
import PersonalInformation from "../profile/PersonalInformation"
const Categories = () => {
  const { loading, logout } = useLogOut()
  const { authUser } = useAuthContext()
  const [showUserInfo, setShowUserInfo] = useState(false)
  const avatar = authUser?.user.avatar

  const handleAvatarClick = () => {
    setShowUserInfo(!showUserInfo)
  }
  const handleModalClose = () => {
    setShowUserInfo(false)
  }
  return (
    <div className="w-[64px] h-screen bg-primary ">
      <div className="flex flex-col items-center gap-9 justify-between">
        <div className="avatar cursor-pointer" onClick={handleAvatarClick}>
          <div className="w-12 mt-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={avatar} />
          </div>
        </div>
        {showUserInfo && (
          <PersonalInformation user={authUser?.user} onRequestClose={handleModalClose} isOpen={showUserInfo} />
        )}
          <div className="flex flex-col items-center gap-2.5 mb-36">
            <button className="btn btn-circle text-white bg-primary border-none">
              <BiMessageRoundedDetail size={35} />
            </button>
            <button className="btn btn-circle text-white bg-primary border-none">
              <TiContacts size={35} />
            </button>
            <button className="btn btn-circle text-white bg-primary border-none">
              <RiCalendarTodoLine size={35} />
            </button>
          </div>
          <div className="sticky bottom-0 flex flex-col gap-2 mt-28">
            <button className="btn btn-circle text-white bg-primary border-none">
              <CiCloudOn size={35} />
            </button>
            <button className="btn btn-circle text-white bg-primary border-none">
              <PiToolboxLight size={32} />
            </button>
            <button className="btn btn-circle text-white bg-primary border-none">
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
