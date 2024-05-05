import ModalAddFriend from "@/components/modals/ModalAddFriend"
import ModalAddMember from "@/components/modals/ModalAddMember"
import ModalUserList from "@/components/modals/ModalUserList"
import ModalConversationInfo from "@/components/modals/conversation-info/ModalConversationInfo"
import ModalCalling from "@/components/modals/video/ModalCalling"
import ModalVideo from "@/components/modals/video/ModalVideo"

const ModalProvider: React.FC = () => {
  return (
    <>
      <ModalConversationInfo />
      <ModalAddFriend />
      <ModalUserList />
      <ModalAddMember />
      <ModalVideo />
      <ModalCalling />
    </>
  )
}

export default ModalProvider
