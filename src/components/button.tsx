import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary";
};

export function Button({ className, variant, ...rest }: PrimaryButtonProps) {
  return (
    <button
      className={twMerge(
        className,
        "text-neutral-light flex h-8 w-[164px] cursor-pointer items-center justify-center gap-2 rounded-sm bg-red-500 text-xs font-bold uppercase transition-all duration-[1s]",
        // eslint-disable-next-line prettier/prettier
        variant === "secondary" && "border-neutral-light-300 bg-neutral-light text-neutral-dark-600 border-2",
      )}
      {...rest}
    ></button>
  );
}
