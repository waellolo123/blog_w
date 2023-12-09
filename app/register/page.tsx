"use client";
import Input from "@/components/input/Input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import axios from 'axios';
import Link from "next/link";
import Button from "@/components/Button";

interface InitialStateProps{
  name: string,
  email: string,
  password: string
}

const initialState: InitialStateProps = {
  name: "",
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
    axios.post("/api/register", state)
    .then(()=>{
      router.refresh();
    })
    .then(()=>{
      setTimeout(()=>{
        router.push("/login");
      },2500);
    })
    .catch((err:any)=>{
      
    })
  }

  return (
    <form className="text-center" onSubmit={onSubmit}>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
       <Input placeholder="Name" name="name" id="name" type="text" onChange={handleChange} value={state.name} /> 
       <Input placeholder="Email" name="email" id="email" type="text" onChange={handleChange} value={state.email} /> 
       <Input placeholder="Password" name="password" id="password" type="text" onChange={handleChange} value={state.password} /> 
       <Button type="submit" onClick={()=>{}} text="Register" />
      <div className="text-slate-400 flex gap-2 items-center justify-center"><p>already have an account?</p><Link href={"/login"} className="underline">Login</Link></div>
      </div>
    </form>
  )
}

export default page;


