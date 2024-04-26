/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react"
import { saveAs } from "file-saver"
import { FaFile, FaFileExcel, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa"
import { IoIosArrowDown, IoMdClose } from "react-icons/io"
import { MdFileDownload } from "react-icons/md"
import { toast } from "react-toastify"
import { useAuthContext } from "@/context/AuthContext"
import { useModalContext } from "@/context/ModalContext"
import { useSidebarContext } from "@/context/SideBarContext"
import useConversation from "@/zustand/useConversation"
import useGetConversations from "@/hooks/useGetConversations"
import useGetMessages from "@/hooks/useGetMessages"
import Member from "./Member"
import Button from "./Button"
import groupServices from "@/services/groupServices"
import Lightbox from "@/components/header/Lightbox"
import { User } from "@/types/user"

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif"]
const FILE_EXTENSIONS = ["pdf", "doc", "docx", "xls", "xlsx"]
const EMOJI_DATASOURCE_APPLE = "emoji-datasource-apple"

const ModalConversationInfo = () => {
  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id
  const { selectedConversation, setSelectedConversation } = useConversation()
  const { isSidebarOpen, toggleSidebar } = useSidebarContext()
  const { handleOpenModalAddMember } = useModalContext()
  const { messages } = useGetMessages()
  const { getConversations } = useGetConversations()

  const [showMembers, setShowMembers] = useState(false)
  const [showAllImages, setShowAllImages] = useState(false)
  const [showAllFiles, setShowAllFiles] = useState(false)
  const [lightboxVisible, setLightboxVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleCheckAdmin = (id: string) => {
    return selectedConversation?.ownerId === id || !!selectedConversation?.admins?.find((item: any) => item.id === id)
  }

  const isAdmin = handleCheckAdmin(userId)

  const toggleShowMember = useCallback(() => {
    setShowMembers((prevShowMembers) => !prevShowMembers)
  }, [])

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

  const displayedImages = useMemo(() => (showAllImages ? images : images.slice(0, 8)), [images, showAllImages])
  const displayedFiles = useMemo(() => (showAllFiles ? files : files.slice(0, 3)), [files, showAllFiles])

  const handleImageClick = useCallback(
    (index: number) => {
      setCurrentImageIndex(index)
      setLightboxVisible(true)
    },
    [setCurrentImageIndex, setLightboxVisible],
  )

  const handleShowAllImages = useCallback(() => {
    setShowAllImages((prevShowAllImages) => !prevShowAllImages)
  }, [])

  const handleShowAllFiles = useCallback(() => {
    setShowAllFiles((prevShowAllFiles) => !prevShowAllFiles)
  }, [])

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

  const handleLeaveGroup = useCallback(async () => {
    try {
      const res = await groupServices.deleteUserFromGroup({
        roomId: selectedConversation?.id,
        userIds: [userId],
      })
      if (res.data) {
        getConversations()
        setSelectedConversation(null)
        toggleSidebar()
        toast.success("rời nhóm thành công")
      }
    } catch (error) {
      toast.error("error")
    }
  }, [getConversations, selectedConversation, setSelectedConversation, toggleSidebar, userId])

  const handleDeleteGroup = useCallback(async () => {
    const listUserId = selectedConversation?.users?.map((item: any) => item.id)
    try {
      const res = await groupServices.deleteUserFromGroup({
        roomId: selectedConversation?.id,
        userIds: listUserId,
      })
      if (res.data) {
        getConversations()
        setSelectedConversation(null)
        toggleSidebar()
        toast.success("xóa nhóm thành công")
      }
    } catch (error) {
      toast.error("error")
    }
  }, [getConversations, selectedConversation, setSelectedConversation, toggleSidebar])

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
                <img src={selectedConversation?.avatar} alt={selectedConversation?.name} />
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
                  {isAdmin && (
                    <button onClick={handleOpenModalAddMember} className="btn btn-md bg-gray-400 w-80 h-4 text-black">
                      Thêm thành viên
                    </button>
                  )}

                  {selectedConversation.users.map((user: User, index: number) => (
                    <Member
                      key={user.id + index}
                      user={user}
                      selectedConversation={selectedConversation}
                      isAdmin={isAdmin}
                      handleCheckAdmin={handleCheckAdmin}
                    />
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
                        alt={`Image ${index}`}
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
            </div>

            <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
            <div className="mt-4">
              <p className="text-black font-bold">Thiết lập bảo mật </p>
              <div className="mt-4 ">
                <Button text="Xóa lịch sử cuộc trò chuyện" onClick={handleLeaveGroup} />
                <Button text="Rời nhóm" onClick={handleLeaveGroup} />
                {isAdmin && <Button text="Giải tán nhóm" onClick={handleDeleteGroup} />}
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
