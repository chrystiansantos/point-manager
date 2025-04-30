import { PrimaryButton } from "@/components/button";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("PrimaryButton", () => {
  it("should render the button", () => {
    render(<PrimaryButton variant="primary">Click me</PrimaryButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should apply primary variant styles", () => {
    render(<PrimaryButton variant="primary">Primary</PrimaryButton>);
    const button = screen.getByRole("button", { name: /primary/i });
    expect(button).toHaveClass("bg-red-500");
    expect(button).not.toHaveClass("border-2");
  });

  it("should apply secondary variant styles", () => {
    render(<PrimaryButton variant="secondary">Secondary</PrimaryButton>);
    const button = screen.getByRole("button", { name: /secondary/i });
    expect(button).toHaveClass("bg-neutral-light");
    expect(button).toHaveClass("border-2");
    expect(button).toHaveClass("text-neutral-dark-600");
  });

  it("should merge custom className with default classes", () => {
    render(
      <PrimaryButton variant="primary" className="custom-class">
        Custom
      </PrimaryButton>,
    );
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
    expect(button).toHaveClass("bg-red-500");
  });

  it("should handle click events", () => {
    const handleClick = vi.fn();
    render(
      <PrimaryButton variant="primary" onClick={handleClick}>
        Clickable
      </PrimaryButton>,
    );
    const button = screen.getByRole("button", { name: /clickable/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
