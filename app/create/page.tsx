"use client";

import Button from "@/components/Button";
import ImageUpload from "@/components/input/ImageUpload";
import Input from "@/components/input/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";

interface InitialStateProps{
  name?: string,
  imageSrc: string,
  description: string
}

const initialState: InitialStateProps = {
  name: '',
  imageSrc: '',
  description: ''
}

const page = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const setCustomValue = (id:any, value:any)=>{
    setState((prevValue)=>({
      ...prevValue,
      [id]: value,
    }));
  } ;

  function handleChange(event:ChangeEvent<HTMLInputElement>){
    setState({...state, [event.target.name]: event.target.value});
  }

  const onSubmit = (event:FormEvent)=>{
    event.preventDefault();
    axios.post('/api/blogs', state)
    .then(()=>{
      toast.success('Blog created successfully');
      router.push('/')
    })
    .catch(()=>{toast.error('Something went wrong')})
    router.refresh();
  }

  return (
    <form className="w-[600px] mx-auto py-12 flex flex-col items-center justify-center" onSubmit={onSubmit}>
      <div className=" w-[300px] my-4">
       <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
      </div>
      <div className="flex flex-col justify-center w-[350px] mx-auto gap-2">
       <h1 className="text-slate-500 font-bold">Create New Article</h1>
        <Input placeholder="Blog Header" id="name" type="text" value={state.name} name="name" onChange={handleChange} />
        <Input big placeholder="Blog Content or description" id="description" type="text" value={state.description} name="description" onChange={handleChange} />
        {/* <ReactQuill theme="snow" value={state.description} placeholder="Blog Content or description" id="description" name="description" onChange={handleChange}  className="my-4"/> */}
        <Button type="submit" text="Submit" />
      </div>
    </form>
  )
}

export default page

