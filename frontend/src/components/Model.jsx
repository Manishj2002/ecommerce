import React from 'react'

const Model = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='fixed inset-0 bg-black opacity-50'></div>
                    <div className='relative bg-gray-800 p-4 rounded-lg z-10 text-right'>
                        <button
                            className='text-white font-semibold hover:text-gray-300 focus:outline-none mr-2'
                            onClick={onClose}
                        >
                            X
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Model
