import React from 'react'
import Link from 'next/link'


const NavBar = () => {
    return (
        <>
            <nav className='bg-white w-[80vw] flex justify-between fixed top-10 right-[10vw] rounded-full p-5 px-7'>
                <div className="logo flex gap-20 items-center">
                <img className='h-8' src="/linkTreeLogo.svg" alt="logo"/>
                <ul className='flex gap-10'>
                    <Link href="/"><li>Templates </li></Link>
                    <Link href="/"><li>Marketplace</li></Link>
                    <Link href="/"><li>Discover</li></Link>
                    <Link href="/"><li>Pricing</li></Link>
                    <Link href="/"><li>Learn</li></Link>
                </ul>
            </div>

            <div className='flex gap-3'>
                <button className="login bg-gray-400 p-2 rounded-lg font-bold">Log in</button>
                <button className="signup bg-gray-900 text-white font-bold p-2 rounded-full"> Sign up free</button>
            </div>
        </nav >
        </>
  )
}

export default NavBar