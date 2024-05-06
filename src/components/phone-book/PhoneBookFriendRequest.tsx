/* eslint-disable @typescript-eslint/no-explicit-any */
import ImgEmpty from "@/assets/img/empty.png"
import { useAuthContext } from "@/context/AuthContext"
import useCancelFriendRequest from "@/hooks/friend/useCancelFriendRequest"
import useGetListRequestSended from "@/hooks/friend/useGetListRequestSended"
import { ReceiverStatusRequest } from "@/types/user"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useEffect } from "react"
import AccountItem from "../sidebar/contain/AccountItem"

const PhoneBookFriendRequest = () => {
  const { authUser } = useAuthContext()
  const { cancelFriendRequest } = useCancelFriendRequest()
  const { listPendingSended, resetFriendStore } = useFriendStore()
  const { getListRequestSended } = useGetListRequestSended()

  const handleCancelRequest = async (item: ReceiverStatusRequest) => {
    resetFriendStore()
    cancelFriendRequest(item?.receiver?.id)
  }

  useEffect(() => {
    getListRequestSended(authUser?.user?.id)
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white h-[77px] flex items-center px-5">
        <h1 className="text-[25px] font-semibold ">
          Danh sách đã gửi lời mời kết bạn của <span className="text-blue-400">{authUser?.user?.fullName}</span>
        </h1>
      </div>

      <div className="bg-slate-100 flex-1 p-5">
        <h1 className="text-[22px] font-medium mb-6 ">Đã gửi ({listPendingSended?.length})</h1>
        {listPendingSended?.length > 0 ? (
          <div className=" grid grid-cols-3 gap-4">
            {listPendingSended?.map((item, index) => (
              <div key={item?.id + index} className="bg-white p-2 rounded-lg">
                <AccountItem data={item?.receiver} title="Hủy lời mời" onClick={() => handleCancelRequest(item)} />
              </div>
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

export default PhoneBookFriendRequest
