import React from 'react'
import {ToastContainer} from 'react-toastify'
import Navigation from './pages/Auth/Navigation'
import {Outlet} from 'react-router'
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Navigation/>
    <main className='py-3'>
      <Outlet/>
    </main>
    </>
  )
}

export default App