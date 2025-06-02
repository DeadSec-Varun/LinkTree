'use client';
import HomePage from '@/components/Homepage';
import NavBar from '@/components/NavBar';
import React, { useState } from 'react';

export default function Home() {

  const [register, setRegister] = useState(false);

  return (
    <>
    <NavBar setRegister={setRegister}/>
    <HomePage register={register}/>
    </>
  );
}
