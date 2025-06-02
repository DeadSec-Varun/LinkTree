// import React from 'react'
import Link from 'next/link'


const NavBar = ({setRegister}) => {
    return (
        <>
            <nav className='bg-white w-[80vw] flex justify-between fixed top-10 right-[10vw] rounded-full p-5 px-7'>
                <div className="logo flex gap-20 items-center">
                <img className='h-8'  src="/linkTreeLogo.svg" alt="logo"/>
                <ul className='flex gap-10'>
                    <Link className='link' href="/"><li>Templates </li></Link>
                    <Link className='link' href="/"><li>Marketplace</li></Link>
                    <Link className='link' href="/"><li>Discover</li></Link>
                    <Link className='link' href="/"><li>Pricing</li></Link>
                    <Link className='link' href="/"><li>Learn</li></Link>
                </ul>
            </div>

            <div className='flex gap-3'>
                <button onClick={()=>{setRegister(false)}} className="login bg-gray-400 p-2 rounded-lg font-bold cursor-pointer hover:bg-gray-300 active:scale-90 transition-all">Log in</button>
                <button onClick={()=>{setRegister(true)}} className="signup bg-gray-900 text-white font-bold p-2 rounded-full cursor-pointer hover:bg-gray-700 active:scale-90 transition-all"> Sign up free</button>
            </div>
        </nav >
        </>
  )
}

export default NavBar