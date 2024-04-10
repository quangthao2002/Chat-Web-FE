import useGetConversations from "@/hooks/useGetConversations"
import Conversation from "./Conversation"
import { useEffect, useState } from "react"
import { useAuthContext } from "@/context/AuthContext"
import useSocket from "@/zustand/useSocket"

const SidebarMessage = () => {
  const [userOnline, setUserOnline] = useState(new Map())
  const { loading, conversation } = useGetConversations()
  const { authUser } = useAuthContext()
  const userId = authUser.user.id
  const { getSocket } = useSocket(userId)

  useEffect(() => {
    const socket = getSocket()
    socket?.on("getUsersOnline", (usersOnline) => {
      setUserOnline(new Map(usersOnline))
      console.log("Users Online:", usersOnline)
    })
  }, [getSocket])
  console.log("con:P", conversation)

  return (
    <div className="py-2 flex flex-col max-h-screen overflow-auto ">
      {conversation?.map((user: any, index: number) => (
        <Conversation
          key={user?.id}
          conversation={user}
          usersOnline={userOnline}
          lastIndex={index === conversation.length - 1}
        />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  )
}

export default SidebarMessage
