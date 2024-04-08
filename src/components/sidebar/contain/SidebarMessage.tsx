import useGetConversations from "@/hooks/useGetConversations"
import Conversation from "./Conversation"
import useConversation from "@/zustand/useConversation"
import { useAuthContext } from "@/context/AuthContext"
import useSocket from "@/zustand/useSocket"

const SidebarMessage = () => {
  const { loading, conversation } = useGetConversations()
  const { usersOnline } = useConversation()
  const { authUser } = useAuthContext()
  const currentUserId = authUser.user.id
  useSocket(currentUserId)

  return (
    <div className="py-2 flex flex-col max-h-screen overflow-auto ">
      {conversation?.map((user: any, index: number) => (
        <Conversation key={user?.id} conversation={user} lastIndex={index === conversation.length - 1} />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  )
}

export default SidebarMessage
