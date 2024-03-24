import { useCalculateVideoLayout } from "@/hooks/video/useCalculateVideoLayout"
import { useCreateMediaStream } from "@/hooks/video/useCreateMediaStream"
import { useStartPeerSession } from "@/hooks/video/useStartPeerSession"
import { toggleFullscreen } from "@/utils/video/helper"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import RemoteVideo from "./RemoteVideo"
import VideoControls from "./VideoControls"
import { VoiceVisualizer } from "./VoiceVisualizer"

const Room = () => {
  const room = 1
  const galleryRef = useRef<any>()
  const localVideoRef = useRef<any>()
  const mainRef = useRef<any>()

  const userMediaStream = useCreateMediaStream(localVideoRef)
  const { connectedUsers, shareScreen, cancelScreenSharing, isScreenShared } = useStartPeerSession(
    room,
    userMediaStream,
    localVideoRef,
  )

  // useCalculateVideoLayout(galleryRef, connectedUsers.length + 1)

  async function handleScreenSharing(share: any) {
    if (share) {
      await shareScreen()
    } else {
      await cancelScreenSharing()
    }
  }

  function handleFullscreen(fullscreen: any) {
    if (mainRef.current) {
      toggleFullscreen(fullscreen, mainRef.current)
    }
  }

  return (
    <div ref={mainRef} className="w-full h-full bg-black flex items-center justify-center">
      <div ref={galleryRef} className="w-full h-full flex items-center justify-center">
        {connectedUsers?.length > 0 && (
          <div className="flex flex-wrap w-full flex-1 justify-center">
            {connectedUsers.map((user) => (
              <RemoteVideo key={user} id={user} autoPlay playsInline />
            ))}
          </div>
        )}

        <div className={connectedUsers?.length > 0 ? "w-[20%] fixed bottom-0 right-0" : "object-cover"}>
          {/* <VoiceVisualizer id={"local"} /> */}
          <video ref={localVideoRef} className="w-full h-full" autoPlay playsInline muted />
        </div>
      </div>

      <div className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 ">
        <VideoControls />
      </div>
    </div>
  )
}

export default Room
