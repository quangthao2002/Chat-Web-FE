import { Tab, useTabContext } from "@/context/TabContext"
import MainLayout from "@/layouts/MainLayout"
import ChatPage from "./ChatPage"
import PhoneBookPage from "./PhoneBookPage"

const HomePage = () => {
  const { activeTab } = useTabContext()

  return <MainLayout>{activeTab === Tab.Chat ? <ChatPage /> : <PhoneBookPage />}</MainLayout>
}

export default HomePage
