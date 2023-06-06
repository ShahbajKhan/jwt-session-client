import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";


const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`,
    
})

// axios.get()
const useAxiosSecure = () => {
    // useEffect(()=>{
        axiosSecure.interceptors.request.use((req)=>{
            // try{

            // }catch
            const token = localStorage.getItem("access-token");
            if(token){
                req.headers.Authorization = `Bearer ${token}`
            }
            return req;
        });

        axiosSecure.interceptors.response.use(
            response => response,
            error =>{
                if(error.response && (error?.response.status === 403 || error?.response.status === 401)){
                    toast.error(error?.response?.data.error)
                }
            }
        )
    // },[])
    return axiosSecure;
};

export default useAxiosSecure;