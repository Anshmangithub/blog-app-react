import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container , PostForm } from '../components'
import { useParams , useNavigate } from 'react-router-dom';



const EditPost = () => {

    const [post, setpost] = useState(null);
   const navigate = useNavigate()
    const {slug} = useParams()
    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setpost(post)
                }
            })
        }else{
            navigate("/")
        }
    } , [slug , navigate])
    
  return (
     
    <div className='py-8'>

<Container>
            <PostForm post={post} />
        </Container>
    </div>
  )
}

export default EditPost