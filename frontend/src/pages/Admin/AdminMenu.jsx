import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <>
    <button className={`${isMenuOpen? 'top-2 right-2' : 'top-5 right-7'} bg-transparent p-2 fixed rounded-lg`} onClick={toggleMenu}>
        {isMenuOpen ? (
            <FaTimes color='white'/>
        ):(
            <>
             <div className='w-6 h-0.5 bg-gray-200 my-1'></div>
             <div className='w-6 h-0.5 bg-gray-200 my-1'></div>
             <div className='w-6 h-0.5 bg-gray-200 my-1'></div>
            </>
        )}
    </button>

       {isMenuOpen && (
        <section className='bg-transparent p-4 fixed right-7 top-5'>
           <ul className='list-none mt-2'>
            <li>
                <NavLink className='list-item px-3 py-2 mb-5 rounded-sm  hover:bg-green-600' to='/admin/dashboard' style={({isActive}) => ({
                    color : isActive ? "greenyellow" : "white"
                })}>
                 Admin dashboard
                </NavLink>
            </li>
            <li>
                <NavLink className='list-item px-3 py-2 mb-5 rounded-sm  hover:bg-green-600' to='/admin/categorylist' style={({isActive}) => ({
                    color : isActive ? "greenyellow" : "white"
                })}>
                Create Category
                </NavLink>
            </li>
            <li>
                <NavLink className='list-item px-3 py-2 mb-5 rounded-sm  hover:bg-green-600' to='/admin/productlist' style={({isActive}) => ({
                    color : isActive ? "greenyellow" : "white"
                })}>
                Create Products
                </NavLink>
            </li>
            <li>
                <NavLink className='list-item px-3 py-2 mb-5 rounded-sm  hover:bg-green-600' to='/admin/allproductslist' style={({isActive}) => ({
                    color : isActive ? "greenyellow" : "white"
                })}>
                All Products
                </NavLink>
            </li>
            <li>
                <NavLink className='list-item px-3 py-2 mb-5 rounded-sm  hover:bg-green-600' to='/admin/userlist' style={({isActive}) => ({
                    color : isActive ? "greenyellow" : "white"
                })}>
                Mange Users
                </NavLink>
            </li>
            <li>
                <NavLink className='list-item px-3 py-2 mb-5 rounded-sm  hover:bg-green-600' to='/admin/orderlist' style={({isActive}) => ({
                    color : isActive ? "greenyellow" : "white"
                })}>
                Manage Orders
                </NavLink>
            </li>
           </ul>
        </section>
       )}
    </>
  )
}

export default AdminMenu