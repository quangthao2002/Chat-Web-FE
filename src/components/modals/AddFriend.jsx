import axios from "axios"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import Modal from "react-modal"
import Conversation from "../sidebar/contain/Conversation"
import AccountItem from "../sidebar/contain/AccountItem"

function AddFriend({ onClose }) {
  const user = JSON.parse(localStorage.getItem("tokens-user"))
  const token = user?.tokens?.accessToken
  const [search, setSearch] = useState(null)
  const [phone, setPhone] = useState("")
  Modal.setAppElement("#root")
  const handleSearchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/search-user/${phone}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response)
      setSearch(response.data) // Assuming setSearch is a function to set the state
    } catch (error) {
      console.error("Error occurred while fetching user data:", error)
      // Handle errors, if any
    }
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
        <h2 className="font-bold text-black mb-2">Thêm bạn</h2>
        <div className="divider my-0 py-0 mx-1 h-1 " />
        <button onClick={onClose}>
          <IoMdClose size={25} />
        </button>
      </div>
      <div className="divider my-0 py-0 mx-1 h-1 " />

      <input
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        placeholder="Nhập số điện thoại"
        className="input input-bordered w-full max-w-xs bg-gray-300 m-3"
      />
      <div className="divider my-0 py-0 mx-1 h-1 " />
      <div className="h-60 flex flex-col">
        {search ? (
          <AccountItem data={search} />
        ) : (
          <p className="text-black whitespace-nowrap font-normal  mt-6">Không tìm thấy kết quả nào gần đây</p>
        )}
      </div>
      <div className="flex justify-end  gap-2">
        <button className="btn btn-md" onClick={onClose}>
          Close
        </button>
        <button className="btn btn-neutral btn-md" onClick={handleSearchUser}>
          Search
        </button>
      </div>
    </Modal>
  )
}

export default AddFriend
