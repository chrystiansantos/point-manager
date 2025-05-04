import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { fireEvent, render, screen } from "@testing-library/react";
import { ManagerButtons } from "../manager-buttons";

import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock child components
vi.mock("../create-new-area-modal", () => ({
  CreateNewAreaModal: () => (
    <div data-testid="create-area-modal">Create Area Modal</div>
  ),
}));
vi.mock("../delete-area", () => ({
  DeleteArea: () => (
    <div data-testid="delete-area-modal">Delete Area Modal</div>
  ),
}));
vi.mock("../delete-pin", () => ({
  DeletePin: () => <div data-testid="delete-pin-modal">Delete Pin Modal</div>,
}));
vi.mock("../delete-all-pins", () => ({
  DeleteAllPins: () => (
    <div data-testid="delete-all-pins-modal">Delete All Pins Modal</div>
  ),
}));

// Mock the store
vi.mock("@/store/useAreaMarkers.store");

const mockStore = {
  areas: [{ id: "area1", pins: [{ id: "pin1" }] }],
  isCreateNewArea: false,
  createPositionsArea: [],
  removeLastBorder: vi.fn(),
  resetCreateArea: vi.fn(),
  createArea: vi.fn(),
  areaSelectId: null,
  pinSelectId: null,
  cratePin: vi.fn(),
};

describe("ManagerButtons", () => {
  beforeEach(() => {
    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(mockStore);
  });

  it("renders Add Perímetro button by default", () => {
    render(<ManagerButtons />);
    expect(screen.getByText(/Add Perímetro/i)).toBeInTheDocument();
  });

  it("calls createArea when Add Perímetro is clicked", () => {
    render(<ManagerButtons />);
    const button = screen.getByText(/Add Perímetro/i);
    fireEvent.click(button);
    expect(mockStore.createArea).toHaveBeenCalledWith(true);
  });

  it("shows Create Area modal when Save is clicked", () => {
    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      ...mockStore,
      isCreateNewArea: true,
      createPositionsArea: [{}, {}], // length > 1
    });

    render(<ManagerButtons />);
    const saveButton = screen.getByText(/Salvar/i);
    fireEvent.click(saveButton);
    expect(screen.getByTestId("create-area-modal")).toBeInTheDocument();
  });

  it("shows Delete Area modal when Deletar perímetro is clicked", () => {
    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      ...mockStore,
      areaSelectId: "area1",
      pinSelectId: null,
    });

    render(<ManagerButtons />);
    const deleteAreaButton = screen.getByText(/Deletar perímetro/i);
    fireEvent.click(deleteAreaButton);
    expect(screen.getByTestId("delete-area-modal")).toBeInTheDocument();
  });

  it("shows Delete Pin modal when Deletar pin is clicked", () => {
    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      ...mockStore,
      areaSelectId: "area1",
      pinSelectId: "pin1",
    });

    render(<ManagerButtons />);
    const deletePinButton = screen.getByText(/Deletar pin/i);
    fireEvent.click(deletePinButton);
    expect(screen.getByTestId("delete-pin-modal")).toBeInTheDocument();
  });

  it("calls cratePin when Adicionar Novo is clicked", () => {
    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      ...mockStore,
      areaSelectId: "area1",
    });

    render(<ManagerButtons />);
    const addPinButton = screen.getByText(/Adicionar Novo/i);
    fireEvent.click(addPinButton);
    expect(mockStore.cratePin).toHaveBeenCalledWith("area1");
  });

  it("shows Delete All Pins modal when Deletar todos is clicked", () => {
    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      ...mockStore,
      areaSelectId: "area1",
      areas: [{ id: "area1", pins: [{ id: "pin1" }] }],
    });

    render(<ManagerButtons />);
    const deleteAllPinsButton = screen.getByText(/Deletar todos/i);
    fireEvent.click(deleteAllPinsButton);
    expect(screen.getByTestId("delete-all-pins-modal")).toBeInTheDocument();
  });

  it("call removeLastBorder correctly when Desfazer is clicked", () => {
    const mockRemove = vi.fn();

    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      ...mockStore,
      isCreateNewArea: true,
      createPositionsArea: [{}, {}, {}],
      removeLastBorder: mockRemove,
    });

    render(<ManagerButtons />);

    const undoButton = screen.getByRole("button", {
      name: /Desfazer/i,
    });

    fireEvent.click(undoButton);
    expect(mockRemove).toHaveBeenCalled();
  });

  it("call resetCreateArea correctly when Desfazer is clicked", () => {
    const mockReset = vi.fn();

    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      ...mockStore,
      isCreateNewArea: true,
      createPositionsArea: [{}, {}],
      resetCreateArea: mockReset,
    });

    render(<ManagerButtons />);

    const undoButton = screen.getByRole("button", {
      name: /Desfazer/i,
    });

    fireEvent.click(undoButton);

    expect(mockReset).toHaveBeenCalled();
  });
});
