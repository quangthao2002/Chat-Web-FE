import Categories from "./components/categories"
import Chat from "./components/chat"
import Header from "./components/header/HeaderMessage"
import MessageContainer from "./components/message/MessageContainer"
import Sidebar from "./components/sidebar"
import LoginSignUp from "./components/LoginSignup/LoginSignup"

function App() {
  return (
    <div>
      {/* <LoginSignUp/> */}
      <div className="flex overflow-hidden max-h-screen">
        <Categories />
        <Sidebar />
        <div className="md:min-w-[450px] flex flex-col flex-1">
          <Header />
          <MessageContainer />
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default App
