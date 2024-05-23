/* eslint-disable @typescript-eslint/no-explicit-any */
import useClickOutSide from "@/hooks/group/useClickOutSide"
import useGetConversations from "@/hooks/useGetConversations"
import groupServices from "@/services/groupServices"
import { User } from "@/types/user"
import useConversation from "@/zustand/useConversation"
import { useCallback, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { toast } from "react-toastify"
import ActionButton from "./ActionButton"

interface MemberProps {
  user: User
  isMe: boolean
  isAdmin: boolean
  isOwner: boolean
  hasAdminAuth: boolean
  hasOwnerAuth: boolean
}

const Member = ({ user, isMe, isAdmin, isOwner, hasAdminAuth, hasOwnerAuth }: MemberProps) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const { selectedConversation } = useConversation()
  const { getConversations } = useGetConversations()
  const { nodeRef } = useClickOutSide(() => setIsShowModal(false))

  const hasAuthentication = (hasAdminAuth && !isMe && !isOwner) || (hasOwnerAuth && !isMe)

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
          getConversations()
          toast.success(`${successMessage} ${user.username} thành công`)
        }
      } catch (error) {
        toast.error(`${errorMessage} ${user.username} thất bại`)
      }
    },
    [selectedConversation?.id, user?.id, user.username],
  )

  const handleKickMember = () => handleAction(groupServices.deleteUserFromGroup, "Xoa", "Xoa")

  const handleAddAdmin = () =>
    handleAction(groupServices.addAdminToGroup, "Thêm quyền quản trị cho", "Thêm quyền quản trị cho")

  const handleDeleteAdmin = () =>
    handleAction(groupServices.deleteAdminFromGroup, "Xóa quyền quản trị cho", "Xóa quyền quản trị cho")

  return (
    <div
      ref={nodeRef as React.RefObject<HTMLDivElement>}
      className="relative group flex flex-row items-center py-2 px-3 gap-2 group hover:bg-blue-200 cursor-pointer transition-all"
    >
      <div className="avatar ">
        <div className="w-12 rounded-full">
          <img src={user?.avatar} />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="font-medium text-gray-600 mt-2">{user?.username}</p>
        <div className="flex">
          {selectedConversation?.ownerId === user?.id ? (
            <span className="text-gray-500 ">Trưởng nhóm</span>
          ) : (
            selectedConversation?.admins?.find((item: any) => item.id === user?.id) && (
              <span className="text-gray-500 ">Quản trị viên</span>
            )
          )}
          {isMe && <span className="text-gray-500 "> (Bạn)</span>}
        </div>
      </div>

      <div className={`${hasAuthentication ? "group-hover:visible invisible " : "invisible "} `}>
        <button onClick={toggleOpenModal} className="ml-auto p-3">
          <BsThreeDots size={25} />
        </button>
      </div>

      {hasAuthentication && isShowModal && (
        <div className="absolute z-10 right-14 top-0">
          <div className="bg-white border-b border-gray-300 rounded-lg shadow-md w-[15rem]">
            <ActionButton
              onClick={isAdmin ? handleDeleteAdmin : handleAddAdmin}
              text={isAdmin ? "Xóa quyền quản trị" : "Thêm quyền quản trị"}
            />

            <ActionButton onClick={handleKickMember} text="Xóa khỏi nhóm" className="text-red-500" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Member