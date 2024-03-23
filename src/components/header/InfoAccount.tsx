import useConversation from "@/zustand/useConversation"

const InfoAccount = () => {
  const { selectedConversation } = useConversation()

  return (
    <div className="flex gap-2">
      <div className="avatar mt-1 ml-2">
        <div className="w-12 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="flex flex-col  justify-center">
        <p className="text-custom-color font-semibold text-lg">{selectedConversation.username}</p>
        <p className="text-xs opacity-50">Active 12m ago</p>
      </div>
    </div>
  )
}

export default InfoAccount
