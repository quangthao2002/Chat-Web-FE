import React, { useContext, createContext } from "react"

type Video = "home" | "phone-book"

interface VideoContextType {
  activeVideo: Video
  setActiveVideo: (tab: Video) => void
}
const VideoContext = createContext({} as VideoContextType)
export const useVideoContext = () => useContext(VideoContext)

const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeVideo, setActiveVideo] = React.useState<Video>("home")

  return <VideoContext.Provider value={{ activeVideo, setActiveVideo }}>{children}</VideoContext.Provider>
}

export default VideoProvider
