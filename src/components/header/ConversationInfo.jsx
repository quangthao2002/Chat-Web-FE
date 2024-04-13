import useConversation from "@/zustand/useConversation"
import React, { useState } from "react"

const ConversationInfo = () => {
  const { selectedConversation } = useConversation()

  const [showMembers, setShowMembers] = useState(false)

  const handleMembersClick = () => {
    setShowMembers(!showMembers)
  }
  return (
    <div className="flex flex-col bg-slate-200 w-96 ">
      <div className="flex flex-col items-center">
        <h1 className="text-black font-extrabold mt-3 mb-3">
          {selectedConversation.name ? "Thông tin nhóm" : "Thông tin họp thoại"}
        </h1>
        <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
        <div className="avatar mt-1 ml-2">
          <div className="w-12 rounded-full">
            <img src={selectedConversation.avatar} />
          </div>
        </div>
        <p className="font-bold text-black mt-3 mb-2">{selectedConversation.name}</p>
      </div>

      <div className="divider my-0 py-0 mx-1 h-1 mb-2" />

      <div className="ml-4">
        <div className="mb-4 mt-2">
          <p className="text-black font-bold">{selectedConversation.name ? "Thành viên nhóm" : "Nhóm chung"}</p>
          {selectedConversation.users && (
            <p className="text-gray-600 mb-2" onClick={handleMembersClick}>
              {selectedConversation.users.length} thành viên
            </p>
          )}
          {showMembers && selectedConversation.users && (
            <div>
              {selectedConversation.users.map((user, index) => (
                <div key={index} className="flex flex-row gap-2">
                  <div className="avatar mt-1 ml-2">
                    <div className="w-12 rounded-full">
                      <img src={user.avatar} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-600 mt-2">{user.username}</p>
                    {selectedConversation.ownerId === user.id && <p className="text-gray-500 ">Trưởng nhóm</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="divider my-0 py-0 mx-1 h-1 mb-2 " />
        <div className="mt-4">
          <p className="text-black font-bold">Ảnh/Video </p>
          {/* ... */}
          <button className="btn btn-md bg-gray-300 w-80 h-4 text-black">Xem tất cả ảnh</button>
        </div>
        <div className="mt-4 mb-4">
          <p className="text-black font-bold">File</p>
          {/* ... */}
          <button className="btn btn-md bg-gray-300 w-80 h-4 text-black">Xem tất cả ảnh</button>
        </div>
        <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
        <div className="mt-4">
          <p className="text-black font-bold">Thiết lập bảo mật </p>
          {/* ... */}
          <div className="mt-4">
            <p className="font-semibold text-red-600 mb-2">Xóa lịch sử cuộc trò chuyện</p>
            <p className="font-semibold text-red-600">Rời nhóm</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationInfo
