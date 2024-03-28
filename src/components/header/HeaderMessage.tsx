import GroupButton from "./GroupButton"
import InfoAccount from "./InfoAccount"

const Header = () => {
  return (
    <div className="h-[68px] border-b flex px-2 bg-white items-center justify-between">
      <InfoAccount />
      
      <GroupButton />
    </div>
  )
}

export default Header
