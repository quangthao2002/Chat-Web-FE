import { useAuthContext } from "@/context/AuthContext"
import { useModalContext } from "@/context/ModalContext"
import useGetConversations from "@/hooks/useGetConversations"
import groupServices from "@/services/groupServices"
import { useState } from "react"
import { FaCamera } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"

const ModalUserList = () => {
  const { conversation, getConversations } = useGetConversations()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [groupAvatar, setGroupAvatar] = useState(
    "https://png.pngtree.com/png-vector/20190827/ourmid/pngtree-group-avatar-icon-design-vector-png-image_1702778.jpg",
  )
  const [groupName, setGroupName] = useState("")
  const { authUser } = useAuthContext()
  const ownerId = authUser?.user?.id
  const { isModalOpenCreateGroup, handleCloseModalCreateGroup } = useModalContext()

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId])
  }
  const handleUserDeselect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((id) => id !== userId))
  }

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value)
  }
  const handleFileChange = async (event) => {
    const file = event.target.files[0]

    if (file) {
      const formData = new FormData()
      formData.append("avatar", file)

      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/messages/uploadImageAndGetUrl`, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setGroupAvatar(data.imageUrl)
      } else {
        console.error("Error uploading file")
      }
    }
  }

  const handleCreateGroup = async () => {
    if (!groupName) {
      toast.error("Please enter group name")
      return
    }
    if (selectedUsers.length < 2) {
      toast.error("Please select at least 2 members")
      return
    }
    const newGroup = {
      name: groupName,
      avatar: groupAvatar,
      ownerId: ownerId,
      member: [...selectedUsers, ownerId],
    }
    try {
      const res = await groupServices.createGroup(newGroup)
      if (res?.data) {
        getConversations()
        toast.success(`Create group ${res?.data?.name} successfully`)
      } else {
        toast.error("Create group failed")
      }
      handleCloseModalCreateGroup()
    } catch (error) {
      toast.error("Error")
    }
  }

  if (!isModalOpenCreateGroup) return null

  return (
    <div className={`fixed z-[1] inset-0 bg-black/40 flex justify-center items-center `}>
      <div className="bg-white w-1/2 p-5">
        <div className="flex flex-1 justify-between">
          <h2 className="font-bold text-black mb-2">Create Group</h2>
          <div className="divider my-0 py-0 mx-1 h-1 " />
          <IoMdClose size={30} className=" hover:text-slate-500 cursor-pointer" onClick={handleCloseModalCreateGroup} />
        </div>
        <div className="divider my-0 py-0 mx-1 h-1 " />
        <div className="flex mb-2 mt-2 justify-stretch">
          <label htmlFor="avatar-upload">
            <FaCamera size={35} />
          </label>
          <input id="avatar-upload" type="file" style={{ display: "none" }} onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Nhap ten nhom"
            className="input input-bordered w-full h-9 ml-5 max-w-xs bg-gray-200  "
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </div>
        <div className="divider my-0 py-0 mx-1 h-1 " />
        <h2 className="text-black font-semibold mt-2">Add member</h2>
        <div className="max-h-56 overflow-y-auto">
          {conversation
            ?.filter((item) => item.username)
            .map((user) => (
              <label key={user.id} className="flex gap-3 p-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleUserSelect(user.id)
                    } else {
                      handleUserDeselect(user.id)
                    }
                  }}
                />
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.avatar} onChange={handleFileChange} />
                  </div>
                </div>
                <div className="mt-2">{user.username}</div>
              </label>
            ))}
        </div>
        <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
        <div className="flex justify-end  gap-2">
          <button className="btn btn-md" onClick={handleCloseModalCreateGroup}>
            Close
          </button>
          <button className="btn btn-neutral btn-md" onClick={handleCreateGroup}>
            Create group
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalUserList
