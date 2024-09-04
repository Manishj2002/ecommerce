import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ProgressSteps from '../../components/ProgressSteps'
import { savePaymentMethod, saveShippingAddress } from '../../redux/features/cart/cartSlice'

const Shipping = () => {
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e)=>{
        e.preventDefault()

        dispatch(saveShippingAddress({address,city,postalCode,country}))
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    useEffect(() => {
      if (!shippingAddress.address) {
        navigate('/shipping')
      }
    }, [shippingAddress,navigate])
    
  return (
    <div className='container mx-auto mt-10'>
        <ProgressSteps step1 step2/>
        <div className='mt-[6rem] flex justify-around items-center flex-wrap'>
            <form onSubmit={submitHandler} className='w-[40rem]'>
                <h1 className='text-2xl font-semibold mb-4'>Shipping</h1>
                <div className='mb-4'>
                    <label className='block text-white mb-2'>Address</label>
                    <input type="text" className='w-full   p-2 bg-transparent border rounded' placeholder='Enter address' value={address} onChange={(e)=>setAddress(e.target.value)} required />
                </div>
                <div className='mb-4'>
                    <label className='block text-white mb-2'>City</label>
                    <input type="text" className='w-full  p-2 bg-transparent border rounded' placeholder='Enter city' value={city} onChange={(e)=>setCity(e.target.value)} required />
                </div>
                <div className='mb-4'>
                    <label className='block text-white mb-2'>Portal Code</label>
                    <input type="text" className='w-full  p-2 bg-transparent border rounded' placeholder='Enter postal code' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required />
                </div>
                <div className='mb-4'>
                    <label className='block text-white mb-2'>Country</label>
                    <input type="text" className='w-full  p-2 bg-transparent border rounded' placeholder='Enter country' value={country} onChange={(e)=>setCountry(e.target.value)} required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-400 '>Select Method</label>
                  <div className='mt-2'>
                  <label className='inline-flex items-center'>
                  <input type="radio" className='form-radio text-pink-500 bg-transparent' value="PayPal" checked={paymentMethod === "PayPal"} onChange={(e)=>setPaymentMethod(e.target.value)} />
                  <span className='ml-2'>PayPal or Credit Card</span>
                  </label>
                  </div>
                </div>
                <button className='bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full' type='submit'>Continue</button>
            </form>
        </div>
    </div>
  )
}

export default Shipping