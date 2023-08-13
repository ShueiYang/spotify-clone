import { twMerge } from "tailwind-merge";


interface BoxProps {
  children: React.ReactNode
  className?: string
}

const Box: React.FC<BoxProps> = ({
  children,
  className
}) => {

  return (
    <div className={twMerge(`bg-neutral-900 rounded-lg w-full h-fit`, className)}>
      {children}
    </div>
  )
}

export default Box;