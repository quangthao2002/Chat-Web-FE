/* eslint-disable @typescript-eslint/no-explicit-any */
import ImgEmpty from "@/assets/img/empty.png"
import { useAuthContext } from "@/context/AuthContext"
import useAcceptFriendRequest from "@/hooks/friend/useAcceptFriendRequest"
import useDeleteFriendRequest from "@/hooks/friend/useDeleteFriendRequest"
import useGetListRequestPending from "@/hooks/friend/useGetListRequestPending"
import { SenderStatusRequest } from "@/types/user"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useEffect } from "react"
import AccountItem from "../sidebar/contain/AccountItem"

const PhoneBookFriendList = () => {
  const { authUser } = useAuthContext()
  const { acceptFriendRequest } = useAcceptFriendRequest()
  const { deleteFriendRequest } = useDeleteFriendRequest()
  const { listPendingRequest } = useFriendStore()
  const { getListRequestPending } = useGetListRequestPending()

  const handleAcceptFriend = async (item: SenderStatusRequest) => {
    acceptFriendRequest(item.sender.id)
  }

  const handleDeleteRequest = async (item: SenderStatusRequest) => {
    deleteFriendRequest(item.sender.id)
    getListRequestPending(authUser?.user?.id)
  }

  useEffect(() => {
    getListRequestPending(authUser?.user?.id)
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white h-[77px] flex items-center px-5">
        <h1 className="text-[25px] font-semibold ">
          Danh sách bạn bè của <span className="text-blue-400">{authUser?.user?.fullName}</span>
        </h1>
      </div>

      <div className="bg-slate-100 flex-1 p-3">
        {listPendingRequest?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {listPendingRequest?.map((item, index) => (
              <AccountItem key={index} data={item?.sender} title="Chấp nhận" onClick={() => handleAcceptFriend(item)}>
                <button
                  type="button"
                  onClick={() => handleDeleteRequest(item)}
                  className="py-2 px-4 font-medium border hover:bg-red-500 hover:border-white hover:text-white border-red-500 text-red-500 rounded-md mr-2"
                >
                  Xóa
                </button>
              </AccountItem>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6 justify-center items-center py-[62px]">
            <img src={ImgEmpty} alt="friend-request-sended" className="w-[123px]" />
            <p className="text-[18px] font-medium text-gray-500">Không có lời mời nào</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhoneBookFriendList
