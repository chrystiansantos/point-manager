import { ListPoints } from "@/components/points-list";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("ListPoints.Root", () => {
  it("should render children inside the container", () => {
    render(
      <ListPoints.Root>
        <p>Test content</p>
      </ListPoints.Root>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });
});

describe("ListPoints.Title", () => {
  it("should display the given title", () => {
    render(<ListPoints.Title title="Point List" />);
    expect(screen.getByText("Point List")).toBeInTheDocument();
  });
});

describe("ListPoints.Empty", () => {
  it("should display the given description", () => {
    render(<ListPoints.Empty description="No points available." />);
    expect(screen.getByText("No points available.")).toBeInTheDocument();
  });
});

describe("ListPoints.Group", () => {
  it("should render children inside the group", () => {
    render(
      <ListPoints.Group>
        <p>Grouped Point</p>
      </ListPoints.Group>,
    );
    expect(screen.getByText("Grouped Point")).toBeInTheDocument();
  });
});

describe("ListPoints.PointNameArea", () => {
  it("should display the point name", () => {
    render(<ListPoints.PointNameArea name="Group A" />);
    expect(screen.getByText("Group A")).toBeInTheDocument();
  });
});

describe("ListPoints.PointDetail", () => {
  const mockDate = new Date("2023-09-15T14:35:00");
  const mockSelectPoint = vi.fn();

  it("should render point details correctly", () => {
    render(
      <ListPoints.PointDetail
        name="123"
        createdAt={mockDate}
        selected={false}
        selectPoint={mockSelectPoint}
        disabled={false}
      />,
    );

    expect(screen.getByText("Ponto nº 123")).toBeInTheDocument();
    expect(screen.getByText("Criado em:")).toBeInTheDocument();
    expect(screen.getByText("15/09/2023 - 14:35")).toBeInTheDocument();
  });

  it("should trigger selectPoint when clicked", () => {
    render(
      <ListPoints.PointDetail
        name="456"
        createdAt={mockDate}
        selected={false}
        selectPoint={mockSelectPoint}
        disabled={false}
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockSelectPoint).toHaveBeenCalled();
  });

  it("should apply selected style when selected is true", () => {
    const { getByRole } = render(
      <ListPoints.PointDetail
        name="123"
        createdAt={mockDate}
        selected={true}
        selectPoint={mockSelectPoint}
        disabled={false}
      />,
    );

    expect(getByRole("button")).toHaveClass("bg-neutral-light-50");
  });
});
