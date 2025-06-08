'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const Login = () => {

    const [handle, setHandle] = useState("");
    const [password, setPassword] = useState("");

    const getTree = async () => {
        if (!emptyFieldCheck()) return;
        try {
            const res = await axios.post("/api/get", {
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

    return (
        <div className="input flex gap-2">
            <div className="flex flex-col gap-4">
                <input value={handle} onChange={(e) => setHandle(e.target.value)} className="px-2 py-2 bg-white focus:outline-green-800 rounded-md" type="text" placeholder="Enter your Handle" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 py-2 bg-white focus:outline-green-800 rounded-md" type="password" placeholder="Enter your Password" />
            </div>
            <div>
                <button onClick={() => getTree()} className="bg-pink-300 rounded-full px-4 py-4 font-semibold cursor-pointer active:scale-95 transition-all">Open your Bittree</button>
            </div>
        </div>
    )
}