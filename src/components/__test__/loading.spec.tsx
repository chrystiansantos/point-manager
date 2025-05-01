import logo from "@/assets/checkplant-loading.gif";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loading } from "../loading";

describe("Loading Component", () => {
  it("should render the loading spinner correctly", () => {
    render(<Loading />);

    const image = screen.getByAltText("Checkplant Logo");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", logo);
    expect(image).toHaveClass("size-48");

    const divContainer = screen.getByTestId("container-loading");

    expect(divContainer).toHaveClass("fixed");
    expect(divContainer).toHaveClass("inset-0");
    expect(divContainer).toHaveClass("z-50");
    expect(divContainer).toHaveClass("flex");
    expect(divContainer).toHaveClass("items-center");
    expect(divContainer).toHaveClass("justify-center");
    expect(divContainer).toHaveClass("bg-neutral-dark-950");
  });
});
