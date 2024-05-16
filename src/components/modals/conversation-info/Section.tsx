const Section = ({ title, buttonText, onClick }: { title: string; buttonText: string; onClick: () => void }) => {
  return (
    <div className="mt-4">
      <p className="text-black font-bold">{title}</p>
      <button onClick={onClick} className="btn btn-md bg-gray-300 w-80 h-4 text-black">
        {buttonText}
      </button>
    </div>
  )
}

export default Section
