import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toast } from "../toast";

describe("Toast Component", () => {
  it("should render Root with default style and not be visible when open is false", () => {
    const { getByTestId } = render(
      <Toast.Root type="DEFAULT" open={false}>
        <Toast.WrapperInfo>
          <Toast.Title>Title</Toast.Title>
          <Toast.SubTitle>SubTitle</Toast.SubTitle>
        </Toast.WrapperInfo>
        <Toast.Button onClick={() => console.log("Save")}>Salvar</Toast.Button>
      </Toast.Root>,
    );

    const element = getByTestId("toast-root");

    expect(element).not.toHaveClass("top-1");
    expect(element).toHaveClass(
      "-top-24",
      "border-neutral-light-300",
      "shadow-sm",
    );
  });

  it("should render Toast as visible when open is true", () => {
    const { getByText } = render(
      <Toast.Root type="DEFAULT" open>
        <Toast.WrapperInfo>
          <Toast.Title>Title</Toast.Title>
          <Toast.SubTitle>SubTitle</Toast.SubTitle>
        </Toast.WrapperInfo>
        <Toast.Button onClick={() => console.log("Save")}>Salvar</Toast.Button>
      </Toast.Root>,
    );

    const element = screen.getByTestId("toast-root");
    const title = getByText("Title");
    const subTitle = getByText("SubTitle");

    expect(element).not.toHaveClass("-top-24");
    expect(element).toHaveClass("top-1");
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
  });

  it("should render Toast as visible when open is true with style error", () => {
    const { getByText, getByRole } = render(
      <Toast.Root type="ERROR" open>
        <Toast.WrapperInfo>
          <Toast.Title>Title</Toast.Title>
          <Toast.SubTitle>SubTitle</Toast.SubTitle>
        </Toast.WrapperInfo>
        <Toast.Button onClick={() => console.log("Save")}>Salvar</Toast.Button>
      </Toast.Root>,
    );

    const element = screen.getByTestId("toast-root");

    const title = getByText("Title");
    const subTitle = getByText("SubTitle");
    const button = getByRole("button");

    expect(element).not.toHaveClass("-top-24");
    expect(element).toHaveClass("top-1");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-red-500/70");

    expect(subTitle).toBeInTheDocument();
    expect(subTitle).toHaveClass("text-red-500/70");
    expect(button).toHaveClass("bg-red-500/80");
  });
});
