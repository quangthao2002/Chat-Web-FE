import React from "react"
import { IoSearchSharp } from "react-icons/io5"
const Search = () => {
  return (
    <form className="flex items-center gap-2">
      <input className="input input-bordered w-screen my-1 ml-1 bg-gray-200  rounded-full" type="text" placeholder="Search..." />
      <button type="submit" className="btn btn-circle bg-gray-200  text-white">
        <IoSearchSharp />
      </button>
    </form>
  )
}

export default Search
