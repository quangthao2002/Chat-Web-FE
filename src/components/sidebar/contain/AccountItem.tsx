import { User } from "@/types/user"

interface IProps {
  data?: User
  title?: string
  onClick?: () => void
}

const AccountItem = ({ data, title = "", onClick }: IProps) => {
  return (
    <div className={`flex gap-2 w-full items-center border hover:shadow-md rounded p-2 py-1 `}>
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src={data?.avatar} />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-lg font-semibold">{data?.username}</p>
      </div>

      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="ml-auto py-2 px-4 border hover:bg-slate-200 border-blue-500 text-blue-500 rounded-md mr-2"
        >
          {title}
        </button>
      ) : (
        title
      )}
    </div>
  )
}

export default AccountItem
