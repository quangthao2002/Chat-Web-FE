/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "@/context/AuthContext"
import groupServices from "@/services/groupServices"
import { User } from "@/types/user"
import { useCallback, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { toast } from "react-toastify"
import ActionButton from "./ActionButton"

interface MemberProps {
  user: User
  selectedConversation: any
  isAdmin: boolean
  handleCheckAdmin: (id: string) => boolean
}

const Member = ({ user, selectedConversation, isAdmin, handleCheckAdmin }: MemberProps) => {
  const [isShowModal, setIsShowModal] = useState(false)

  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id
  const isMe = user.id === userId
  const checkItemAdmin = handleCheckAdmin(user.id)

  const toggleOpenModal = () => {
    setIsShowModal(!isShowModal)
  }

  const handleAction = useCallback(
    async (
      action: (arg0: { roomId: string; userIds: string[] }) => any,
      successMessage: string,
      errorMessage: string,
    ) => {
      try {
        const res = await action({
          roomId: selectedConversation?.id as string,
          userIds: [user?.id],
        })
        if (res.data) {
          toast.success(`${successMessage} ${user.username} thành công`)
        }
      } catch (error) {
        toast.error(`${errorMessage} ${user.username} thất bại`)
      }
    },
    [selectedConversation],
  )

  const handleKickMember = () => handleAction(groupServices.deleteUserFromGroup, "Xoa", "Xoa")
  const handleAddAdmin = () =>
    handleAction(groupServices.addAdminToGroup, "Thêm quyền quản trị cho", "Thêm quyền quản trị cho")
  const handleDeleteAdmin = () =>
    handleAction(groupServices.deleteAdminFromGroup, "Xóa quyền quản trị cho", "Xóa quyền quản trị cho")

  return (
    <div className="relative group flex flex-row items-center py-2 px-3 gap-2 group hover:bg-blue-200 cursor-pointer transition-all">
      <div className="avatar ">
        <div className="w-12 rounded-full">
          <img src={user?.avatar} />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="font-medium text-gray-600 mt-2">{user?.username}</p>
        {selectedConversation.ownerId === user?.id && <p className="text-gray-500 ">Trưởng nhóm</p>}
      </div>

      {isAdmin && !isMe && (
        <div className="relative hidden group-hover:block">
          <button onClick={toggleOpenModal} className="ml-auto p-3">
            <BsThreeDots size={25} />
          </button>

          {isShowModal && (
            <div className="absolute z-10 right-0 top-full">
              <div className="absolute z-10 right-3 bottom-full border-transparent border-[0.7rem] border-b-white" />
              <div className="bg-white border-b border-gray-300 rounded-lg shadow-md w-[15rem]">
                <ActionButton
                  onClick={checkItemAdmin ? handleDeleteAdmin : handleAddAdmin}
                  text={checkItemAdmin ? "Xóa quyền quản trị" : "Thêm quyền quản trị"}
                />

                <ActionButton onClick={handleKickMember} text="Xóa khỏi nhóm" className="text-red-500" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Member
