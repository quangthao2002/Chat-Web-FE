import { useCalculateVoiceVolume } from "@/hooks/video/useCalculateVoiceVolume"
import React, { useEffect, useState } from "react"
import { VoiceVisualizer } from "./VoiceVisualizer"

interface IProps {
  id: string
  autoPlay: boolean
  playsInline: boolean
}
const RemoteVideo = ({ id, autoPlay, playsInline }: IProps) => {
  const [mediaStream, setMediaStream] = useState<any>(undefined)

  useCalculateVoiceVolume(mediaStream, id)

  useEffect(() => {
    const interval = setInterval(() => {
      const videoElement = document.getElementById(id) as HTMLVideoElement
      const stream = videoElement?.srcObject

      if (stream) {
        setMediaStream(stream)
        clearInterval(interval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [id])

  return (
    <div className="w-[3rem] h-[3rem]">
      <VoiceVisualizer id={id} />
      <video id={id} className="w-full h-full" autoPlay={autoPlay} playsInline={playsInline} />
    </div>
  )
}

export default RemoteVideo
