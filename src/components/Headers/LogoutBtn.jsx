import React from 'react'

import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import appService from '../../appwrite/auth'
import { toast } from 'react-toastify'


const LogoutBtn = () => {
 
 const dispatch = useDispatch()

 function LogoutHandler(){
    appService.logout().then(()=>{
        dispatch(logout())
        toast("Successfully Logout")
    })
 }

  return (
   <button
   className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
   onClick={LogoutHandler}>
    Logout
   </button>
  )
}

export default LogoutBtn