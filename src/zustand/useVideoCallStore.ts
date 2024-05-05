/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"

export type CallType = "video" | "audio"

interface VideoCallState {
  callingUserId: string
  isCalling: boolean
  isCallInProgress: boolean
  callEnded: boolean

  setCallingUserId: (callingUserId: string) => void
  setCalling: (isCalling: boolean) => void
  setCallInProgress: (isCallInProgress: boolean) => void
  setCallEnded: (callEnded: boolean) => void
}

export const useVideoCallStore = create<VideoCallState>((set) => ({
  callingUserId: "",
  isCalling: false,
  isCallInProgress: false,
  callEnded: false,

  setCallingUserId: (callingUserId: string) => set({ callingUserId }),
  setCalling: (isCalling: boolean) => set({ isCalling }),
  setCallInProgress: (isCallInProgress: boolean) => set({ isCallInProgress }),
  setCallEnded: (callEnded: boolean) => set({ callEnded }),
}))
