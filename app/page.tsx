import Image from "next/image"
import getCurrentUser from "./actions/getCurrentUser"
import getBlogs from "./actions/getBlogs"



export default async function Home() {

  const currentUser = await getCurrentUser();
  const blogs = await getBlogs();

  return (
    <main className="">
      {blogs.map((blog)=>(
        <div></div>
      ))}
      <h1>Home</h1>
    </main>
  )
}



