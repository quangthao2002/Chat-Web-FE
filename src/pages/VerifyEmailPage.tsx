import authServices from "@/services/authServices"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useLocation } from "react-router-dom"

const VerifyEmailPage = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const accessToken = query.get("token") || ""
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchApi = async () => {
    try {
      setIsLoading(true)
      const res = await authServices.verifyEmail({ token: accessToken })
      console.log(res)
      if (res.data) {
        setIsSuccess(true)
      } else {
        setIsSuccess(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("error")
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white rounded shadow-md ">
        {isLoading ? (
          <>
            <h2 className="text-2xl font-bold mb-8 text-center">Loading...</h2>
          </>
        ) : isSuccess ? (
          <>
            <h2 className="text-2xl font-bold mb-8 text-center">Confirm Email Successfully</h2>
            <p className="mb-4 text-gray-700 text-center">Now you can can login to your account.</p>

            <Link
              to={"/login"}
              className="w-full text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Back to login
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8 text-center">Something wrong</h2>
            <p className="mb-4 text-gray-700 text-center">Please sign up again</p>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailPage
