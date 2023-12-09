"use client";

"use client";

import { SafeUser } from "@/types";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";



interface UserMenuProps{
  currentUser: SafeUser | null;
}

const Navbar = ({currentUser}: UserMenuProps) => {

  return (
    <header>
      <nav className=" bg-gray-200 px-10 flex justify-between py-6 shadow-xl">
        <div className="">hi, {currentUser?.name}</div>
        <div className="flex gap-4">
          <Link href={"/"}>Home</Link>
          <Link href={"/create"}>Create</Link>
        </div>
        {currentUser ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <Link href={"/register"}>Register</Link>
        )}
      </nav>
    </header>
  )
}

export default Navbar