import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {UserI} from "@/hooks/useSingup";
export type Login = Pick<UserI, "email" | "password">;
const useLogin = () => {
    const router = useRouter();
    const signin = async ({email, password}: Login) =>{
        const success = handleInputErrors({email, password});
        
        if(!success) return;
        
        try {
            const res = await axios.post('/api/user/login',{
                email, password
            });
            
            router.push("/dashboard");
            console.log(res);
        } catch (error: any) {
            toast.error(error.response.data.message)
            console.log(error);
        }
        
    }

    return {signin}
   
};

export default useLogin;

function handleInputErrors({email, password}: Login){
    if(!email || !password){
      toast.error('Please fill in all fields')
      return false;
    }
  
    if(password.length < 6){
      toast.error('Password must be at least 6 characters')
      return false;
    }
  
    return true;
  }