import { ShowPointsList } from "@/components/show-points-list";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

// Mock Zustand store

vi.mock("@/store/useAreaMarkers.store", async () => {
  const actual = await vi.importActual<
    typeof import("@/store/useAreaMarkers.store")
  >("@/store/useAreaMarkers.store");
  return {
    ...actual,
    useAreaMarkersStore: vi.fn(),
  };
});

const mockSelectAreaAndPinId = vi.fn();
const mockUpdateCenterMap = vi.fn();

const mockPin = {
  id: "pin-1",
  name: "001",
  createdAt: new Date("2023-01-01T12:00:00"),
  position: { lat: -10, lng: -50 },
};

const mockArea = {
  id: "area-1",
  name: "Test Area",
  position: [],
  center: { lat: -10, lng: -50 },
  pins: [mockPin],
};

describe("ShowPointsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the empty state when there are no areas", () => {
    (useAreaMarkersStore as unknown as Mock).mockReturnValue({
      isCreateNewArea: false,
      areas: [],
      pinSelectId: null,
      selectAreaAndPinId: mockSelectAreaAndPinId,
      updateCenterMap: mockUpdateCenterMap,
    });

    render(<ShowPointsList />);
    expect(screen.getByText("Listagem de pontos")).toBeInTheDocument();
    expect(
      screen.getByText("Sem pontos de monitoramento para exibir no momento."),
    ).toBeInTheDocument();
  });

  it("should render an area and its pins", () => {
    (useAreaMarkersStore as unknown as Mock).mockReturnValue({
      isCreateNewArea: false,
      areas: [mockArea],
      pinSelectId: null,
      selectAreaAndPinId: mockSelectAreaAndPinId,
      updateCenterMap: mockUpdateCenterMap,
    });

    render(<ShowPointsList />);
    expect(screen.getByText("Test Area")).toBeInTheDocument();
    expect(screen.getByText("Ponto nº 001")).toBeInTheDocument();
  });

  it("should call selectAreaAndPinId and updateCenterMap when a pin is clicked", async () => {
    const user = userEvent.setup();

    (useAreaMarkersStore as unknown as Mock).mockReturnValue({
      isCreateNewArea: false,
      areas: [mockArea],
      pinSelectId: null,
      selectAreaAndPinId: mockSelectAreaAndPinId,
      updateCenterMap: mockUpdateCenterMap,
    });

    render(<ShowPointsList />);
    const button = screen.getByRole("button", { name: /Ponto nº 001/i });

    await user.click(button);

    expect(mockSelectAreaAndPinId).toHaveBeenCalledWith("area-1", "pin-1");
    expect(mockUpdateCenterMap).toHaveBeenCalledWith({ lat: -10, lng: -50 });
  });

  it("should disable pin buttons when isCreateNewArea is true", () => {
    (useAreaMarkersStore as unknown as Mock).mockReturnValue({
      isCreateNewArea: true,
      areas: [mockArea],
      pinSelectId: null,
      selectAreaAndPinId: mockSelectAreaAndPinId,
      updateCenterMap: mockUpdateCenterMap,
    });

    render(<ShowPointsList />);
    const button = screen.getByRole("button", { name: /Ponto nº 001/i });
    expect(button).toBeDisabled();
  });

  it("should highlight the selected pin", () => {
    (useAreaMarkersStore as unknown as Mock).mockReturnValue({
      isCreateNewArea: false,
      areas: [mockArea],
      pinSelectId: "pin-1",
      selectAreaAndPinId: mockSelectAreaAndPinId,
      updateCenterMap: mockUpdateCenterMap,
    });

    const { getByRole } = render(<ShowPointsList />);
    const button = getByRole("button", { name: /Ponto nº 001/i });
    expect(button.className).toMatch(/bg-neutral-light-50/); // Class added when selected
  });
});
