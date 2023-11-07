import React from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'

export default function CompletedListItem({ note, setDelete, KEY }) {

    return (
        <div className='px-8 py-4 border-b border-white border-opacity-5 flex items-center'>
            <div className='flex-auto'>
                <div className='flex gap-x-3 items-center'>
                    <div className='p-1 bg-gray-100 bg-opacity-10 rounded-full'>
                        <div className='bg-green-400 rounded-full h-2 w-2'></div>
                    </div>
                    <div className='text-base'>{note}</div>
                </div>
                <div className='mt-3 text-gray-400 text-xs leading-5'>
                    <div>Added 1 min ago</div>
                </div>
                <div className="mt-5 flex">
                    <span className="sm:ml-3">
                        <button
                            type="button"
                            id={"C"+KEY}
                            onClick={() => {setDelete(true)}}
                            className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                            Delete
                        </button>
                    </span>
                </div>
            </div>


            <div className='text-green-500 bg-gray-400 bg-opacity-10 rounded-full font-medium text-xs py-1 px-2'>
                Complete
            </div>
        </div>
    )
}
