import Chat from "@/components/chat"
import Header from "@/components/header/HeaderMessage"
import MessageContainer from "@/components/message/MessageContainer"
import MainLayout from "@/layouts/MainLayout"
import { NoChatSelected } from "./NoChatSelected"

const HomePage = () => {
  const noChatSelected = false
  return (
    <MainLayout>
      {noChatSelected ? (
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
