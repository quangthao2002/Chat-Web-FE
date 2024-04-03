import useSendFriendRequest from "@/hooks/friend/useSendFriendRequest"
import toast from "react-hot-toast"

interface IProps {
  data: {
    id: string
    username: string
    avatar?: string
    isFriend?: boolean
  }
}

const AccountItem = ({
  data: { id, username, avatar = "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg", isFriend },
}: IProps) => {
  const { sendFriendRequest } = useSendFriendRequest()

  const toggleAddFriend = () => {
    sendFriendRequest(id)
    toast.success(`Đã gửi lời mời kết bạn đến ${username}`)
  }

  return (
    <div className={`flex gap-2 items-center border hover:shadow-md rounded p-2 py-1 `}>
      <div className="avatar online">
        <div className="w-16 rounded-full">
          {/* <img src={avatar} /> */}
          <img src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-lg font-semibold">{username}</p>
      </div>
      <button
        onClick={toggleAddFriend}
        className="ml-auto py-2 px-4 border hover:bg-slate-200 border-blue-500 text-blue-500 rounded-md mr-2"
      >
        {isFriend ? "Hủy Kết bạn" : "Kết bạn"}
      </button>
    </div>
  )
}

export default AccountItem
