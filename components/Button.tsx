"use client";

interface ButtonProps{
  type:any,
  text: String
  onClick?: () => void 
}


const Button = ({type, text, onClick}: ButtonProps) => {
  return (
    <button
    type={type}
    className={`p-4 bg-slate-500 text-white cursor-pointer my-2 hover:bg-slate-500/90 transition`}
    onClick={onClick}
    >{text}</button>
  )
}

export default Button