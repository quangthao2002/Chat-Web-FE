import { useAuthContext } from "@/context/AuthContext"
import useConversation from "@/zustand/useConversation"
import { CiImageOn } from "react-icons/ci"
import toast from "react-hot-toast"

import { sendFileToServer } from "@/features/uploadFile/uploadFile"

const Image = () => {
  const { selectedConversation, messages, setMessages } = useConversation()
  const { authUser } = useAuthContext()
  const currentUserId = authUser.user.id

  const handleImageSelect = async (event) => {
    const files = event.target.files

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
    formData.append("roomId", selectedConversation?.ownerId ? selectedConversation?.id : null)
    formData.append("recipientId", !selectedConversation?.ownerId ? selectedConversation?.id : null)
    formData.append("created_at", new Date())

    const fileUrl = await sendFileToServer(formData)
    const newMessages = []
    for (const file of fileUrl) {
      const newMessage = {
        text: file,
        userId: currentUserId,
        roomId: selectedConversation?.ownerId ? selectedConversation?.id : null,
        recipientId: !selectedConversation?.ownerId ? selectedConversation?.id : null,
        created_at: new Date(),
        user: authUser.user,
      }
      newMessages.push(newMessage)
    }
    !selectedConversation.ownerId ? setMessages([...messages, ...newMessages]) : null
  }

  return (
    <div>
      <label htmlFor="imageInput">
        <CiImageOn size={25} />
        <input
          id="imageInput"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: "none" }}
        />
      </label>
    </div>
  )
}

export default Image
