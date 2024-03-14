interface IProps {
  message: string
  time: string
  name: string
  isMe?: boolean
  isSeen?: boolean
}
const Message = ({ message, time, name, isMe, isSeen }: IProps) => {
  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://cdnphoto.dantri.com.vn/ozvc95HIDvN36oHepMq5XpS8Cpc=/thumb_w/960/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg"
          />
        </div>
      </div>
      <div className="chat-header px-1">
        {name}
        <time className="text-xs opacity-50 ml-1">{time}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      {isSeen && <div className="chat-footer opacity-50">Seen at 12:46</div>}
    </div>
  )
}

export default Message
