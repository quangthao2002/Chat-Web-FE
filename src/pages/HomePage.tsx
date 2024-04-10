import { Tab, useTabContext } from "@/context/TabContext"
import MainLayout from "@/layouts/MainLayout"
import { NoChatSelected } from "./NoChatSelected"
import useConversation from "@/zustand/useConversation"
import { useEffect } from "react"
import { useSidebarContext } from "@/context/SideBarContext"
import ConversationInfo from "@/components/header/ConversationInfo"
import MessageContainer from "@/components/message/MessageContainer"
import Chat from "@/components/chat"
import Header from "@/components/header/HeaderMessage"

const HomePage = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  // const { isSidebarOpen } = useSidebarContext();
  useEffect(() => {
    return () => {
      setSelectedConversation(null)
    }
  }, [setSelectedConversation])
  const { isSidebarOpen } = useSidebarContext()
  return (
    <MainLayout>
      <div className="flex flex-1">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="md:min-w-[450px] flex flex-col flex-1">
              <Header />
              <MessageContainer />
              <Chat />
            </div>
            {isSidebarOpen && <ConversationInfo />}
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default HomePage
