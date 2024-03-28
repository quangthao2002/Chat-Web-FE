import React, { useEffect, useState } from "react"
import useGetConversations from "@/hooks/useGetConversations"
import Modal from "react-modal"
import { IoMdClose } from "react-icons/io"
import { FaCamera } from "react-icons/fa"
import { io } from "socket.io-client"
import AWS from 'aws-sdk';
// import AWS from 'aws-sdk';
import { useAuthContext } from '@/context/AuthContext';

const UserListModal = ({ onClose }) => {
  const { conversation } = useGetConversations()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [groupName, setGroupName] = useState("")
  const {authUser} = useAuthContext()
  const ownerId = authUser.user.id

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
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Configure AWS with your access and secret key.
    const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, S3_BUCKET_NAME } = process.env; // Replace with your keys and bucket name
    
    const s3 = new AWS.S3({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION
    });
    if (file) {
      const params = {
        Bucket: S3_BUCKET_NAME,
        Key: file.name,
        Body: file
      };

      s3.upload(params, function(err, data) {
        if (err) {
          console.error("Error uploading file:", err);
        } else {
          setGroupAvatar(data.Location);
        }
      });
    }
  };
 


  
  


  // Connect to backend to create group
  const socket = io("http://localhost:3000")

  socket.on("connect", () => {
    console.log("Connected to the server")
  })

  useEffect(() => {
    socket.on("roomCreated", (roomId) => {
      // server sẽ gửi sự kiện 'roomCreated' sau khi tạo nhóm mới, roomId is the id of the room created nhan tu server
      console.log("Created room with ID:", roomId)
    })
    return () => {
      socket.off("roomCreated")
    }
  }, [socket])

  const handleCreateGroup = () => {
    // Send a 'createRoom' message to the server with the group information
    console.log("Sending createRoom message:",groupAvatar, groupName, selectedUsers)
    socket.emit("createRoom", {
       name: groupName,
      userIds: selectedUsers ,
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
