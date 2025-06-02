'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function HomePage({ register }) {

  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  const createTree = async () => {
    if (!emptyFieldCheck()) return;
    // Check if handle is already taken using redis
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
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-yellow-300 font-bold text-6xl">Everything you </p>
          <p className="text-yellow-300 font-bold text-6xl">are. In one,</p>
          <p className="text-yellow-300 font-bold text-6xl">simple link in bio.</p>
          <p className="text-yellow-300 text-xl my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-2">
            <div className="flex flex-col gap-4">
              <input value={handle} onChange={(e) => setHandle(e.target.value)} className="px-2 py-2 bg-white focus:outline-green-800 rounded-md" type="text" placeholder="Enter your Handle" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 py-2 bg-white focus:outline-green-800 rounded-md" type="password" placeholder="Enter your Password" />
            </div>
            <div>
              {register ? <button onClick={() => createTree()} className="bg-pink-300 rounded-full px-4 py-4 font-semibold cursor-pointer active:scale-95 transition-all">Claim your Bittree</button>
                : <button onClick={() => getTree()} className="bg-pink-300 rounded-full px-4 py-4 font-semibold cursor-pointer active:scale-95 transition-all">Open your Bittree</button>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mr-[10vw]">
          <img src="/home.png" alt="homepage image" />
          <ToastContainer />
        </div>
      </section>
    </main>
  );
}
