import React from "react"

const Message = () => {
  return (
 <>
  <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-header px-1">
    Quang Thảo
    <time className="text-xs opacity-50 ml-1">12:45</time>
  </div>
  <div className="chat-bubble chat-bubble-info">Hi! Xin chào bạn !!</div>
  
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-header">
    Ngọc Lan
    <time className="text-xs opacity-50 ml-1">12:46</time>
  </div>
  <div className="chat-bubble ">Chào bạn</div>
  <div className="chat-footer opacity-50">
    Seen at 12:46
  </div>
</div>
 </>
  )
}

export default Message
