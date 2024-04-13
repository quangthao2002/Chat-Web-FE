// sidebarContext.js
import { createContext, useContext, useState } from "react"

interface ModalIProps {
  isModalOpenCreateGroup: boolean
  isModalOpenAddFriend: boolean
  isModalOpenAddMember: boolean

  handleOpenModalAddFriend: () => void
  handleCloseModalAddFriend: () => void
  handleOpenModalCreateGroup: () => void
  handleCloseModalCreateGroup: () => void
  handleOpenModalAddMember: () => void
  handleCloseModalAddMember: () => void
}

const ModalContext = createContext({} as ModalIProps)
export const useModalContext = () => useContext(ModalContext)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpenCreateGroup, setIsModalOpenCreateGroup] = useState(false)
  const [isModalOpenAddFriend, setIsModalOpenAddFriend] = useState(false)
  const [isModalOpenAddMember, setIsModalOpenAddMember] = useState(false)

  const handleOpenModalAddFriend = () => setIsModalOpenAddFriend(true)
  const handleCloseModalAddFriend = () => setIsModalOpenAddFriend(false)
  const handleOpenModalCreateGroup = () => setIsModalOpenCreateGroup(true)
  const handleCloseModalCreateGroup = () => setIsModalOpenCreateGroup(false)
  const handleOpenModalAddMember = () => setIsModalOpenAddMember(true)
  const handleCloseModalAddMember = () => setIsModalOpenAddMember(false)

  return (
    <ModalContext.Provider
      value={{
        isModalOpenCreateGroup,
        isModalOpenAddFriend,
        isModalOpenAddMember,
        handleOpenModalAddFriend,
        handleCloseModalAddFriend,
        handleOpenModalCreateGroup,
        handleCloseModalCreateGroup,
        handleOpenModalAddMember,
        handleCloseModalAddMember,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
