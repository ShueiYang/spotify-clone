import { UploadForm } from "@/types/custom.types";
import { forwardRef } from "react";
import { FieldErrors } from "react-hook-form";
import { twMerge } from "tailwind-merge";

// less verbose way to write this InputProps instead of React.InputHTMLAttributes<HTMLInputElement>
interface InputProps extends React.ComponentProps<"input"> {
  error?: FieldErrors<UploadForm>;
}

const InputForm = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, error, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          className={twMerge(
            `flex w-full rounded-md border border-transparent bg-neutral-700 p-3 
          text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400
          focus:outline-none disabled:cursor-not-allowed disabled:opacity-50
        `,
            className,
          )}
          disabled={disabled}
          {...props}
        />
        <p className="mb-1.5 mt-0.5 h-4 text-end text-sm text-red-400">
          {error && "The field is required"}
        </p>
      </>
    );
  },
);
InputForm.displayName = "InputForm";

export default InputForm;
