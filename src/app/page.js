'use client';
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Register } from '@/components/Register';
import { Login } from '@/components/Login';
import {ToastContainer} from 'react-toastify';


export default function Home() {

  const [register, setRegister] = useState(false);

  return (
    <>
      <NavBar setRegister={setRegister} />
      <main>
        <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
          <div className="flex justify-center flex-col ml-[10vw] gap-3">
            <p className="text-yellow-300 font-bold text-6xl">Everything you </p>
            <p className="text-yellow-300 font-bold text-6xl">are. In one,</p>
            <p className="text-yellow-300 font-bold text-6xl">simple link in bio.</p>
            <p className="text-yellow-300 text-xl my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
            {register ? <Register /> : <Login />}
          </div>
          <div className="flex items-center justify-center flex-col mr-[10vw]">
            <img src="/home.png" alt="homepage image" />
            <ToastContainer />
          </div>
        </section>
      </main>
    </>
  );
}
