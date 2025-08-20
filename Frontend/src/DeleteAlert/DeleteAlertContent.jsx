import React from 'react'

function DeleteAlertContent({content,onDelete}) {
  return (
    <>
        <div className="p-5"
        >
            <p>{content}</p>

            <div className="flex justify-end mt-6">
                <button
                type="button"
                className="btn-small bg-red-500 p-2 rounded-xl cursor-pointer text-white transition shadow-md hover:bg-red-600"
                onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    </>
  )
}

export default DeleteAlertContent