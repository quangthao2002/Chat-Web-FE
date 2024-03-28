import React, { useEffect, useState } from "react"
import useGetConversations from "@/hooks/useGetConversations"
import Modal from "react-modal"
import { IoMdClose } from "react-icons/io"
import { FaCamera } from "react-icons/fa"
import { io } from "socket.io-client"
import { useAuthContext } from '@/context/AuthContext';

const UserListModal = ({ onClose }) => {
  const { conversation,addConversation } = useGetConversations()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [groupName, setGroupName] = useState("")
  const {authUser} = useAuthContext()
  const ownerId = authUser.user.id

  Modal.setAppElement('#root');

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId])
  }
  const handleUserDeselect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((id) => id !== userId))
  }
  const [groupAvatar, setGroupAvatar] = useState("")

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value)
  }
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch('http://localhost:3000/messages/uploadImageAndGetUrl', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setGroupAvatar(data.imageUrl);
      } else {
        console.error('Error uploading file');
      }
    }
  };


  // Connect to backend to create group
  const socket = io("http://localhost:3000")

  useEffect(() => {
    socket.on("roomCreated", (roomId) => {

      console.log("hello")
      console.log("Received roomCreated message:", roomId)
      addConversation({ id: roomId, name: groupName, avatar: groupAvatar, userIds: selectedUsers, ownerId: ownerId })
    })
    return () => {
      socket.off("roomCreated")
    }
  }, [socket, addConversation, groupAvatar, groupName, ownerId, selectedUsers])
  const handleCreateGroup = () => {
    console.log("Sending createRoom message:", groupAvatar, groupName, selectedUsers)
    socket.emit("createRoom", {
      name: groupName,
      userIds: selectedUsers,
      avatar: groupAvatar,
      ownerId: ownerId
    })
    onClose()
  }

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: "550px",
          height: "450px",
          margin: "auto",
        },
      }}
    >
      <div className="flex flex-1 justify-between">
        <h2 className="font-bold text-black mb-2">Create Group</h2>
        <div className="divider my-0 py-0 mx-1 h-1 " />
        <button onClick={onClose}>
          <IoMdClose size={25} />
        </button>
      </div>
      <div className="divider my-0 py-0 mx-1 h-1 " />
      <div className="flex mb-2 mt-2 justify-stretch">
        <label htmlFor="avatar-upload">
          <FaCamera size={35} />
        </label>
        <input
          id="avatar-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
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
        {conversation.map((user) => (
          <div key={user.id} className="flex gap-3 p-2">
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
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <label className="mt-2">{user.username}</label>
          </div>
        ))}
      </div>
      <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
      <div className="flex justify-end  gap-2">
        <button className="btn btn-md" onClick={onClose}>
          Close
        </button>
        <button className="btn btn-neutral btn-md" onClick={handleCreateGroup}>
          Create group
        </button>
      </div>
    </Modal>
  )
}

export default UserListModal
