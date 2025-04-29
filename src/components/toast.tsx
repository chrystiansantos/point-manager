import {
  ButtonHTMLAttributes,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { twMerge } from "tailwind-merge";

type RootPropsType = "DEFAULT" | "ERROR";

interface RootProps {
  children: ReactNode;
  open: boolean;
  type: RootPropsType;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonContext = createContext<{ type: RootPropsType }>({
  type: "DEFAULT",
});

function Root({ children, open = false, type = "DEFAULT" }: RootProps) {
  return (
    <div
      data-testid="toast-root"
      className={twMerge(
        "border-neutral-light-300 absolute -top-20 right-2 flex h-20 items-center gap-8 rounded-lg border-1 p-4 shadow-sm transition-all duration-500",
        open && "top-1",
        type === "ERROR" && "border-red-500/30 shadow-red-500/30",
      )}
    >
      <ButtonContext.Provider value={{ type }}>
        {children}
      </ButtonContext.Provider>
    </div>
  );
}

function WrapperInfo({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

function Title({ children }: { children: ReactNode }) {
  const { type } = useContext(ButtonContext);
  return (
    <strong
      className={twMerge(
        "text-neutral-dark-900 text-sm",
        type === "ERROR" && "text-red-500/70",
      )}
    >
      {children}
    </strong>
  );
}

function SubTitle({ children }: { children: ReactNode }) {
  const { type } = useContext(ButtonContext);
  return (
    <span
      className={twMerge(
        "text-neutral-dark-500 text-xs",
        type === "ERROR" && "text-red-500/70",
      )}
    >
      {children}
    </span>
  );
}

function Button({ ...rest }: ButtonProps) {
  const { type } = useContext(ButtonContext);
  return (
    <button
      className={twMerge(
        "bg-neutral-dark-900 text-neutral-light-50 cursor-pointer rounded-sm px-3 py-1.5 text-xs transition-colors hover:opacity-80",
        type === "ERROR" && "bg-red-500/80",
      )}
      {...rest}
    />
  );
}

export const Toast = {
  Root,
  WrapperInfo,
  Title,
  SubTitle,
  Button,
};
