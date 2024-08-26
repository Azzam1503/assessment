import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface UserI {
    name: string,
    email: string,
    password:string,
    confirmPassword: string
    role: string
};
const useSingup = () => {
    const router = useRouter();
    const signup = async ({name, email, password, confirmPassword, role}: UserI) =>{
        const success = handleInputErrors({name,email, password, confirmPassword, role});
        
        if(!success) return;
        
        try {
            const res = await axios.post('/api/user/signup',{
                name, email, password, role
            });
            
            router.push("/login");
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        
    }

    return {signup}
   
};

export default useSingup;

function handleInputErrors({name,  email, password, confirmPassword, role}: UserI){
    if(!name ||  !email || !password || !confirmPassword || !role){
      toast.error('Please fill in all fields')
      return false;
    }
  
    if(password !== confirmPassword){
      toast.error('Password do not match')
      return false;
    };
  
    if(password.length < 6){
      toast.error('Password must be at least 6 characters')
      return false;
    }
  
    return true;
  }