import { MdAttachFile } from "react-icons/md"
import { useAuthContext } from "@/context/AuthContext"
import useConversation from "@/zustand/useConversation"

import toast from "react-hot-toast"
import axios from "axios"
const File = () => {
  const { selectedConversation, messages, setMessages } = useConversation()
  const { authUser } = useAuthContext()

  const currentUserId = authUser.user.id

  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files[0]

    if (!selectedFile) {
      toast.error("No file selected.")
      return
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds the limit.")
      return
    }

    const formData = new FormData()
    formData.append("image", selectedFile)
    formData.append("userId", currentUserId)
    formData.append("recipientId", selectedConversation.id)
    formData.append("created_at", new Date())

    const fileUrl = await sendFileToServer(formData)

    const newMessage = {
      text: fileUrl,
      userId: currentUserId,
      recipientId: selectedConversation.id,
      created_at: new Date(),
      user: authUser.user,
    }
    setMessages([...messages, newMessage])
  }

  const sendFileToServer = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/messages/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }
  return (
    <div>
      <label htmlFor="fileInput">
        <MdAttachFile size={25} />
        <input
          id="fileInput"
          type="file"
          accept=".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.7z,.txt,.csv,.mp4, .avi, .mov, .wmv, .flv"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </label>
    </div>
  )
}

export default File
