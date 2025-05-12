import { X } from "@phosphor-icons/react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

interface HeaderProps {
  onClose: () => void;
}

interface InputProps {
  error: boolean;
}

interface WarningProps {
  title: string;
  subtitle: string;
}

interface FooterProps {
  children: ReactNode;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Modal({ children }: ModalProps) {
  return (
    <div className="bg-neutral-dark-800/75 fixed inset-0 z-20 box-border flex items-center justify-center">
      <div className="shadow-monitoring flex w-80 flex-col overflow-hidden rounded-lg">
        {children}
      </div>
    </div>
  );
}

const Header = ({ onClose }: HeaderProps) => (
  <header className="bg-neutral-dark-900 flex justify-end rounded-t-lg px-3.5 py-2.5">
    <button
      onClick={onClose}
      className="text-neutral-light-50 cursor-pointer font-bold"
    >
      <X size={16} />
    </button>
  </header>
);

const Title = ({ title }: { title: string }) => (
  <div className="bg-neutral-light px-4 py-3.5 shadow-xs">
    <h1 className="text-neutral-dark-700 text-xl font-semibold">{title}</h1>
  </div>
);

const Warning = ({ title, subtitle }: WarningProps) => (
  <div className="bg-neutral-light-50">
    <div className="bg-neutral-light m-4 mb-6 flex flex-col rounded-lg px-5 py-4 shadow-xs">
      <strong>{title}</strong>
      <span className="text-sm">{subtitle}</span>
    </div>
  </div>
);

const Input = ({ error, ...rest }: InputProps) => (
  <div className="bg-neutral-light-50">
    <div className="m-4 mb-6">
      <div className="bg-neutral-light flex flex-col rounded-lg px-5 py-4 shadow-xs">
        <label htmlFor="name">Nome da área</label>
        <input
          id="name"
          placeholder="Nome"
          type="text"
          data-error={error}
          className="border-neutral-light-100 outline-neutral-dark-900 text-neutral-dark-900 rounded-lg border-1 p-0.5 px-1 data-[error=true]:border-red-500 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
          {...rest}
        />
      </div>
    </div>
  </div>
);

const Footer = ({ children }: FooterProps) => (
  <footer className="bg-neutral-light border-neutral-light-300 flex gap-4 border-t p-4">
    {children}
  </footer>
);

const SuccessButton = ({ ...rest }: ButtonProps) => (
  <button
    className="flex cursor-pointer items-center gap-2 rounded-sm border border-green-500/50 px-4 py-2.5 text-xs font-bold text-green-500 uppercase transition-all hover:brightness-75 disabled:cursor-not-allowed disabled:opacity-60"
    {...rest}
  />
);

const WarningButton = ({ ...rest }: ButtonProps) => (
  <button
    className="flex cursor-pointer items-center gap-2 rounded-sm border border-red-100 px-4 py-2.5 text-xs font-bold text-red-500 uppercase transition-all hover:brightness-75 disabled:cursor-not-allowed disabled:opacity-60"
    {...rest}
  />
);

const CancelButton = ({ ...rest }: ButtonProps) => (
  <button
    className="text-neutral-dark-700 cursor-pointer px-4 py-2.5 text-xs font-bold uppercase transition-all hover:underline hover:brightness-75"
    {...rest}
  />
);

Modal.Header = Header;
Modal.Title = Title;
Modal.Warning = Warning;
Modal.Input = Input;
Modal.Footer = Footer;
Modal.SuccessButton = SuccessButton;
Modal.WarningButton = WarningButton;
Modal.CancelButton = CancelButton;
