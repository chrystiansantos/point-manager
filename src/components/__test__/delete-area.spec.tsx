import { DeleteArea } from "@/components/delete-area";
import * as services from "@/services";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/store/useAreaMarkers.store");
vi.mock("@/services");

describe("DeleteArea Modal", () => {
  const closeModalMock = vi.fn();
  const fetchAreasMock = vi.fn();
  const selectAreaAndPinIdMock = vi.fn();
  const deleteAreaMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      areaSelectId: "area-001",
      selectAreaAndPinId: selectAreaAndPinIdMock,
      fetchAreas: fetchAreasMock,
    });

    (services.deleteArea as unknown as ReturnType<typeof vi.fn>) =
      deleteAreaMock;
  });

  it("renders modal content correctly", () => {
    render(<DeleteArea closeModal={closeModalMock} />);

    expect(screen.getByText("Excluir área selecionada?")).toBeInTheDocument();
    expect(screen.getByText("Atenção!")).toBeInTheDocument();
    expect(
      screen.getByText("Essa ação não poderá ser desfeita."),
    ).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("calls deleteArea and updates state when 'Excluir' is clicked", async () => {
    deleteAreaMock.mockResolvedValue(undefined);

    render(<DeleteArea closeModal={closeModalMock} />);
    fireEvent.click(screen.getByText("Excluir"));

    await waitFor(() => {
      expect(deleteAreaMock).toHaveBeenCalledWith("area-001");
      expect(selectAreaAndPinIdMock).toHaveBeenCalledWith(null);
      expect(fetchAreasMock).toHaveBeenCalled();
      expect(closeModalMock).toHaveBeenCalled();
    });
  });

  it("calls only closeModal when 'Cancelar' is clicked", () => {
    render(<DeleteArea closeModal={closeModalMock} />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(closeModalMock).toHaveBeenCalled();
  });

  it("does not call deleteArea if areaSelectId is null", async () => {
    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      areaSelectId: null,
      selectAreaAndPinId: selectAreaAndPinIdMock,
      fetchAreas: fetchAreasMock,
    });

    render(<DeleteArea closeModal={closeModalMock} />);
    fireEvent.click(screen.getByText("Excluir"));

    await waitFor(() => {
      expect(deleteAreaMock).not.toHaveBeenCalled();
      expect(selectAreaAndPinIdMock).not.toHaveBeenCalled();
      expect(fetchAreasMock).not.toHaveBeenCalled();
      expect(closeModalMock).not.toHaveBeenCalled();
    });
  });
});
