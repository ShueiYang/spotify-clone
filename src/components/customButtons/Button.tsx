import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// less verbose way to write this ButtonProps instead of React.ButtonHTMLAttributes<HTMLButtonElement>
interface ButtonProps extends React.ComponentProps<"button"> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {

  return (
    <button
      ref={ref}
      type={type}
      className={twMerge(`w-full rounded-full bg-green-500 border border-transparent p-3 text-black font-bold
        disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none hover:opacity-75 hover:scale-105 transition`, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})
Button.displayName = "Button";

export default Button;