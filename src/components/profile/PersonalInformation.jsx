import { useAuthContext } from "@/context/AuthContext"
import React, { useState } from "react"
import { FaCamera, FaUserEdit } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import Modal from "react-modal"
import PersonalUpdate from "./PersonalUpdate"
import { toast } from "react-hot-toast"
import ChangeAvatar from "./ChangeAvatar"


const PersonalInformation = ({ user, isOpen, onRequestClose }) => {
  const [showChangeAvatar, setShowChangeAvatar] = useState(false)
  const [showPersonalUpdate, setShowPersonalUpdate] = useState(false)
  const { authUser, setAuthUser } = useAuthContext()
  const avatarUser = authUser.user.avatar

  const handleOpenChangeAvatar = () => {
    setShowChangeAvatar(true)
  }
  const handleCloseChangeAvatar = () => {
    setShowChangeAvatar(false)
  }

  const handleOpenPersonalUpdate = () => {
    setShowPersonalUpdate(true)
  }

  const handleImageUpload = async(selectFile) => {
    if(selectFile){
      const formData = new FormData()
      formData.append("avatar", selectFile) 
      formData.append("userId", user.id)
      const rs = await fetch("http://localhost:3000/user/updateAvatar", {
        method: "POST",
        body: formData
      })
      if(rs.ok){
        const imgUpdate = await rs.json()
        console.log(imgUpdate)
        const updatedAuthUser = {...authUser, user: {...authUser.user, avatar: imgUpdate.avatarUrl}};
        setAuthUser(updatedAuthUser)
        localStorage.setItem('tokens-user', JSON.stringify(updatedAuthUser));
      }else{
        toast.error("Cập nhật ảnh đại diện thất bại")
      }
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="mx-auto mt-20 max-w-md w-full bg-white rounded-lg shadow-lg p-6 z-50"
      overlayClassName="fixed inset-0 flex items-start justify-start bg-black bg-opacity-50"
      contentLabel="Thông tin cá nhân"
    >
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Thông tin tài khoản</h2>
          <button onClick={onRequestClose}>
            <IoMdClose size={25} className="mb-2" />
          </button>
        </div>
        <hr className="border-t-2 border-gray-200 mb-4" />
        <div className="flex gap-1">
          <img
            onClick={handleOpenChangeAvatar}
            src={avatarUser}
            alt={user.fullName}
            className="rounded-full w-20 h-20 mb-2 mt-2"
          />
          <button
            className="mt-12  px-2  bg-gray-300 h-8 text-white rounded-md hover:bg-blue-600"
            onClick={handleOpenChangeAvatar}
          >
            <FaCamera size={20}  />
          </button>
          {showChangeAvatar && (
            <ChangeAvatar user={user} onSave={handleImageUpload} onClose={handleCloseChangeAvatar} />
          )}
        </div>
        <h2 className="text-md font-bold text-gray-500 mb-2">Thông tin cá nhân</h2>
        <div className="mt-1">
          <div className="flex justify-start mb-2">
            <span className="font-bold text-base text-slate-950 w-40">Tên người dùng:</span>{" "}
            <p className="text-sm">{user.fullName}</p>
          </div>

          <div className="flex justify-start mb-2">
            <span className="font-bold text-base text-slate-950 w-40">Email:</span>{" "}
            <p className="text-sm">{user.email}</p>
          </div>

          <div className="flex justify-start mb-4">
            <span className="font-bold text-base text-slate-950 w-40">Số điện thoại:</span>{" "}
            <p className="text-sm">{user.phone}</p>
          </div>
        </div>
        <button
          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleOpenPersonalUpdate}
        >
          Cập nhật
          <FaUserEdit size={20} className="ml-2" /> {/* Thêm margin-left để tạo khoảng cách giữa chữ và icon */}
        </button>
        {showPersonalUpdate && (
          <PersonalUpdate user={user} isOpen={showPersonalUpdate} onRequestClose={() => setShowPersonalUpdate(false)} />
        )}
      </div>
    </Modal>
  )
}

export default PersonalInformation
