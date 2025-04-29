import type { ReactNode } from "react";

interface TitleProps {
  title: string;
}

interface HeadingProps {
  children: ReactNode;
}

export function Title({ title }: TitleProps) {
  return <h1 className="text-neutral-dark-900 text-2xl font-bold">{title}</h1>;
}

export function Heading({ children }: HeadingProps) {
  return <header className="px-4 py-7 shadow-sm">{children}</header>;
}

Heading.Title = Title;
