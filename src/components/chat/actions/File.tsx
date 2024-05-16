/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "@/context/AuthContext"
import useConversation from "@/zustand/useConversation"
import { MdAttachFile } from "react-icons/md"

import { sendFileToServer } from "@/features/uploadFile/uploadFile"
import toast from "react-hot-toast"

const File = () => {
  const { selectedConversation, messages, setMessages } = useConversation()
  const { authUser } = useAuthContext()

  const currentUserId = authUser?.user?.id

  const handleFileSelect = async (event: any) => {
    const files = event.target.files
    const date = String(new Date())

    if (!files) {
      toast.error("No file selected.")
      return
    }
    const formData = new FormData()

    Array.from(files).forEach((file: unknown) => {
      const typedFile = file as File

      if (typedFile.size > 5 * 1024 * 1024) {
        toast.error(`File "${typedFile.name}" size exceeds the limit.`)
        return
      }
      formData.append("image", typedFile)
    })
    formData.append("userId", currentUserId)
    formData.append("roomId", selectedConversation?.ownerId ? selectedConversation.id : null)
    formData.append("recipientId", !selectedConversation?.ownerId ? selectedConversation.id : null)
    formData.append("created_at", date)

    const fileUrl = await sendFileToServer(formData)
    const newMessages = []
    for (const file of fileUrl) {
      const newMessage = {
        text: file,
        userId: currentUserId,
        roomId: selectedConversation?.ownerId ? selectedConversation.id : null,
        recipientId: !selectedConversation?.ownerId ? selectedConversation.id : null,
        created_at: new Date(),
        user: authUser?.user,
      }
      newMessages.push(newMessage)
    }
    !selectedConversation.ownerId ? setMessages([...messages, ...newMessages]) : null
  }

  return (
    <div>
      <label htmlFor="fileInput">
        <MdAttachFile size={25} />
        <input
          id="fileInput"
          type="file"
          multiple
          accept=".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.7z,.txt,.csv,.mp4, .avi, .mov, .wmv, .flv"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </label>
    </div>
  )
}

export default File
