import { DeleteAllPins } from "@/components/delete-all-pins";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/store/useAreaMarkers.store");

describe("DeleteAllPins Modal", () => {
  const closeModalMock = vi.fn();
  const removeAllPinsMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      areaSelectId: "area-123",
      removeAllPins: removeAllPinsMock,
    });
  });

  it("renders modal content correctly", () => {
    render(<DeleteAllPins closeModal={closeModalMock} />);

    expect(screen.getByText("Excluir todos os pontos?")).toBeInTheDocument();
    expect(screen.getByText("Atenção!")).toBeInTheDocument();
    expect(
      screen.getByText("Essa ação não poderá ser desfeita."),
    ).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("calls removeAllPins and closes modal when 'Excluir' is clicked", () => {
    render(<DeleteAllPins closeModal={closeModalMock} />);

    fireEvent.click(screen.getByText("Excluir"));

    expect(removeAllPinsMock).toHaveBeenCalledWith("area-123");
    expect(closeModalMock).toHaveBeenCalled();
  });

  it("calls closeModal only when 'Cancelar' is clicked", () => {
    render(<DeleteAllPins closeModal={closeModalMock} />);

    fireEvent.click(screen.getByText("Cancelar"));

    expect(removeAllPinsMock).not.toHaveBeenCalled();
    expect(closeModalMock).toHaveBeenCalled();
  });

  it("does not call removeAllPins if areaSelectId is null", () => {
    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      areaSelectId: null,
      removeAllPins: removeAllPinsMock,
    });

    render(<DeleteAllPins closeModal={closeModalMock} />);
    fireEvent.click(screen.getByText("Excluir"));

    expect(removeAllPinsMock).not.toHaveBeenCalled();
    expect(closeModalMock).not.toHaveBeenCalled();
  });
});
