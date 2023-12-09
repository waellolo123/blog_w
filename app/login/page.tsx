"use client";
import Input from "@/components/input/Input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import axios from 'axios';
import Link from "next/link";
import Button from "@/components/Button";
import {signIn} from 'next-auth/react';

interface InitialStateProps{

  email: string,
  password: string
}

const initialState: InitialStateProps = {

  email: "",
  password: "",
}

const page = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  
  function handleChange(e:any){
    setState({...state, [e.target.name]: e.target.value})
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    signIn('credentials',{
      ...state,
      redirect: false,
    })
    .then((callback)=>{
      if(callback?.ok){
        router.refresh();
      }
      if(callback?.error){
        throw new Error('Wrong Credentials')
      }
    })
    router.push("/");
  }

  return (
    <form className="text-center" onSubmit={onSubmit}>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
       <Input placeholder="Email" name="email" id="email" type="text" onChange={handleChange} value={state.email} /> 
       <Input placeholder="Password" name="password" id="password" type="text" onChange={handleChange} value={state.password} /> 
       <Button type="submit" onClick={()=>{}} text="Login" />
      <div className="text-slate-400 flex gap-2 items-center justify-center"><p>Dont have an account?</p><Link href={"/register"} className="underline">Register</Link></div>
      </div>
    </form>
  )
}

export default page;


