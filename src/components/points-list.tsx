import soy from "@/assets/soy.svg";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
interface ListPointsTitleProps {
  title: string;
}

interface ListPointsEmptyProps {
  description: string;
}

interface ListPointsRootProps {
  children: ReactNode;
}

interface ListPointsGroup {
  children: ReactNode;
}

interface ListPointNameAreaProps {
  name: string;
}

interface PointDetailProps {
  name: string;
  createdAt: Date;
  selected: boolean;
  selectPoint: () => void;
  disabled: boolean;
}

function ListPointsRoot({ children }: ListPointsRootProps) {
  return (
    <div className="w-max bg-[linear-gradient(347.11deg,rgba(0,0,0,0)_80.08%,#000)] p-6">
      <div className="w-[344px] rounded-lg shadow-md">{children}</div>
    </div>
  );
}

function ListPointsTitle({ title }: ListPointsTitleProps) {
  return (
    <div className="bg-neutral-dark-900 flex h-8 items-center rounded-t-lg px-4">
      <strong className="text-neutral-light text-xs leading-none">
        {title}
      </strong>
    </div>
  );
}

function ListPointsEmpty({ description }: ListPointsEmptyProps) {
  return (
    <div className="bg-neutral-light flex h-14 w-full items-center justify-center rounded-b-lg">
      <span className="text-neutral-dark-600 max-w-[180px] text-center text-xs font-bold">
        {description}
      </span>
    </div>
  );
}

function ListPointsGroup({ children }: ListPointsGroup) {
  return (
    <div className="divide-neutral-light-100 bg-neutral-light max-h-[400px] divide-y-1 overflow-y-auto rounded-b-lg">
      {children}
    </div>
  );
}

function ListPointNameArea({ name }: ListPointNameAreaProps) {
  return (
    <div className="bg-neutral-light flex items-center justify-center gap-2 px-1 py-2">
      <div className="bg-neutral-light-100 h-0.5 flex-1"></div>
      <span className="text-neutral-dark-500 text-xs">{name}</span>
      <div className="bg-neutral-light-100 h-0.5 flex-1"></div>
    </div>
  );
}

export function PointDetail({
  name,
  createdAt,
  selected,
  selectPoint,
  disabled,
}: PointDetailProps) {
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const createdAtFormatted = `${dateFormatter.format(createdAt)} - ${timeFormatter.format(createdAt)}`;
  return (
    <button
      type="button"
      className={twMerge(
        "bg-neutral-light w-full cursor-pointer px-2.5 py-4 disabled:cursor-not-allowed",
        selected && "bg-neutral-light-50",
      )}
      disabled={disabled}
      onClick={selectPoint}
    >
      <strong className="text-neutral-dark-900 flex items-center gap-1 text-sm font-medium">
        <img
          className="size-4"
          src={soy}
          alt="icon soy"
          width={15}
          height={15}
        />
        Ponto nº {name}
      </strong>
      <span className="text-neutral-dark-500 flex gap-2 text-xs">
        <span className="bg-neutral-light text-neutral-dark-600 rounded-sm px-0.5">
          Criado em:{" "}
        </span>
        {createdAtFormatted}
      </span>
    </button>
  );
}

export const ListPoints = {
  Root: ListPointsRoot,
  Title: ListPointsTitle,
  Empty: ListPointsEmpty,
  Group: ListPointsGroup,
  PointNameArea: ListPointNameArea,
  PointDetail,
};
