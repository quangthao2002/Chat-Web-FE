/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

export const sendFileToServer = async (formData: any) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/messages/uploadFile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error uploading image:", error)
  }
}
