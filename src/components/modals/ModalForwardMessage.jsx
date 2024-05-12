import { useAuthContext } from "@/context/AuthContext"
import useGetConversations from "@/hooks/useGetConversations"
import useConversation from "@/zustand/useConversation"
import useSocket from "@/zustand/useSocket"
import { useState } from "react"
import toast from "react-hot-toast"
import { IoMdClose } from "react-icons/io"
import Modal from "react-modal"

const ModalForwardMessage = ({ onClose, messageForward }) => {
  const { sendMessage, sendGroupMessage } = useSocket()
  const { selectedConversation } = useConversation()
  const { conversation } = useGetConversations()
  const [selectedUsers, setSelectedUsers] = useState([])
  const { authUser } = useAuthContext()
  const ownerId = authUser?.user?.id

  Modal.setAppElement("#root")

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId])
  }
  const handleUserDeselect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((id) => id !== userId))
  }
  const handleForwardMessage = () => {
    selectedUsers.map((newRecipientId) => {
      const forwardMsg = {}
      forwardMsg.text = messageForward.text
      forwardMsg.userId = messageForward?.user?.id
      forwardMsg.recipientId = !selectedConversation?.ownerId ? newRecipientId : null
      forwardMsg.roomId = selectedConversation?.ownerId ? newRecipientId : null
      forwardMsg.created_at = new Date()
      if (selectedConversation.ownerId) {
        sendGroupMessage(forwardMsg)
      } else {
        sendMessage(forwardMsg)
      }
    })

    onClose()
    toast.success("Chuyển tiếp tin nhắn thành công")
  }

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{
        content: {
          width: "550px",
          height: "450px",
          margin: "auto",
        },
      }}
    >
      <div className="flex flex-1 justify-between">
        <h2 className="font-bold text-black mb-2">Chuyển tiếp tin nhắn</h2>
        <div className="divider my-0 py-0 mx-1 h-1 " />
        <button onClick={onClose}>
          <IoMdClose size={25} />
        </button>
      </div>

      <div className="divider my-0 py-0 mx-1 h-1 " />
      <h2 className="text-black font-semibold mt-2">Add member</h2>
      <div className="max-h-56 overflow-y-auto">
        {conversation.map((user) => {
          if (user.id !== ownerId && user?.id !== messageForward.recipientId && user?.id !== messageForward?.user?.id) {
            return (
              <div key={user.id} className="flex gap-3 p-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleUserSelect(user.id)
                    } else {
                      handleUserDeselect(user.id)
                    }
                  }}
                />
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.avatar} />
                  </div>
                </div>
                <label className="mt-2">{user.username || user.name}</label>
              </div>
            )
          }
        })}
      </div>
      <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
      <div className="flex justify-end  gap-2">
        <button className="btn btn-md" onClick={onClose}>
          Close
        </button>
        <button className="btn btn-neutral btn-md" onClick={handleForwardMessage}>
          Chuyển tiếp
        </button>
      </div>
    </Modal>
  )
}

export default ModalForwardMessage
