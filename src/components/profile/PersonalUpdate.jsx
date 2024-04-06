import { useAuthContext } from "@/context/AuthContext"
import React, { useState } from "react"
import Modal from "react-modal"
import { toast } from "react-hot-toast"

const PersonalUpdate = ({ user, onRequestClose, isOpen }) => {
  const [fullName, setFullname] = useState(user.fullName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const { authUser, setAuthUser } = useAuthContext()

  const validateInput = async () => {
    // Kiểm tra định dạng email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ")
      return false
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ")
      return false
    }

    // Kiểm tra xem email hoặc số điện thoại đã tồn tại trong hệ thống hay không
    const response = await fetch("http://localhost:3000/user/checkExistence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, phone }),
    })

    const data = await response.json()

    if (data.exists) {
      toast.error("Email hoặc số điện thoại đã tồn tại")
      return false
    }

    return true
  }

  const handleProfileUpdate = async (updatedUserData) => {
    if (!validateInput()) return
    try {
      const response = await fetch("http://localhost:3000/user/updateProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      })
      console.log("Response status:", response.status)

      if (response.ok) {
        console.log(response)
        const updatedUser = await response.json()
        console.log("Updated user:", updatedUser)
        setAuthUser({ ...authUser, user: updatedUser })
        onRequestClose()
      } else {
        alert("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error.message)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="mx-auto mt-20 max-w-md w-full bg-white rounded-lg shadow-lg p-6 z-50"
      overlayClassName="fixed inset-0 flex items-start justify-start bg-black bg-opacity-50"
      contentLabel="Cập nhật thông tin cá nhân"
    >
      <h2 className="text-xl font-bold text-black">Cập nhật thông tin</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const updatedUserData = {
            userId: user.id,
            username: fullName,
            phone: phone,
            email: email,
          }
          handleProfileUpdate(updatedUserData)
        }}
      >
        <div className="mt-10">
          <div className="flex justify-start mb-2">
            <label  className="font-bold text-base text-slate-950 w-60">Tên người dùng:</label>{" "}
            <input
              className="input input-bordered input-info bg-slate-200 w-full h-12"
              type="text"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="flex justify-start mb-2">
            <label className="font-bold text-base text-slate-950 w-60">Số điện thoại:</label>{" "}
            <input
              className="input input-bordered input-info bg-slate-200 w-full h-12"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex justify-start mb-4">
            <label className="font-bold text-base text-slate-950 w-60">Email:</label>{" "}
            <input
              className="input input-bordered input-info bg-slate-200 w-full h-12"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-16 ">
          <button onClick={onRequestClose} className="bg-gray-500 btn btn-md mr-2">
            Hủy
          </button>
          <button type="submit" className="bg-gray-500 btn btn-md">
            Cập nhật
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default PersonalUpdate
