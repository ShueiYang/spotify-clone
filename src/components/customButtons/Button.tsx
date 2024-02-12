import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// less verbose way to write this ButtonProps instead of React.ButtonHTMLAttributes<HTMLButtonElement>
interface ButtonProps extends React.ComponentProps<"button"> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={twMerge(
          `w-full rounded-full border border-transparent bg-green-500 p-3 font-bold text-black
        transition hover:scale-105 hover:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export default Button;
