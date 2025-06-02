"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Generate = () => {

    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState()
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/generate', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await res.json()
            if (res.status == 201) {
                console.log("Data fetched successfully")
                console.log(result);
                
                sethandle(result.data.handle.toUpperCase())
                setpic(result.data.pic)
                setdesc(result.data.desc)
                if(result.data.links.length == 0) {
                    setLinks([{ link: "", linktext: "" }])
                }
                else
                    setLinks(result.data.links)
            } else {
                toast.error(result.error)
            }
        }
        fetchData();
    }, [])


    const handleChange = (index, link, linktext) => {
        const newLinks = [...links]
        newLinks[index].link = link
        newLinks[index].linktext = linktext
        setLinks(newLinks)
    }
    const addLink = () => {
        if (links.some(link => link.linktext == "" || link.link == "")) {
            toast.error("Please fill empty links first")
            return
        }
        setLinks([...links, { link: "", linktext: "" }])
    }
    const submitLinks = async () => {
        if (links[0].linktext == "" || links[0].link == "") {
            toast.error("Please fill all the fields")
            return
        }
        const data = {
            pic: pic,
            desc: desc,
            links: links
        }
        console.log(JSON.stringify(data));
        
        const res = await fetch('/api/generate', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()
        if (res.status == 201) {
            toast.success(result.message)
        } else {
            toast.error(result.error)
        }
    }



    return (
        <div className='bg-[#E9C0E9] min-h-screen grid grid-cols-[3fr_2fr]'>

            <div className="col1 flex justify-center items-center flex-col text-gray-900">
                <div className='flex flex-col gap-3 my-8'>
                    <form action={submitLinks}>
                    <h1 className='font-bold text-4xl'>Create your Bittree</h1>
                    <div className="item">

                        <h2 className='font-semibold text-2xl'>Step 1: Claim your Handle</h2>
                        <div className='mx-4'>
                            <input value={handle || ""} className=' font-extrabold px-2 py-1 my-2 focus:outline-pink-500 rounded-full disabled:bg-slate-200' disabled={true}
                                type="text"/>
                        </div>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 2: Add Links</h2>
                        {links && links.map((item, index) => {
                            return <div key={index} className='mx-4'>
                                <input value={item.linktext || ""} onChange={e => { handleChange(index, item.link, e.target.value) }} className='px-2 py-1 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link text' />
                                <input value={item.link || ""} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='px-2 py-1 mx-2 my-2 focus:outline-pink-500 rounded-full'
                                    type="text" placeholder='Enter link' />
                            </div>
                        })}
                        <button type='button' onClick={addLink} className='px-2 py-2 mx-6 bg-slate-900 text-white font-bold rounded-3xl cursor-pointer'>+ Add Link</button>
                    </div>

                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 3: Add Picture and Description</h2>
                        <div className='mx-4 flex flex-col'>
                            <input value={pic} onChange={e => { setpic(e.target.value) }} className='px-2 py-1 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link to your Picture' />
                            <input value={desc} onChange={e => { setdesc(e.target.value) }} className='px-2 py-1 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter description' />
                            <button disabled={links[0].linktext == "" || links[0].link == ""} type='submit' className='disabled:bg-slate-500 p-3 py-2 mx-2 w-fit my-5 bg-slate-900 text-white font-bold rounded-3xl cursor-pointer'>Create your BitTree</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            <div className="col2 w-full h-screen bg-[#E9C0E9]">
                <img className='h-full object-contain' src="/generate.png" alt="Generate your links" />
                <ToastContainer />
            </div>
        </div>
    )
}

export default Generate;