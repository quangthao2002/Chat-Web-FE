/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"

export type CallType = "video" | "audio"

interface VideoCallState {
  callingUserId: string
  callingUserName: string
  callingUserAvatar: string
  isCalling: boolean
  isCallInProgress: boolean
  callEnded: boolean
  isMicEnabled: boolean

  setCallingUserId: (callingUserId: string) => void
  setCallingUserName: (callingUserName: string) => void
  setCallingUserAvatar: (callingUserAvatar: string) => void
  setCalling: (isCalling: boolean) => void
  setCallInProgress: (isCallInProgress: boolean) => void
  setCallEnded: (callEnded: boolean) => void
  toggleMic: () => void
}

export const useVideoCallStore = create<VideoCallState>((set) => ({
  callingUserId: "",
  callingUserName: "",
  callingUserAvatar: "",
  isCalling: false,
  isCallInProgress: false,
  callEnded: false,
  isMicEnabled: true,

  setCallingUserId: (callingUserId: string) => set({ callingUserId }),
  setCallingUserName: (callingUserName: string) => set({ callingUserName }),
  setCallingUserAvatar: (callingUserAvatar: string) => set({ callingUserAvatar }),
  setCalling: (isCalling: boolean) => set({ isCalling }),
  setCallInProgress: (isCallInProgress: boolean) => set({ isCallInProgress }),
  setCallEnded: (callEnded: boolean) => set({ callEnded }),
  toggleMic: () => set((state) => ({ isMicEnabled: !state.isMicEnabled })),
}))
