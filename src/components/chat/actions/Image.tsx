import { useAuthContext } from "@/context/AuthContext"
import useConversation from "@/zustand/useConversation"
import { CiImageOn } from "react-icons/ci"
import toast from "react-hot-toast"
import axios from "axios"

const Action2 = () => {
  const { selectedConversation, messages, setMessages } = useConversation()
  const { authUser } = useAuthContext()
  const currentUserId = authUser.user.id

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]

    if (!selectedFile) {
      toast.error("No file selected.")
      return
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds the limit.")
      return
    }

    const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (event) => {
          resolve(event.target.result)
        }

        reader.onerror = (err) => {
          reject(err)
        }

        reader.readAsDataURL(file)
      })
    }

    readFileAsDataURL(selectedFile)
      .then((dataUrl) => {
        const newMessage = {
          text: dataUrl,
          userId: currentUserId,
          recipientId: selectedConversation.id,
          created_at: new Date(),
          user: authUser.user,
        }
        setMessages([...messages, newMessage])
      })
      .catch((error) => {
        console.error("Error reading file:", error)
      })

    const formData = new FormData()
    formData.append("image", selectedFile)
    formData.append("userId", currentUserId)
    formData.append("recipientId", selectedConversation.id)
    formData.append("created_at", new Date())

    sendFileToServer(formData)
  }

  const sendFileToServer = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/messages/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Image uploaded successfully:", response.data)
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  return (
    <div>
      <label htmlFor="fileInput">
        <CiImageOn size={25} />
        <input id="fileInput" type="file" accept="image/*" onChange={handleFileSelect} style={{ display: "none" }} />
      </label>
    </div>
  )
}

export default Action2
