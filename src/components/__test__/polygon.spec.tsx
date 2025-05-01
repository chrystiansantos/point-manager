import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Polygon } from "../polygon";

vi.mock("@react-google-maps/api", () => ({
  Polygon: vi.fn(({ path, onClick, options }) => (
    <div
      data-testid="mock-polygon"
      data-path={JSON.stringify(path)}
      data-fill-color={options.fillColor}
      onClick={onClick}
    >
      Polygon Mock
    </div>
  )),
}));

describe("Polygon", () => {
  const mockPath = [
    { lat: -23.5, lng: -46.6 },
    { lat: -23.6, lng: -46.7 },
  ];

  it("renders with correct path and default fill color (not selected)", () => {
    render(<Polygon path={mockPath} select={false} />);
    const polygon = screen.getByTestId("mock-polygon");

    expect(polygon).toBeInTheDocument();
    expect(polygon.dataset.path).toBe(JSON.stringify(mockPath));
    expect(polygon.dataset.fillColor).toBe("rgba(255,255,255,0.2)");
  });

  it("renders with selected fill color", () => {
    render(<Polygon path={mockPath} select={true} />);
    const polygon = screen.getByTestId("mock-polygon");

    expect(polygon.dataset.fillColor).toBe("rgba(255,255,255,1)");
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    render(<Polygon path={mockPath} select={false} onClick={handleClick} />);

    const polygon = screen.getByTestId("mock-polygon");
    await userEvent.click(polygon);
    expect(handleClick).toHaveBeenCalled();
  });
});
