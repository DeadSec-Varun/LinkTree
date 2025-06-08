'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const Register = () => {

    const [handle, setHandle] = useState("");
    const [password, setPassword] = useState("");
    const [validHandle, setValidHandle] = useState(false);
    const [validHandleMsg, setValidHandleMsg] = useState("");

    useEffect(() => {
        const second = setTimeout(() => {
            if (handle.length > 0)
                isHandleValid();
            else {
                setValidHandleMsg("");
                setValidHandle(false);
            }
        }, 500);

        return () => {
            clearTimeout(second);
        }
    }, [handle])


    const createTree = async () => {
        if (!emptyFieldCheck()) return;
        try {
            const res = await axios.post("/api/create", {
                handle: handle,
                password: password
            });
            toast.success(res.data.message);
            window.location.href = "/home";
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.error);
        }
    }

    const emptyFieldCheck = () => {
        if (handle === "" || password === "") {
            toast.error("Please fill all the details");
            return false;
        }
        return true;
    }

    const isHandleValid = async () => {
        try {
            const res = await axios.get(`/api/create?handle=${handle}`);
            res.data.exists ? setValidHandle(false) : setValidHandle(true);
            setValidHandleMsg(res.data.message);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="input flex gap-2">
            <div className="flex flex-col gap-4">
                <div className='flex flex-col'>
                    <input value={handle} onChange={(e) => setHandle(e.target.value)} className="px-2 py-2 bg-white focus:outline-green-800 rounded-md" type="text" placeholder="Enter your Handle" />
                    <span className={`text-sm ${validHandle ? 'text-green-500' : 'text-red-500'} block min-h-[1.25rem] transition-colors duration-200`}>
                        {validHandleMsg}
                    </span>
                </div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 py-2 bg-white focus:outline-green-800 rounded-md" type="password" placeholder="Enter your Password" />
            </div>

            <div className="flex items-center">
                <button
                    onClick={() => createTree()}
                    disabled={!validHandle}
                    className={`bg-pink-300 rounded-full px-4 py-4 font-semibold cursor-pointer active:scale-95 transition-all
                        ${!validHandle ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Claim your Bittree
                </button>
            </div>
        </div>
    )
}
