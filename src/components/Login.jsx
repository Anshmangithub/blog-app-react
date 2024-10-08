import React , {useState} from 'react'
import { useNavigate , Link } from 'react-router-dom'
import appService from '../appwrite/auth'
import {Logo , Button , Input} from "./index"
import {login as authLogin} from "../store/authSlice"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'



const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isError, setisError] = useState("");
    const { register , handleSubmit} = useForm()

    const login = async(data)=>{
        setisError('');
     try {
       const session = await appService.login(data);
       if(session ){
        const userData = await  appService.getCurrentUser()
        if(userData) dispatch(authLogin(userData))
            navigate("/")
        toast("Successfully Login")
       }
     } catch (error) {
        setisError( toast(error.message))
     }
    }
  return (
    <div
    className='flex items-center justify-center w-full mt-8 mb-8'
    >
        <div className={`mx-auto w-full max-w-lg bg-sky-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {isError && <p className="text-red-600 mt-8 text-center">{isError}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login