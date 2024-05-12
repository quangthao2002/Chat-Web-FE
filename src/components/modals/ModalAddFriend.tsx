import GifLoading from "@/assets/gif/loading.gif"
import ImgSearch from "@/assets/img/search.png"
import { useAuthContext } from "@/context/AuthContext"
import { useModalContext } from "@/context/ModalContext"
import useCancelFriendRequest from "@/hooks/friend/useCancelFriendRequest"
import useDebounce from "@/hooks/friend/useDebounce"
import useGetListRequestSended from "@/hooks/friend/useGetListRequestSended"
import useClickOutSide from "@/hooks/group/useClickOutSide"
import friendServices from "@/services/friendServices"
import { User } from "@/types/user"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useCallback, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { IoMdClose } from "react-icons/io"
import AccountItem from "../sidebar/contain/AccountItem"

function ModalAddFriend() {
  const [searchValue, setSearchValue] = useState<string>("")
  const [resultSearch, setResultSearch] = useState<User | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { authUser } = useAuthContext()
  const user = JSON.parse(localStorage.getItem("tokens-user") as string)
  const { listPendingSended, resetFriendStore, listFriend } = useFriendStore()
  const { isModalOpenAddFriend, handleCloseModalAddFriend: originCloseModal } = useModalContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getListRequestSended } = useGetListRequestSended()
  const { cancelFriendRequest } = useCancelFriendRequest()

  const debounce = useDebounce({ value: searchValue, delay: 800 })
  const isSendRequest = !!listPendingSended?.find((item) => item?.receiver?.phone === resultSearch?.phone)
  const isFriend = !!listFriend?.find((item) => item?.phone === resultSearch?.phone)
  const isMe = resultSearch?.phone === user?.user?.phone

  const handleAddFriend = useCallback(async (item: User) => {
    try {
      const res = await friendServices.sendFriendRequest({ receiverId: item.id })
      if (res?.data) {
        toast.success(`Đã gửi lời mời kết bạn đến ${item?.username}`)
        getListRequestSended(authUser?.user?.id)
      } else {
        toast.error(`Gửi lời mời kết bạn đến ${item?.username} thất bại`)
      }
    } catch (error) {
      console.log("Error occurred while adding friend:", error)
      toast.error("Đã xảy ra lỗi khi thêm bạn bè")
    }
  }, [])

  const handleCancelRequest = async (item: User) => {
    resetFriendStore()
    cancelFriendRequest(item?.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    setSearchValue(searchValue)
  }

  const handleResetValue = () => {
    setSearchValue("")
    setResultSearch(null)
  }

  const handleCloseModalAddFriend = () => {
    handleResetValue()
    originCloseModal()
  }
  const { nodeRef } = useClickOutSide(handleCloseModalAddFriend)

  useEffect(() => {
    if (!String(debounce)?.trim()) {
      setResultSearch(null)
      return
    }
    const handleSearchUser = async () => {
      setIsLoading(true)
      try {
        const res = await friendServices.searchUser(debounce)
        if (res?.data?.status === 404) {
          setResultSearch(null)
        } else if (res && res?.data) {
          setResultSearch(res.data)
        } else {
          setResultSearch(null)
        }
      } catch (error) {
        console.error("Error occurred while fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    handleSearchUser()
  }, [debounce])

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus()
    }
  }, [inputRef, isModalOpenAddFriend])

  if (!isModalOpenAddFriend) return null

  return (
    <div
      ref={nodeRef as React.RefObject<HTMLDivElement>}
      className={`fixed z-[11] bg-white inset-y-0 left-[58px] w-[339px] `}
    >
      <div className="h-[60px] items-center flex flex-1 justify-between px-4">
        <h2 className="font-semibold text-black text-[20px]">Thêm bạn</h2>
        <div className="divider my-0 py-0 mx-1 h-1 " />
        <button type="button" className="font-bold text-[18px] " onClick={handleCloseModalAddFriend}>
          Close
        </button>
      </div>
      <div className="divider my-0 py-0 mx-1 h-1 " />

      <div className="relative">
        <input
          ref={inputRef}
          onChange={handleChange}
          type="text"
          placeholder="Nhập số điện thoại"
          className="input input-bordered w-full max-w-xs bg-gray-300 m-3"
        />
        <IoMdClose
          size={30}
          className="absolute -translate-y-1/2 transform top-1/2 right-4 hover:text-slate-500 cursor-pointer"
          onClick={handleResetValue}
        />
      </div>

      <div className="flex-1 flex transition-all">
        {isLoading ? (
          <div className="flex justify-center w-full">
            <img src={GifLoading} alt="GifLoading" className="w-[11rem]" />
          </div>
        ) : (
          <div className="flex flex-1 p-[0.8rem] ">
            {isMe && resultSearch ? (
              <AccountItem data={resultSearch} title="(Bạn)" />
            ) : isFriend && resultSearch ? (
              <AccountItem data={resultSearch} title="(Bạn bè)" />
            ) : isSendRequest && resultSearch ? (
              <AccountItem
                title={"Hủy lời mời"}
                data={resultSearch}
                onClick={() => handleCancelRequest(resultSearch)}
              />
            ) : resultSearch ? (
              <AccountItem data={resultSearch} onClick={() => handleAddFriend(resultSearch)} title={"Kết bạn"} />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center">
                <img src={ImgSearch} alt="ImgSearch" className="w-[11rem]" />
                <p className="text-black text-center w-full whitespace-nowrap font-normal  mt-6">
                  Nhập số điện thoại để tìm kiếm
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalAddFriend
