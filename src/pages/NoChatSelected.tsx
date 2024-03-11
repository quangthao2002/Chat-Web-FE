export const NoChatSelected = () => {
  return (
    <div className='flex justify-center bg-white  w-full h-full'>
        <div className='px-4 mb-4 mt-40  sm:text-lg md:text-xl  font-semibold flex flex-col items-center gap-2 ]'>
                <p className="text-gray-950 text-2xl font-normal ">Chào mừng bạn đến với <span className="font-semibold">Zala Web!</span> </p>
                <p className="text-sm font-normal text-custom-color overflow-auto mb-8 ">Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hoá cho máy tính của bạn.</p>
                <img src="https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png" alt="chat" width="380" height="228" />
            <p className="text-blue-600 text-lg mt-4 font-semibold">Nhắn tin nhiều hơn soạn thảo ít hơn</p>
            <p className="text-sm font-normal text-custom-color overflow-auto mt-2">Sử dụng tin nhắn nhanh để lưu sẵn các tin nhắn thường dùng và gửi nhanh trong hội thoại bất kỳ.</p>
        </div>
    </div>  
  )
}
