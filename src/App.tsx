import Categories from "./components/categories"
import Chat from "./components/chat"
import Header from "./components/header"
import Message from "./components/message"
import Sidebar from "./components/sidebar"
// import Login from "./components/loginForm"

function App() {
  return (
    <div>
      {/* <Login/> */}
      <div className="flex">
        <Categories />
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <Message />
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default App
