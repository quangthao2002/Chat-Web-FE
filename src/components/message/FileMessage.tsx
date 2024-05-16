/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaFileWord, FaFilePdf, FaFilePowerpoint, FaFile, FaFileExcel } from "react-icons/fa" // Import icons for different file types
import { saveAs } from "file-saver"
import { FiDownload } from "react-icons/fi"

const FileMessage = ({ url }: any) => {
  const getFileTypeIcon = (url: string) => {
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase()
    switch (extension) {
      case ".doc":
      case ".docx":
        return <FaFileWord className="text-blue-500" />
      case ".pdf":
        return <FaFilePdf className="text-red-500" />
      case ".ppt":
      case ".pptx":
        return <FaFilePowerpoint className="text-green-500" />
      case ".xlsx":
      case ".xls":
        return <FaFileExcel className="text-green-500" />
      default:
        return <FaFile className="text-gray-500" />
    }
  }

  const getFileName = (url: any) => {
    const filenameFromUrl = decodeURIComponent(url.split("/").pop().split("_").slice(1).join("_"))
    return filenameFromUrl
  }

  const openFile = () => {
    window.open(url, "_blank")
    return false
  }
  const handleDownload = (e: any, url: any) => {
    e.preventDefault()
    e.stopPropagation()

    const filenameToSave = decodeURIComponent(url.split("/").pop().split("_").slice(1).join("_"))

    saveAs(url, filenameToSave)
  }

  const getBoxColor = (url: any) => {
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase()
    switch (extension) {
      case ".doc":
      case ".docx":
        return "bg-blue-100"
      case ".pdf":
        return "bg-red-100"
      case ".ppt":
      case ".pptx":
        return "bg-green-100"
      case ".xlsx":
      case ".xls":
        return "bg-blue-100"
      default:
        return "bg-gray-100"
    }
  }

  return (
    <div
      onClick={openFile}
      className={`flex items-center justify-between p-4 border border-gray-300 w-96 h-24 rounded-lg cursor-pointer hover:shadow-md w-30rem ${getBoxColor(url)}`}
    >
      <div className="flex items-center">
        <div className="mr-4 text-xl">{getFileTypeIcon(url)}</div>
        <div>
          <div className="font-bold text-gray-600 overflow-hidden whitespace-nowrap truncate w-56 h-6">
            {getFileName(url)}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-gray-400 text-sm mb-2 opacity-50 hover:opacity-100">Download</div>
        <button
          type="button"
          onClick={(e) => handleDownload(e, url)}
          className="text-gray-400 text-sm opacity-50 hover:opacity-100 "
        >
          <FiDownload className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default FileMessage
