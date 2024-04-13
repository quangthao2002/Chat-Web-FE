import { useModalContext } from "@/context/ModalContext"
import useGetConversations from "@/hooks/useGetConversations"
import groupServices from "@/services/groupServices"
import useConversation from "@/zustand/useConversation"
import { FC, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"

interface User {
  id: string
  username: string
  avatar: string
}

const ModalAddMember: FC = () => {
  const { conversation } = useGetConversations()
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const { isModalOpenAddMember, handleCloseModalAddMember } = useModalContext()
  const { selectedConversation } = useConversation()

  const listMemberPresent = selectedConversation?.users?.map((item: any) => item.id) || []
  const members = conversation
    ?.filter((item: User) => item?.username)
    ?.filter((item: User) => !listMemberPresent?.includes(item.id))

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId])
  }
  const handleUserDeselect = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((id) => id !== userId))
  }

  const handleAddMember = async () => {
    try {
      const res = await groupServices.addUserToGroup({ roomId: selectedConversation?.id, userIds: selectedUsers })
      if (res?.data) {
        toast.success(`Add member to ${res?.data?.name} successfully`)
      } else {
        toast.error("Add member failed")
      }
      handleCloseModalAddMember()
    } catch (error) {
      console.log("error: ", error)
      toast.error("Error")
    }
  }

  return (
    <div
      className={`${isModalOpenAddMember ? "fixed" : "hidden"} z-[1] inset-0 bg-black/40 flex justify-center items-center `}
    >
      <div className="bg-white w-1/2 p-5">
        <div className="flex flex-1 justify-between">
          <h2 className="font-bold text-black mb-2">
            Add member to <span className="italic text-blue-900">{selectedConversation?.name}</span>
          </h2>
          <div className="divider my-0 py-0 mx-1 h-1 " />
          <IoMdClose size={30} className=" hover:text-slate-500 cursor-pointer" onClick={handleCloseModalAddMember} />
        </div>

        <div className="divider my-0 py-0 mx-1 h-1 " />
        <div className="max-h-56 overflow-y-auto">
          {members?.length > 0 ? (
            members?.map((user: User) => (
              <label key={user?.id} className="flex gap-3 p-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleUserSelect(user?.id)
                    } else {
                      handleUserDeselect(user?.id)
                    }
                  }}
                />
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.avatar} />
                  </div>
                </div>
                <div className="mt-2">{user?.username}</div>
              </label>
            ))
          ) : (
            <div className="my-4">No member to add</div>
          )}
        </div>
        <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
        <div className="flex justify-end  gap-2">
          <button type="button" className="btn btn-md" onClick={handleCloseModalAddMember}>
            Close
          </button>
          <button type="button" className="btn btn-neutral btn-md" onClick={handleAddMember}>
            Add member
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAddMember
