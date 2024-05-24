/* eslint-disable @typescript-eslint/no-explicit-any */
import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk"
import { useEffect, useMemo, useRef, useState } from "react"
import ReactPlayer from "react-player"
import { ImPhoneHangUp } from "react-icons/im"
import { IoMdMic } from "react-icons/io"
import { useModalContext } from "@/context/ModalContext"
import { useVideoCallStore } from "@/zustand/useVideoCallStore"
import { CiMicrophoneOff } from "react-icons/ci"

function ParticipantView(props: any) {
  const micRef = useRef<any>(null)
  const { webcamStream, micStream, webcamOn, micOn, isLocal } = useParticipant(props.participantId)

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream()
      mediaStream.addTrack(webcamStream.track)
      return mediaStream
    }
  }, [webcamStream, webcamOn])

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(micStream.track)

        micRef.current.srcObject = mediaStream // Remove optional chaining operator
        micRef.current.play().catch((error: any) => console.error("videoElem.current.play() failed", error))
      } else {
        micRef.current.srcObject = null // Remove optional chaining operator
      }
    }
  }, [micStream, micOn])

  return (
    <div>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"400px"}
          width={"400px"}
          onError={(err) => {
            console.log(err, "participant video error")
          }}
        />
      )}
    </div>
  )
}

function MeetingView() {
  const { handleCloseModalVideoCall: originalCloseModal } = useModalContext()
  const [joined, setJoined] = useState<string>("")
  const { isMicEnabled, toggleMic } = useVideoCallStore()
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants, end } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED")
    },
  })
  const joinMeeting = () => {
    setJoined("JOINING")
    join()
  }

  const handleCloseModalVideoCall = () => {
    end()
    originalCloseModal()
  }

  useEffect(() => {
    setTimeout(() => {
      joinMeeting()
    }, 800)
  }, [])

  return (
    <div className="relative flex text-white items-center justify-center w-full h-screen bg-black">
      {joined && joined == "JOINED" ? (
        <div className="flex items-center flex-wrap gap-4">
          {[...participants.keys()].map((participantId) => {
            return <ParticipantView participantId={participantId} key={participantId} />
          })}
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join the meeting</button>
      )}
      <div className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 ">
        <div className="flex items-center gap-5 justify-center p-6">
          <button
            type="button"
            onClick={toggleMic}
            className="p-3 bg-slate-300 border border-gray-400 hover:opacity-70 cursor-pointer shadow-inner rounded-full"
          >
            {isMicEnabled ? <IoMdMic size={43} color="#333" /> : <CiMicrophoneOff size={43} color="#333" />}
          </button>
          <button
            type="button"
            onClick={handleCloseModalVideoCall}
            className="p-3 bg-red-500 border border-red-400 hover:opacity-70 cursor-pointer shadow-inner rounded-full"
          >
            <ImPhoneHangUp size={43} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  )
}
const Room = () => {
  const { isMicEnabled } = useVideoCallStore()
  return (
    <MeetingProvider
      config={{
        meetingId: "duhf-2o7x-6wt8",

        micEnabled: isMicEnabled,
        webcamEnabled: true,
        name: "Đạt's Org",

        autoConsume: false,
        preferredProtocol: undefined,
        participantId: undefined,
        debugMode: true,
      }}
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2YWNlNDkzMi1iYWNhLTRhOTMtYmIxZC05YTM1OGMxMWE1YWUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNjU1MzkxNSwiZXhwIjoxNzE2NjQwMzE1fQ.Wtj8RFpQzU9DFydBshkrQYwsDzgcfj7IaZOiQo9Xs4w"
    >
      <MeetingView />
    </MeetingProvider>
  )
}
export default Room
