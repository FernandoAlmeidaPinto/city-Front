'use client'

import { ComponentProps } from "react";

interface Props extends ComponentProps<'input'> {
}

export function Input({ ...props } : Props) {
  return <input 
  {...props}
  className="p-3 bg-zinc-900 text-white border rounded min-w-96 m-2 disabled:bg-zinc-50"
  type="text" 
  placeholder={props.disabled ? "Parabéns" : "digite uma cidade"} />
}