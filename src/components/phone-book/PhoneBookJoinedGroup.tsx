import { useAuthContext } from "@/context/AuthContext"
import ImgEmpty from "@/assets/img/empty.png"

const PhoneBookJoinedGroup = () => {
  const { authUser } = useAuthContext()

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white h-[77px] flex items-center px-5">
        <h1 className="text-[25px] font-semibold ">
          Nhóm của <span className="text-blue-400">{authUser?.user?.fullName}</span>
        </h1>
      </div>

      <div className="bg-slate-100 flex-1 p-3">
        <div className="flex flex-col gap-6 justify-center items-center py-[62px]">
          <img src={ImgEmpty} alt="friend-request-sended" className="w-[123px]" />
          <p className="text-[18px] font-medium text-gray-500">Không có nhóm nào</p>
        </div>
        <div className="grid grid-cols-2 gap-4"></div>
      </div>
    </div>
  )
}

export default PhoneBookJoinedGroup
