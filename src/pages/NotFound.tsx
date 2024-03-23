import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className=" h-screen flex items-center justify-center mx-auto">
      <Link to="/" className="p-4 rounded-2xl bg-green-500 ">
        <span className="text-[20px] ">Back to Home</span>
      </Link>
    </div>
  )
}

export default NotFound
