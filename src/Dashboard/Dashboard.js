import React from 'react'
import { useState, useEffect, useRef, Fragment } from 'react';
import { PencilIcon, TrashIcon, ExclamationTriangleIcon, CheckIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition } from '@headlessui/react';
import NewListItem from './NewListItem';
import CompletedListItem from './CompletedListItem';

export default function Dashboard() {

    const [selected, setSelected] = useState("All")


    const [open, setOpen] = useState(false)

    const [notes, setNotes] = useState([])
    const [completednote, setCompletednote] = useState([])

    const [confirm, setConfirm] = useState(false)
    const [Delete, setDelete] = useState(false)

    const cancelButtonRef = useRef(null)

    const [newNotekey, setNewNoteKey] = useState(0)

    const [editNote, setEditNote] = useState(false)
    const [deleteNote, setDeleteNote] = useState("")

    
    const complete = (e) => {

        const key = e.target.id
        console.log(key);
        const id = "note"+key
        const note = document.getElementById(id).innerText
        setNewNoteKey(key)
        setConfirm(true);
    }

    const openEditor = (e) => {
        const id = e.target.id
        const key = Number(id.slice(1))
        const dnote = document.getElementById("note"+key).innerText
        setDeleteNote(dnote)
        setEditNote(true)
    }


    const addNote = () => {
        const note = document.getElementById('about').value
        setNotes([...notes, note]);

        setOpen(false)
    }

    const taskCompleted = () => {

        setCompletednote([...completednote, notes[newNotekey]])
        notes.splice(newNotekey, 1)
        setConfirm(false)
    }

    const removeTask = (e) => {
        
        const id = e.target.id

        if (id[0] === "C") {
            const key = Number(id.slice(1))
            completednote.splice(key, 1)
        }
        else{
            const key = Number(id.slice(1))
            notes.splice(key, 1)
        }

        setDelete(false)
    }

    const EditNote = (e) => {
        notes.splice(notes.indexOf(deleteNote), 1)
        setNotes([...notes, document.getElementById('edit').value])
        setEditNote(false)
    }

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-slate-950 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="col-span-full">
                                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-white">
                                                Add a Note
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="about"
                                                    name="about"
                                                    rows={4}
                                                    className="bg-slate-800 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                            onClick={addNote}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


            <Transition.Root show={editNote} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setEditNote}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-slate-950 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="col-span-full">
                                            <label htmlFor="edit" className="block text-sm font-medium leading-6 text-white">
                                                Edit Note
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="edit"
                                                    name="edit"
                                                    rows={4}
                                                    className="bg-slate-800 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                                                    defaultValue={deleteNote}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                            onClick={EditNote}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 sm:mt-0 sm:w-auto"
                                            onClick={() => setEditNote(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


            <Transition.Root show={confirm} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setConfirm}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-slate-950 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-white">
                                                    Confirmation
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-white">
                                                        Are you sure the task has been completed?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                            onClick={taskCompleted}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 sm:mt-0 sm:w-auto"
                                            onClick={() => setConfirm(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


            <Transition.Root show={Delete} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setDelete}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-slate-950 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-white">
                                                    Confirmation
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-white">
                                                        Are you sure the you want to delete the task?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={removeTask}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 sm:mt-0 sm:w-auto"
                                            onClick={() => setDelete(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div>
                <div className='flex flex-1 flex-col w-72 bg-slate-950 text-slate-400 h-screen p-4 gap-y-8 fixed font-semibold'>
                    <div className='flex flex-col h-16 items-center justify-center text-4xl text-white'>To-Do List</div>
                    <div className='flex flex-col flex-auto'>
                        <a href="#0" onClick={() => setSelected("All")} className={`flex flex-row p-2 gap-x-3 rounded-md hover:bg-slate-800 hover:text-white ${selected === "All" ? 'bg-slate-800 text-white' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                            <div>All</div>
                        </a>
                        <a href='#0' onClick={() => setSelected("Incomplete")} className={`flex flex-row p-2 gap-x-3 rounded-md hover:bg-slate-800 hover:text-white ${selected === "Incomplete" ? 'bg-slate-800 text-white' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                            <div>Incomplete</div>
                        </a>
                        <a href='#0' onClick={() => setSelected("Complete")} className={`flex flex-row p-2 gap-x-3 rounded-md hover:bg-slate-800 hover:text-white ${selected === "Complete" ? 'bg-slate-800 text-white' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                            <div>Complete</div>
                        </a>
                    </div>
                    <div className='flex flex-col'>
                        <a href='/' className='flex flex-row p-2 gap-x-3 rounded-md hover:bg-slate-800 hover:text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>

                            <div>Logout</div>
                        </a>
                    </div>
                </div>

                {/* Notes List Area */}
                <div className='bg-slate-900 pl-72 h-auto min-h-screen text-white'>
                    <div className='flex flex-1 px-8 py-6 border-b border-white border-opacity-5 font-semibold items-center'>
                        <div className='flex-auto text-2xl'>Your List</div>
                        <div>
                            <button onClick={() => setOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>


                    <div id='notes' className='flex flex-1 flex-col'>

                        {selected === "All" && notes.map((note, i) => (<NewListItem openEditor={openEditor} key={i} KEY={i} note={note} setDelete={setDelete} complete={complete}/>))}
                        {selected === "All" && completednote.map((note, i) => (<CompletedListItem key={i} KEY={i} note={note} setDelete={setDelete}/>))}
                        {selected === "Incomplete" && notes.map((note, i) => (<NewListItem openEditor={openEditor} key={i} KEY={i} note={note} setDelete={setDelete} complete={complete}/>))}
                        {selected === "Complete" && completednote.map((note, i) => (<CompletedListItem key={i} KEY={i} note={note} setDelete={setDelete}/>))}

                    </div>
                </div>
            </div>
        </>
    )
}
