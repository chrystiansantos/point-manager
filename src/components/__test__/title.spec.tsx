import { Heading } from "@/components/title"; // adjust the path as needed
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Heading", () => {
  it("should render children correctly", () => {
    render(
      <Heading>
        <Heading.Title title="Header content" />
      </Heading>,
    );
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("should apply correct classes to the header", () => {
    const { container } = render(
      <Heading>
        <Heading.Title title="Header content" />
      </Heading>,
    );
    expect(container.firstChild).toHaveClass("px-4 py-7 shadow-sm");
  });
});

describe("Heading.Title", () => {
  it("should render the title correctly", () => {
    render(<Heading.Title title="Test Title" />);
    const heading = screen.getByRole("heading", { name: "Test Title" });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-neutral-dark-900 text-2xl font-bold");
  });
});
