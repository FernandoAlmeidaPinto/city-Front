import { tv } from "tailwind-variants";

export interface ICity {
  text: string;
  distance: number;
}

const city = tv({
  base: 'w-96 rounded p-2 flex justify-between text-white font-black bg-blue-500 my-1',
  variants: {
    position: {
      primary: 'bg-green-500',
      secondary: 'bg-blue-500',
      tertiary: 'bg-red-500',
      other: 'bg-zinc-950',
      last: 'bg-violet-500'
    },
  },
  defaultVariants: {
    position: 'other'
  }
})

export interface Props extends ICity {
  position: "other" | "primary" | "secondary" | "tertiary" | "last";
}

export function City({ text, distance, position } : Props) {
  return (
    <div className={city({ position })}>
        <span>{text}</span>
        <span>{distance} km</span>
      </div>
  )
}