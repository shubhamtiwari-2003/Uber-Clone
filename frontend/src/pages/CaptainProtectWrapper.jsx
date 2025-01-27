import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({children}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true)
    const [ captain, setCaptain ] = useContext(CaptainDataContext);
    

    useEffect(()=>{
        if(!token) {
            navigate('/captain-login');
        }
    },[token])


    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        }).then((response)=>{
            if(response.status===200){
                const data = response.data;
                setCaptain(data.captain)
                setIsLoading(false);
            }
        }).catch(err=>{
            console.log(err);
            localStorage.removeItem('token');
            navigate('/captain-login');
        })
    },[])
    

    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }

    

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper