import { useAuthContext } from "@/context/AuthContext"
import { useChatbotContext } from "@/context/ConversationChatbotContext"
import { Tab, useTabContext } from "@/context/TabContext"
import useGetListRequestPending from "@/hooks/friend/useGetListRequestPending"
import useLogOut from "@/hooks/useLogOut"
import useConversation from "@/zustand/useConversation"
import { useFriendStore } from "@/zustand/useFriendStore"
import React, { useEffect, useState } from "react"
import { BiLogOut, BiMessageRoundedDetail } from "react-icons/bi"
import { CiCloudOn } from "react-icons/ci"
import { IoMdClose } from "react-icons/io"
import { PiToolboxLight } from "react-icons/pi"
import { RiCalendarTodoLine } from "react-icons/ri"
import { TiContacts } from "react-icons/ti"
import { VscRobot } from "react-icons/vsc"
import PersonalInformation from "../profile/PersonalInformation"
import ButtonCategories from "./ButtonCategories"

const Categories: React.FC = () => {
  const [showUserInfo, setShowUserInfo] = useState(false)

  const { authUser } = useAuthContext()
  const avatar = authUser?.user?.avatar
  const { loading, logout } = useLogOut()
  const { activeTab, setActiveTab } = useTabContext()
  const { getListRequestPending } = useGetListRequestPending()
  const { listPendingRequest } = useFriendStore()
  const { showConversationChatbot, setShowConversationChatbot } = useChatbotContext()
  const { setSelectedConversation, setSelectedConversationChatbot } = useConversation()

  const handleAvatarClick = () => {
    setShowUserInfo(!showUserInfo)
  }
  const handleModalClose = () => {
    setShowUserInfo(false)
  }
  const handleOpenChat = () => setActiveTab(Tab.Chat)
  const handleOpenPhoneBook = () => setActiveTab(Tab.PhoneBook)

  useEffect(() => {
    getListRequestPending(authUser?.user?.id)
  }, [])

  return (
    <div className="h-screen bg-primary flex flex-col py-2">
      <div className="flex flex-col items-center gap-6 ">
        <div className="avatar cursor-pointer" onClick={handleAvatarClick}>
          <div className="w-12 mt-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={avatar} />
          </div>
        </div>

        {showUserInfo && (
          <PersonalInformation user={authUser?.user} onRequestClose={handleModalClose} isOpen={showUserInfo} />
        )}

        <div className="flex flex-col items-center gap-1">
          <ButtonCategories
            isActive={activeTab === Tab.Chat}
            onClick={handleOpenChat}
            Icon={BiMessageRoundedDetail}
            size={35}
          />
          <ButtonCategories
            isActive={activeTab === Tab.PhoneBook}
            Icon={TiContacts}
            size={35}
            onClick={handleOpenPhoneBook}
            badgeNumber={listPendingRequest?.length > 0 ? listPendingRequest.length : -1}
          />
          <ButtonCategories Icon={RiCalendarTodoLine} size={35} />

          <div>
            {showConversationChatbot ? (
              <button
                className="fixed left-1 bottom-96 h-12 w-12 flex justify-center items-center  text-white rounded-full border-none outline-none shadow-xl cursor-pointer"
                onClick={() => {
                  setShowConversationChatbot(false)
                  setSelectedConversationChatbot(null)
                }}
              >
                <IoMdClose size={30} className="absolute" />
              </button>
            ) : (
              <button
                className="fixed left-1 bottom-96 h-12 w-12 flex justify-center items-center  text-white rounded-full border-none outline-none shadow-xl cursor-pointer"
                onClick={() => {
                  setShowConversationChatbot(true)
                  setSelectedConversation(null)
                }}
              >
                <VscRobot size={30} className="absolute" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-end gap-1">
        <ButtonCategories Icon={CiCloudOn} size={35} />
        <ButtonCategories Icon={PiToolboxLight} size={32} />

        <ButtonCategories Icon={BiLogOut} size={35} onClick={() => logout()}>
          {loading ? <div className="spinner spinner-primary"></div> : null}
        </ButtonCategories>
      </div>
    </div>
  )
}

export default Categories
