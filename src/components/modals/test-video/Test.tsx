/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from "react"
import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk"
import ReactPlayer from "react-player"

function ParticipantView(props: any) {
  const micRef = useRef(null)
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(props.participantId)

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
          height={"300px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error")
          }}
        />
      )}
    </div>
  )
}

function MeetingView() {
  const [joined, setJoined] = useState(null)
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED")
    },
  })
  const joinMeeting = () => {
    setJoined("JOINING")
    join()
  }

  return (
    <div className="container">
      {joined && joined == "JOINED" ? (
        <div>
          {[...participants.keys()].map((participantId) => (
            <ParticipantView participantId={participantId} key={participantId} />
          ))}
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join the meeting</button>
      )}
    </div>
  )
}
const Test = () => {
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
export default Test
