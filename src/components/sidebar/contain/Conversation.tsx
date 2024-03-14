const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex gap-3 justify-between">
            <p className="text-lg font-semibold">Quang Thảo</p>
            <span className="text-xs text-gray-400">10:30 AM</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 mx-1 h-1 "/>
    </>
  )
}

export default Conversation
