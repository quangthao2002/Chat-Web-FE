import useLogOut from "@/hooks/useLogOut"
import React from "react"
import { BiLogOut, BiMessageRoundedDetail } from "react-icons/bi"
import { CiCloudOn } from "react-icons/ci"
import { PiToolboxLight } from "react-icons/pi"
import { RiCalendarTodoLine } from "react-icons/ri"
import { TiContacts } from "react-icons/ti"
import ButtonCategories from "./ButtonCategories"
import useGetListRequestPending from "@/hooks/friend/useGetListRequestPending"

const Categories: React.FC = () => {
  const { loading, logout } = useLogOut()
  const { pendingRequests } = useGetListRequestPending()

  const handleOpenPhoneBook = () => {}

  return (
    <>
      <div className="w-[64px] h-screen bg-primary ">
        <div className="flex flex-col items-center gap-9 justify-between">
          <div className="avatar cursor-pointer">
            <div className="w-12 mt-1 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2.5">
            <ButtonCategories Icon={BiMessageRoundedDetail} size={35} />
            <ButtonCategories
              Icon={TiContacts}
              size={35}
              onClick={handleOpenPhoneBook}
              badgeNumber={pendingRequests?.length}
            />
            <ButtonCategories Icon={RiCalendarTodoLine} size={35} />
          </div>

          <div className="flex flex-col mt-64 gap-2">
            <ButtonCategories Icon={CiCloudOn} size={35} />
            <ButtonCategories Icon={PiToolboxLight} size={32} />

            <ButtonCategories Icon={BiLogOut} size={35} onClick={() => logout()}>
              {loading ? <div className="spinner spinner-primary"></div> : null}
            </ButtonCategories>
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories
