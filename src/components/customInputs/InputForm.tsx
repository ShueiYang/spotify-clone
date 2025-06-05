import { twMerge } from "tailwind-merge";

import { UploadForm } from "@/types/custom.types";
import { FieldErrors } from "react-hook-form";

// less verbose way to write this InputProps instead of React.InputHTMLAttributes<HTMLInputElement>
interface InputProps extends React.ComponentProps<"input"> {
  error?: FieldErrors<UploadForm>;
}

export function InputForm({
  ref,
  className,
  type,
  disabled,
  error,
  ...props
}: Readonly<InputProps>) {
  return (
    <>
      <input
        ref={ref}
        type={type}
        className={twMerge(
          `flex w-full rounded-md border border-transparent bg-neutral-700 p-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        disabled={disabled}
        {...props}
      />
      <p className="mt-0.5 mb-1.5 h-4 text-end text-sm text-red-400">
        {error && "The field is required"}
      </p>
    </>
  );
}
