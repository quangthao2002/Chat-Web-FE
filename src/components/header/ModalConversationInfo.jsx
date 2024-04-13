import { useModalContext } from "@/context/ModalContext"
import { useSidebarContext } from "@/context/SideBarContext"
import useConversation from "@/zustand/useConversation"
import React, { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { IoIosArrowDown, IoMdClose } from "react-icons/io"

const ModalConversationInfo = () => {
  const { selectedConversation } = useConversation()
  const [showMembers, setShowMembers] = useState(false)
  const { isSidebarOpen, toggleSidebar } = useSidebarContext()
  const { handleOpenModalAddMember } = useModalContext()

  const handleMembersClick = () => {
    setShowMembers(!showMembers)
  }

  return (
    <div className={`${isSidebarOpen ? "fixed" : "hidden"} z-[1] inset-0 bg-black/40 flex justify-end `}>
      <div className={`flex flex-col pb-5 overflow-y-scroll bg-slate-200 w-96 duration-1000 transition-all transform `}>
        <div className="flex flex-col items-center">
          <div className="flex items-center w-full justify-between px-4">
            <h1 className="text-black font-extrabold mt-3 mb-3">
              {selectedConversation?.name ? "Thông tin nhóm" : "Thông tin họp thoại"}
            </h1>
            <IoMdClose size={30} className=" hover:text-slate-500 cursor-pointer" onClick={toggleSidebar} />
          </div>
          <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
          <div className="avatar mt-1 ml-2">
            <div className="w-12 rounded-full">
              <img src={selectedConversation?.avatar} />
            </div>
          </div>
          <p className="font-bold text-black mt-3 mb-2">{selectedConversation?.name}</p>
        </div>

        <div className="divider my-0 py-0 mx-1 h-1 mb-2" />

        <div className="ml-4 flex-1">
          <div className="mb-4 mt-2">
            <button type="button" onClick={handleMembersClick} className="w-full pr-2 ">
              <div className="flex items-center justify-between w-full">
                <p className="text-black font-bold">{selectedConversation?.name ? "Thành viên nhóm" : "Nhóm chung"}</p>
                <IoIosArrowDown
                  size={30}
                  className={`${showMembers ? "rotate-180" : ""} transform transition-all duration-300`}
                />
              </div>
              {selectedConversation?.users && (
                <p className="text-gray-600 mb-2 text-start">{selectedConversation?.users.length} thành viên</p>
              )}
            </button>

            {showMembers && selectedConversation.users && (
              <div className="flex flex-col gap-1 flex-1">
                <button onClick={handleOpenModalAddMember} className="btn btn-md bg-gray-400 w-80 h-4 text-black">
                  Thêm thành viên
                </button>

                {selectedConversation.users.map((user, index) => (
                  <div
                    key={index}
                    className="relative flex flex-row items-center py-2 px-3 gap-2 group hover:bg-blue-200 cursor-pointer transition-all"
                  >
                    <div className="avatar ">
                      <div className="w-12 rounded-full">
                        <img src={user.avatar} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-600 mt-2">{user.username}</p>
                      {selectedConversation.ownerId === user.id && <p className="text-gray-500 ">Trưởng nhóm</p>}
                    </div>
                    <BsThreeDots size={25} className="ml-auto " />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="divider my-0 py-0 mx-1 h-1 mb-2 " />
          <div className="mt-4">
            <p className="text-black font-bold">Ảnh/Video </p>
            <button className="btn btn-md bg-gray-300 w-80 h-4 text-black">Xem tất cả ảnh</button>
          </div>

          <div className="mt-4 mb-4">
            <p className="text-black font-bold">File</p>
            <button className="btn btn-md bg-gray-300 w-80 h-4 text-black">Xem tất cả ảnh</button>
          </div>

          <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
          <div className="mt-4">
            <p className="text-black font-bold">Thiết lập bảo mật </p>
            <div className="mt-4 ">
              <button
                type="button"
                className="cursor-pointer w-full hover:bg-blue-200 py-2 px-4 font-semibold text-red-600 mb-2"
              >
                Xóa lịch sử cuộc trò chuyện
              </button>
              <button
                type="button"
                className="cursor-pointer w-full hover:bg-blue-200 py-2 px-4 font-semibold text-red-600"
              >
                Rời nhóm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalConversationInfo
