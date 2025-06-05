import { twMerge } from "tailwind-merge";

type ButtonProps = React.ComponentProps<"button"> & {
  children: React.ReactNode;
};

export default function Button({
  ref,
  className,
  disabled,
  type = "button",
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      ref={ref}
      type={type}
      className={twMerge(
        `w-full rounded-full border border-transparent bg-green-500 p-3 font-bold text-black transition hover:scale-105 hover:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
