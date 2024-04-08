import useGetConversations from "@/hooks/useGetConversations"
import Conversation from "./Conversation"

const SidebarMessage = () => {
  const { loading, conversation } = useGetConversations()
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
