import { useAuthContext } from "@/context/AuthContext"
import { Tab, useTabContext } from "@/context/TabContext"
import useLogOut from "@/hooks/useLogOut"
import React, { useEffect, useState } from "react"
import { BiLogOut, BiMessageRoundedDetail } from "react-icons/bi"
import { CiCloudOn } from "react-icons/ci"
import { PiToolboxLight } from "react-icons/pi"
import { RiCalendarTodoLine } from "react-icons/ri"
import { TiContacts } from "react-icons/ti"
import PersonalInformation from "../profile/PersonalInformation"
import ButtonCategories from "./ButtonCategories"
import useGetListRequestPending from "@/hooks/friend/useGetListRequestPending"
import { useFriendStore } from "@/zustand/useFriendStore"

const Categories: React.FC = () => {
  const { loading, logout } = useLogOut()
  const { activeTab, setActiveTab } = useTabContext()
  const { getListRequestPending } = useGetListRequestPending()
  const { listPendingRequest } = useFriendStore()

  const { authUser } = useAuthContext()
  const [showUserInfo, setShowUserInfo] = useState(false)
  const avatar = authUser?.user.avatar

  const handleAvatarClick = () => {
    setShowUserInfo(!showUserInfo)
  }

  const handleModalClose = () => {
    setShowUserInfo(false)
  }

  const handleOpenChat = () => setActiveTab(Tab.Chat)
  const handleOpenPhoneBook = () => setActiveTab(Tab.PhoneBook)

  useEffect(() => {
    if (authUser && authUser.user) {
      getListRequestPending(authUser.user.id)
    }
  }, [])

  return (
    <div className="h-screen bg-primary flex flex-col py-2">
      <div className="flex flex-col items-center gap-6 ">
        <div className="avatar cursor-pointer" onClick={handleAvatarClick}>
          <div className="w-12 mt-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={avatar} alt="avatar" />
          </div>
        </div>

        {showUserInfo && (
          <PersonalInformation user={authUser?.user} onRequestClose={handleModalClose} isOpen={showUserInfo} />
        )}
        <div className="flex flex-col items-center gap-2.5 mb-36">
          <button className="btn btn-circle text-white bg-primary border-none" onClick={handleOpenChat}>
            <BiMessageRoundedDetail size={35} />
          </button>
          <button className="btn btn-circle text-white bg-primary border-none" onClick={handleOpenPhoneBook}>
            <TiContacts size={35} />
          </button>
          <button className="btn btn-circle text-white bg-primary border-none">
            <RiCalendarTodoLine size={35} />
          </button>
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-col gap-2 mt-28">
        <button className="btn btn-circle text-white bg-primary border-none">
          <CiCloudOn size={35} />
        </button>
        <button className="btn btn-circle text-white bg-primary border-none">
          <PiToolboxLight size={32} />
        </button>
        <button className="btn btn-circle text-white bg-primary border-none" onClick={logout}>
          {loading ? <div className="spinner spinner-primary"></div> : <BiLogOut size={35} />}
        </button>
      </div>
    </div>
  )
}

export default Categories
