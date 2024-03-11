import { IoSearchSharp } from "react-icons/io5"
const Search = () => {
  return (
    <>
    <form className="flex items-center gap-2 m-2">
      <input className="input input-bordered w-screen my-1 ml-1 bg-gray-200  rounded-full" type="text" placeholder="Search..." />
      <button type="submit" className="btn btn-circle border-none bg-gray-200  text-white">
        <IoSearchSharp />
      </button>
    </form>
    <div className="divider my-0 py-0 mx-0 h-1 "/>

    </>
    
  )
}

export default Search
