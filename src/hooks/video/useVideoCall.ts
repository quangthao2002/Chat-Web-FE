import create from "zustand"

type State = {
  isOpen: boolean
  setOpenModal: () => void
  setCloseModal: () => void
}

const useModalVideoCall = create<State>((set) => ({
  isOpen: false,
  setOpenModal: () => set({ isOpen: true }),
  setCloseModal: () => set({ isOpen: false }),
}))

export default useModalVideoCall
