import ModalAddFriend from "@/components/modals/ModalAddFriend"
import ModalAddMember from "@/components/modals/ModalAddMember"
import ModalUserList from "@/components/modals/ModalUserList"
import ModalVideo from "@/components/modals/ModalVideo"
import ModalConversationInfo from "@/components/modals/conversation-info/ModalConversationInfo"

const ModalProvider: React.FC = () => {
  return (
    <>
      <ModalConversationInfo />
      <ModalAddFriend />
      <ModalUserList />
      <ModalAddMember />
      <ModalVideo />
    </>
  )
}

export default ModalProvider
