import groupServices from "@/services/groupServices"
import { User } from "@/types/user"
import { useCallback, useState } from "react"
import { BsThreeDots } from "react-icons/bs"

interface MemberProps {
  user: User
  selectedConversation: any
}

const Member = ({ user, selectedConversation }: MemberProps) => {
  const [isShowModal, setIsShowModal] = useState(false)

  const toggleOpenModal = () => {
    setIsShowModal(!isShowModal)
  }

  const handleKickMember = useCallback(async () => {
    try {
      const res = await groupServices.deleteUserToGroup({
        roomId: selectedConversation?.id as string,
        userIds: [user?.id],
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }, [selectedConversation])

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

      <div className="relative hidden group-hover:block">
        <button onClick={toggleOpenModal} className="ml-auto p-3">
          <BsThreeDots size={25} />
        </button>

        {isShowModal && (
          <div className="absolute z-10 right-0 top-full">
            <div className="absolute z-10 right-3 bottom-full border-transparent border-[0.7rem] border-b-white" />
            <div className="bg-white border-b border-gray-300 rounded-lg shadow-md w-[15rem]">
              <button
                onClick={handleKickMember}
                className="text-gray-800 w-full hover:bg-red-100 py-2 px-4 font-semibold"
              >
                Thêm quyền quản trị
              </button>
              <button
                onClick={handleKickMember}
                className="text-red-500 w-full hover:bg-red-100 py-2 px-4 font-semibold"
              >
                Xóa khỏi nhóm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Member
