/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "@/context/AuthContext"
import useConversation from "@/zustand/useConversation"
import { CiImageOn } from "react-icons/ci"
import toast from "react-hot-toast"
import { sendFileToServer } from "@/features/uploadFile/uploadFile"

const Image = () => {
  const { selectedConversation, messages, setMessages } = useConversation()
  const { authUser } = useAuthContext()
  const currentUserId = authUser?.user?.id

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) {
      toast.error("No file selected.")
      return
    }

    const formData = createFormData(files, currentUserId, selectedConversation)
    const fileUrls = await sendFileToServer(formData)
    const newMessages = createNewMessages(fileUrls, currentUserId, authUser?.user, selectedConversation)

    setMessages([...messages, ...newMessages])
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

function createFormData(files: FileList, currentUserId: string, selectedConversation: any) {
  const formData = new FormData()

  Array.from(files).forEach((file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`File "${file.name}" size exceeds the limit.`)
      return
    }
    formData.append("image", file)
  })

  formData.append("userId", currentUserId)
  formData.append("roomId", selectedConversation?.ownerId ? selectedConversation?.id : null)
  formData.append("recipientId", !selectedConversation?.ownerId ? selectedConversation?.id : null)
  formData.append("created_at", new Date().toISOString())

  return formData
}

function createNewMessages(fileUrls: string[], currentUserId: string, user: any, selectedConversation: any) {
  return fileUrls.map((fileUrl) => ({
    text: fileUrl,
    userId: currentUserId,
    roomId: selectedConversation?.ownerId ? selectedConversation?.id : null,
    recipientId: !selectedConversation?.ownerId ? selectedConversation?.id : null,
    created_at: new Date().toISOString(),
    user,
  }))
}

export default Image
