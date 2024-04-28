import { User } from "@/types/user"
import { create } from "zustand"
import { DataConnection, MediaConnection, Peer } from "peerjs"

export type CallType = "video" | "audio"

interface VideoCallState {
  isCalling: boolean
  isCallInProgress: boolean
  caller?: User
  receiver?: User
  peer?: Peer
  call?: MediaConnection
  connection?: DataConnection
  isReceivingCall: boolean
  remoteStream?: MediaStream
  localStream?: MediaStream
  activeConversationId?: number
  callType?: CallType
}

export const useGroupStore = create<VideoCallState>((set) => ({
  isCalling: false,
  isCallInProgress: false,
  isReceivingCall: false,
  callType: "video",
  setCaller: (caller: User) => set({ caller }),
  setReceiver: (receiver: User) => set({ receiver }),
  setPeer: (peer: Peer) => set({ peer }),
  setCall: (call: MediaConnection) => set({ call }),
  setConnection: (connection: DataConnection) => set({ connection }),
  setRemoteStream: (remoteStream: MediaStream) => set({ remoteStream }),
  setLocalStream: (localStream: MediaStream) => set({ localStream }),
  setActiveConversationId: (activeConversationId: number) => set({ activeConversationId }),
  setIsCalling: (isCalling: boolean) => set({ isCalling }),
  setIsCallInProgress: (isCallInProgress: boolean) => set({ isCallInProgress }),
  setIsReceivingCall: (isReceivingCall: boolean) => set({ isReceivingCall }),
  setCallType: (callType: CallType) => set({ callType }),
  reset: () =>
    set({
      isCalling: false,
      isCallInProgress: false,
      isReceivingCall: false,
      caller: undefined,
      receiver: undefined,
      peer: undefined,
      call: undefined,
      connection: undefined,
      remoteStream: undefined,
      localStream: undefined,
      activeConversationId: undefined,
      callType: "video",
    }),
  initialState: () => {
    return {} as VideoCallState
  },
}))
