import Lightbox from "@/components/header/Lightbox"
import { useModalContext } from "@/context/ModalContext"
import { useSidebarContext } from "@/context/SideBarContext"
import useGetMessages from "@/hooks/useGetMessages"
import { User } from "@/types/user"
import useConversation from "@/zustand/useConversation"
import { saveAs } from "file-saver"
import { useCallback, useMemo, useState } from "react"
import { FaFile, FaFileExcel, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa"
import { IoIosArrowDown, IoMdClose } from "react-icons/io"
import { MdFileDownload } from "react-icons/md"
import Member from "./Member"

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif"]
const FILE_EXTENSIONS = ["pdf", "doc", "docx", "xls", "xlsx"]
const EMOJI_DATASOURCE_APPLE = "emoji-datasource-apple"

const ModalConversationInfo = () => {
  const { selectedConversation } = useConversation()
  const [showMembers, setShowMembers] = useState(false)
  const { isSidebarOpen, toggleSidebar } = useSidebarContext()
  const { handleOpenModalAddMember } = useModalContext()
  const [showAllImages, setShowAllImages] = useState(false)
  const [showAllFiles, setShowAllFiles] = useState(false)
  const { messages } = useGetMessages()

  const toggleShowMember = useCallback(() => {
    setShowMembers(!showMembers)
  }, [showMembers])

  const images = useMemo(
    () =>
      messages.filter((message: any) => {
        const url = message.text
        const extension = url.split(".").pop()
        return IMAGE_EXTENSIONS.includes(extension) && !url.includes(EMOJI_DATASOURCE_APPLE)
      }),
    [messages],
  )

  const files = useMemo(
    () =>
      messages.filter((message: any) => {
        const url = message.text
        const extension = url.split(".").pop()
        return FILE_EXTENSIONS.includes(extension)
      }),
    [messages],
  )

  const [lightboxVisible, setLightboxVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const displayedImages = showAllImages ? images : images.slice(0, 8)
  const displayedFiles = showAllFiles ? files : files.slice(0, 3)

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxVisible(true)
  }

  const handleShowAllImages = () => {
    setShowAllImages(!showAllImages)
  }

  const handleShowAllFiles = () => {
    setShowAllFiles(!showAllFiles)
  }
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
        return <FaFileExcel className="text-orange-500" />
      default:
        return <FaFile className="text-gray-500" />
    }
  }

  const getFileName = (url: any) => {
    const filenameFromUrl = decodeURIComponent(url.split("/").pop().split("_").slice(1).join("_"))
    return filenameFromUrl
  }

  const openFile = (url: string) => {
    window.open(url, "_blank")
    return false
  }

  const handleDownload = (e: any, url: any) => {
    e.preventDefault()
    e.stopPropagation()

    const filenameToSave = decodeURIComponent(url.split("/").pop().split("_").slice(1).join("_"))

    saveAs(url, filenameToSave)
  }
  const getBoxColor = (url: string) => {
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase()
    switch (extension) {
      case ".doc":
      case ".docx":
        return "bg-blue-200"
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

  const handleViewAllImages = useCallback(() => {
    console.log("View all images")
  }, [])

  const handleViewAllFiles = useCallback(() => {
    console.log("View all files")
  }, [])

  const handleDeleteHistory = useCallback(() => {
    console.log("Delete history")
  }, [])

  const handleLeaveGroup = useCallback(() => {
    console.log("Leave group")
  }, [])

  return (
    <>
      <div className={`${isSidebarOpen ? "fixed" : "hidden"} z-[1] inset-0 bg-black/40 flex justify-end `}>
        <div
          className={`flex flex-col pb-5 overflow-y-scroll bg-slate-200 w-96 duration-1000 transition-all transform `}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full justify-between px-4">
              <h1 className="text-black font-extrabold mt-3 mb-3">
                {selectedConversation?.name ? "Thông tin nhóm" : "Thông tin họp thoại"}
              </h1>
              <IoMdClose size={30} className=" hover:text-slate-500 cursor-pointer" onClick={toggleSidebar} />
            </div>
            <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
            <div className="avatar mt-1 ml-2">
              <div className="w-12 rounded-full">
                <img src={selectedConversation?.avatar} />
              </div>
            </div>
            <p className="font-bold text-black mt-3 mb-2">{selectedConversation?.name}</p>
          </div>

          <div className="divider my-0 py-0 mx-1 h-1 mb-2" />

          <div className="ml-4 mr-4 flex-1">
            <div className="mb-4 mt-2">
              <button type="button" onClick={toggleShowMember} className="w-full pr-2 ">
                <div className="flex items-center justify-between w-full">
                  <p className="text-black font-bold">
                    {selectedConversation?.name ? "Thành viên nhóm" : "Nhóm chung"}
                  </p>
                  <IoIosArrowDown
                    size={30}
                    className={`${showMembers ? "rotate-180" : ""} transform transition-all duration-300`}
                  />
                </div>
                {selectedConversation?.users && (
                  <p className="text-gray-600 mb-2 text-start">{selectedConversation?.users.length} thành viên</p>
                )}
              </button>

              {showMembers && selectedConversation?.users && (
                <div className="flex flex-col gap-1 flex-1">
                  <button onClick={handleOpenModalAddMember} className="btn btn-md bg-gray-400 w-80 h-4 text-black">
                    Thêm thành viên
                  </button>

                  {selectedConversation.users.map((user: User, index: number) => (
                    <Member key={index} user={user} selectedConversation={selectedConversation} />
                  ))}
                </div>
              )}
            </div>
            <div className="divider my-0 py-0 mx-1 h-1 mb-2 " />
            <div className="mt-4">
              <div className="flex justify-between">
                <p className="text-black font-bold">Ảnh/Video </p>
                <IoIosArrowDown size={30} onClick={handleShowAllImages} />
              </div>
              {/*  chứa ảnh của hộp thoại */}
              <div className="flex flex-wrap gap-2 mt-4 mb-4">
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {displayedImages.map((image: any, index: number) => (
                    <div key={index} className="relative">
                      <img
                        src={image.text}
                        className="w-20 h-20 object-cover rounded-md cursor-pointer"
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                  ))}
                  {images.length > 8 && !showAllImages && (
                    <button onClick={handleShowAllImages} className="btn btn-md bg-gray-300 w-full h-4 text-black">
                      Xem tất cả ảnh
                    </button>
                  )}
                </div>
              </div>
              {/* <button className="btn btn-md bg-gray-300 w-full h-4 text-black">Xem tất cả ảnh</button> */}
            </div>

            <div className="mt-4 mb-4">
              <div className="flex justify-between">
                <p className="text-black font-bold">Ảnh/Video </p>
                <IoIosArrowDown size={30} onClick={handleShowAllFiles} />
              </div>
              {/*  chứa file của hộp thoại */}
              <div className="flex flex-col gap-2 mt-4 mb-4">
                {displayedFiles.map((file: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 py-2 px-3  bg-gray-200 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300`}
                    onClick={() => openFile(file.text)}
                  >
                    {getFileTypeIcon(file.text)}
                    <p className="text-black font-medium">{getFileName(file.text)}</p>
                    <MdFileDownload
                      className="size-5 text-slate-600"
                      onClick={(e: any) => handleDownload(e, file.text)}
                    />
                  </div>
                ))}
                {files.length > 3 && !showAllFiles && (
                  <button onClick={handleShowAllFiles} className="btn btn-md bg-gray-300 w-full h-4 text-black">
                    Xem tất cả file
                  </button>
                )}
              </div>

              {/* <button className="btn btn-md bg-gray-300  w-full  h-4 text-black">Xem tất cả file</button> */}
            </div>

            <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
            <div className="mt-4">
              <p className="text-black font-bold">Thiết lập bảo mật </p>
              <div className="mt-4 ">
                <button
                  type="button"
                  className="cursor-pointer w-full hover:bg-blue-200 py-2 px-4 font-semibold text-red-600 mb-2"
                >
                  Xóa lịch sử cuộc trò chuyện
                </button>
                <button
                  type="button"
                  className="cursor-pointer w-full hover:bg-blue-200 py-2 px-4 font-semibold text-red-600"
                >
                  Rời nhóm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxVisible && (
        <Lightbox images={images} imageIndex={currentImageIndex} onClose={() => setLightboxVisible(false)} />
      )}
    </>
  )
}

export default ModalConversationInfo
