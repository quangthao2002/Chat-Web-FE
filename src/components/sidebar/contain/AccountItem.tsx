import { User } from "@/types/user"

interface IProps {
  data?: User
  title?: string
  onClick?: () => void
  children?: React.ReactNode
}

const AccountItem = ({ data, title = "", onClick, children }: IProps) => {
  return (
    <div className={`flex  w-full items-center border hover:shadow-md rounded p-2 py-1 `}>
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src={data?.avatar} alt="Avatar" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2">
        <p className="text-lg font-semibold">{data?.username}</p>
      </div>

      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="ml-auto py-2 px-4 font-medium border hover:bg-blue-500 hover:text-white hover:border-white border-blue-500 text-blue-500 rounded-md mr-2"
        >
          {title}
        </button>
      ) : (
        title
      )}

      {children}
    </div>
  )
}

export default AccountItem
