/* eslint-disable @typescript-eslint/no-explicit-any */
import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk"
import { useEffect, useMemo, useRef, useState } from "react"
import ReactPlayer from "react-player"
import { ImPhoneHangUp } from "react-icons/im"
import { IoMdMic } from "react-icons/io"
import { useModalContext } from "@/context/ModalContext"

function ParticipantView(props: any) {
  const micRef = useRef(null)
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

        micRef.current.srcObject = mediaStream
        micRef.current.play().catch((error) => console.error("videoElem.current.play() failed", error))
      } else {
        micRef.current.srcObject = null
      }
    }
  }, [micStream, micOn])

  return (
    <div>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          playsinline // very very imp prop
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
  const [joined, setJoined] = useState(null)
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
            // if (participantId === presenterId)
            //   return (
            //     <div className="fixed bottom-0 right-0 w-[20%]">
            //       <ParticipantView participantId={participantId} key={participantId} />
            //     </div>
            //   )
            return <ParticipantView participantId={participantId} key={participantId} />
          })}
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join the meeting</button>
      )}
      <div className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 ">
        <div className="flex items-center gap-5 justify-center p-4">
          <IoMdMic
            size={43}
            color="#333"
            className="p-3 bg-slate-300 border border-gray-400 hover:opacity-70 cursor-pointer shadow-inner rounded-full"
          />
          <ImPhoneHangUp
            onClick={handleCloseModalVideoCall}
            size={43}
            color="#fff"
            className="p-3 bg-red-500 border border-red-400 hover:opacity-70 cursor-pointer shadow-inner rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
const Room = () => {
  return (
    <MeetingProvider
      config={{
        meetingId: "duhf-2o7x-6wt8",
        micEnabled: true,
        webcamEnabled: true,
        name: "Đạt's Org",
        debugMode: false, // Add debugMode property with value false
      }}
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2YWNlNDkzMi1iYWNhLTRhOTMtYmIxZC05YTM1OGMxMWE1YWUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNDgzMzA0MSwiZXhwIjoxNzE0OTE5NDQxfQ.QRElR7I8uWARNJITu77E7wysD_AHZEj9laKkLxtK_o0"
    >
      <MeetingView />
    </MeetingProvider>
  )
}
export default Room
