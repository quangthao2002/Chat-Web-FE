import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { useAuthContext } from "@/context/AuthContext"
import { BASE_URL } from "@/utils/constants"

const useSocketClient = (): { getSocket: () => Socket | null; userId: string } => {
  const { authUser } = useAuthContext()
  const { id: userId } = authUser.user
  const socketRef = useRef<Socket | null>(null)
  const { tokens } = JSON.parse(localStorage.getItem("tokens-user") || "{}")
  const { accessToken: token } = tokens ?? {}

  const getSocket = () => socketRef.current

  useEffect(() => {
    socketRef.current = io(BASE_URL, {
      query: { token },
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [userId, token])

  return { getSocket, userId }
}

export default useSocketClient
