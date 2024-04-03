import Chat from "@/components/chat"
import Header from "@/components/header/HeaderMessage"
import MessageContainer from "@/components/message/MessageContainer"
import MainLayout from "@/layouts/MainLayout"
import { NoChatSelected } from "./NoChatSelected"
import useConversation from "@/zustand/useConversation"
import { useEffect } from "react"

const HomePage = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    return () => {
      setSelectedConversation(null)
    }
  }, [setSelectedConversation])

  return (
    <MainLayout>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="md:min-w-[450px] flex flex-col flex-1">
            <Header />
            <MessageContainer />
            <Chat />
          </div>
        </>
      )}
    </MainLayout>
  )
}

export default HomePage
