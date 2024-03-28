import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { IoMdClose } from "react-icons/io"
import { FaCamera } from "react-icons/fa"

function AddFriend({ onClose }) {
  Modal.setAppElement("#root")

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: "550px",
          height: "450px",
          margin: "auto",
        },
      }}
    >
      <div className="flex flex-1 justify-between">
        <h2 className="font-bold text-black mb-2">Thêm bạn</h2>
        <div className="divider my-0 py-0 mx-1 h-1 " />
        <button onClick={onClose}>
          <IoMdClose size={25} />
        </button>
      </div>
      <div className="divider my-0 py-0 mx-1 h-1 " />
        
      <input
        type="text"
        placeholder="Nhập số điện thoại"
        className="input input-bordered w-full max-w-xs bg-gray-300 m-3"
      />
      <div className="divider my-0 py-0 mx-1 h-1 " />
      <div className="h-60 flex flex-col">
        <p className="text-black whitespace-nowrap font-normal  mt-6">Không tìm thấy kết quả nào gần đây</p>
      </div>
      <div className="flex justify-end  gap-2">
        <button className="btn btn-md" onClick={onClose}>
          Close
        </button>
        <button className="btn btn-neutral btn-md">Search</button>
      </div>
    </Modal>
  )
}

export default AddFriend
