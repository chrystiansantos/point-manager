import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Marker } from "../marker";

// Mock the Google Maps API and its classes
beforeEach(() => {
  globalThis.window.google = {
    maps: {
      Size: class {
        constructor(
          public width: number,
          public height: number,
        ) {
          this.width = width;
          this.height = height;
        }
      },
    },
  } as unknown as typeof window.google;
});

// Mock Marker component from Google Maps API
vi.mock("@react-google-maps/api", () => ({
  Marker: vi.fn((props) => (
    <div
      data-testid="mock-marker"
      data-draggable={props.draggable}
      data-icon-url={props.icon?.url}
      onClick={props.onClick}
      onDragEnd={props.onDragEnd}
    >
      Marker Mock
    </div>
  )),
}));

describe("Marker", () => {
  const position = { lat: -23.5, lng: -46.6 };

  it("renders with correct props when draggable", () => {
    render(
      <Marker
        draggable={true}
        position={position}
        onClick={vi.fn()}
        onDragEnd={vi.fn()}
      />,
    );

    const marker = screen.getByTestId("mock-marker");
    expect(marker).toBeInTheDocument();
    expect(marker.dataset.draggable).toBe("true");
    expect(marker.dataset.iconUrl).contain("enable_move.svg");
  });

  it("renders with correct icon when not draggable", () => {
    render(
      <Marker
        draggable={false}
        position={position}
        onClick={vi.fn()}
        onDragEnd={vi.fn()}
      />,
    );

    const marker = screen.getByTestId("mock-marker");
    expect(marker.dataset.iconUrl).contain("disable_move.svg");
  });

  it("calls onClick handler", async () => {
    const handleClick = vi.fn();
    render(
      <Marker
        draggable={true}
        position={position}
        onClick={handleClick}
        onDragEnd={vi.fn()}
      />,
    );

    const marker = screen.getByTestId("mock-marker");
    await userEvent.click(marker);
    expect(handleClick).toHaveBeenCalled();
  });

  it("calls onDragEnd handler", () => {
    const handleDragEnd = vi.fn();
    render(
      <Marker
        draggable={true}
        position={position}
        onClick={vi.fn()}
        onDragEnd={handleDragEnd}
      />,
    );

    const marker = screen.getByTestId("mock-marker");
    marker.dispatchEvent(new Event("dragend", { bubbles: true }));
    expect(handleDragEnd).toHaveBeenCalled();
  });
});
