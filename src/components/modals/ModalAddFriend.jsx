import { useModalContext } from "@/context/ModalContext"
import friendServices from "@/services/friendServices"
import { useFriendStore } from "@/zustand/useFriendStore"
import axios from "axios"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import { IoMdClose } from "react-icons/io"
import AccountItem from "../sidebar/contain/AccountItem"

function ModalAddFriend() {
  const user = JSON.parse(localStorage.getItem("tokens-user"))
  const token = user?.tokens?.accessToken

  const [search, setSearch] = useState(null)
  const [phone, setPhone] = useState("")
  const { listPendingRequest } = useFriendStore()
  const { isModalOpenAddFriend, handleCloseModalAddFriend } = useModalContext()

  const isFriend = listPendingRequest?.find((item) => item.phone === search?.phone)
  const isMe = search?.phone === user?.user?.phone

  const handleSearchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/search-user/${phone}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response)
      setSearch(response.data)
    } catch (error) {
      console.error("Error occurred while fetching user data:", error)
    }
  }

  const handleAddFriend = useCallback(async (item) => {
    try {
      const res = await friendServices.sendFriendRequest({ receiverId: item.id })
      console.log(res)
    } catch (error) {
      console.log("Error occurred while adding friend:", error)
      toast.error("Đã xảy ra lỗi khi thêm bạn bè")
    }
  }, [])

  const handleCancelFriend = useCallback(async (item) => {
    if (item?.id) {
      await handleSearchUser()
      toast.error(`Đã gửi lời mời kết bạn đến ${item?.username}`)
    }
  }, [])

  return (
    <div
      className={`${isModalOpenAddFriend ? "fixed" : "hidden"} z-[1] inset-0 bg-black/40 flex items-center justify-center `}
    >
      <div className="bg-white w-1/2 p-5">
        <div className=" flex flex-1 justify-between">
          <h2 className="font-bold text-black mb-2">Thêm bạn</h2>
          <div className="divider my-0 py-0 mx-1 h-1 " />
          <IoMdClose size={30} className=" hover:text-slate-500 cursor-pointer" onClick={handleCloseModalAddFriend} />
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
          {isMe ? (
            <AccountItem data={search} />
          ) : search && isFriend ? (
            <AccountItem data={search} onClick={handleCancelFriend(search)} title={"Hủy bạn"} />
          ) : search && !isFriend ? (
            <AccountItem data={search} onClick={() => handleAddFriend(search)} title={"Kết bạn"} />
          ) : (
            <p className="text-black whitespace-nowrap font-normal  mt-6">Không tìm thấy kết quả nào gần đây</p>
          )}
        </div>
        <div className="flex justify-end  gap-2">
          <button type="button" className="btn btn-md" onClick={handleCloseModalAddFriend}>
            Close
          </button>
          <button type="button" className="btn btn-neutral btn-md" onClick={handleSearchUser}>
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAddFriend
