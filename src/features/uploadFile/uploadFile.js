import axios from "axios"

export const sendFileToServer = async (formData) => {
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
