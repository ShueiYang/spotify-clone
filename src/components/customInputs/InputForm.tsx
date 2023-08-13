import { UploadForm } from "@/types/custom.types";
import { InputHTMLAttributes, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";
import { twMerge } from "tailwind-merge";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldErrors<UploadForm>
}


const InputForm = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type,
  disabled,
  error,
  ...props
}, ref) => {
  return (
    <>
      <input 
        ref={ref}
        type={type}
        className={twMerge(`flex w-full rounded-md bg-neutral-700 border border-transparent p-3 
          text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400
          disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none
        `, className
        )}
        disabled={disabled}
        {...props}
      />     
      <p className="h-4 text-sm text-end text-red-400 mt-0.5 mb-1.5">
        {error && "The field is required"}
      </p> 
    </>
  )
})
InputForm.displayName = "InputForm"

export default InputForm;