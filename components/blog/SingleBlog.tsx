'use client';

import { SafeUser, safeBlogs } from "@/types";
import Image from "next/image";

interface SingleBlogProps{
   key: string
   data: safeBlogs
   currentUser?: SafeUser | null
}

const SingleBlog = ({key, data, currentUser}: SingleBlogProps) => {
  return (
    <div className="w-[1100px] mx-auto border-2 p-4">
     <div className="">
      <div className="flex flex-col gap-2 justify-between items-center">
        <Image width={400} height={300} alt="blog image" src={data.imageSrc} />
        <div className="w-[530px] flex flex-col gap-4 leading-[1.5]">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
        </div>
      </div>
     </div>
    </div>
  )
}

export default SingleBlog