import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Headers } from './components'
import { Outlet } from 'react-router-dom'
import ReactLoading  from "react-loading"


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-teal-50'>
      <div className='w-full block'>
        <Headers />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <ReactLoading className='mx-auto flex items-center h-full' type='balls' color='black' />
}

export default App