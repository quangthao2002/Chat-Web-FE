import useGetConversations from "@/hooks/useGetConversations"
import useConversation from "@/zustand/useConversation"
import { useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import UserListModal from "@/components/modal/UserListModal"
import { IoPersonAddOutline } from "react-icons/io5";
import AddFriend from "@/components/modal/AddFriend"
const Search = () => {
  const [search, setSearch] = useState("")
  const [isModalOpenCreateGroup,setIsModalOpenCreateGroup] = useState(false)
  const [isModalOpenAddFriend,setIsModalOpenAddFriend] = useState(false)
  const { setSelectedConversation } = useConversation()
  const { conversation } = useGetConversations()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search === "") return
    if (search.length < 3) return toast.error("Search must be at least 3 characters")
    const searchResult = conversation.find((conv) => conv.username.toLowerCase().includes(search.toLowerCase()))
    if (searchResult) {
      setSelectedConversation(searchResult)
      setSearch("")
    } else {
      toast.error("No user found")
    }
  }

  const handleOpenModalCreateGroup = () => {
    setIsModalOpenCreateGroup(true)
    
    
  }
  const handleCloseModalCreateGroup = () => {
    setIsModalOpenCreateGroup(false)
  }
  const handleOpenModalAddFriend = () => {
    setIsModalOpenAddFriend(true)
    console.log("open modal")
  }
  const handleCloseModalAddFriend = () => {
    setIsModalOpenAddFriend(false)
  }
  return (
    <>
      <form className="flex items-center gap-1 m-2" onSubmit={handleSearch}>
        <input
          className="input input-bordered w-56 my-1  bg-gray-200  rounded-full"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      
        <button type="submit" className="btn btn-circle border-none bg-gray-200  text-white" title="Thêm bạn" onClick={handleOpenModalAddFriend}>
          <IoPersonAddOutline />
        </button>
        {isModalOpenAddFriend && <AddFriend  onClose={handleCloseModalAddFriend} />}
        <button type="submit" className="btn btn-circle border-none bg-gray-200  text-white" title="Tạo nhóm chat" onClick={handleOpenModalCreateGroup}>
          <AiOutlineUsergroupAdd />
        </button>
        {isModalOpenCreateGroup && <UserListModal onClose ={handleCloseModalCreateGroup} />}
      </form>
      <div className="divider my-0 py-0 mx-0 h-1 " />
    </>
  )
}

export default Search
