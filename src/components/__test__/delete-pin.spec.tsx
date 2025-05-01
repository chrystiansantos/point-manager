import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useAreaMarkersStore } from "../../store/useAreaMarkers.store";
import { DeletePin } from "../delete-pin";

vi.mock("../../store/useAreaMarkers.store", () => ({
  useAreaMarkersStore: vi.fn(),
}));

describe("DeletePin", () => {
  let closeModal: Mock;
  let removePin: Mock;

  beforeEach(() => {
    closeModal = vi.fn();
    removePin = vi.fn();

    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      areaSelectId: "area1",
      pinSelectId: "pin1",
      removePin,
    });
  });

  it("should render the modal correctly", () => {
    render(<DeletePin closeModal={closeModal} />);

    expect(screen.getByText(/Excluir ponto selecionado\?/)).toBeInTheDocument();
    expect(screen.getByText(/Atenção!/)).toBeInTheDocument();
    expect(
      screen.getByText(/Essa ação não poderá ser desfeita\./),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Excluir", hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/)).toBeInTheDocument();
  });

  it("should call removePin and closeModal when 'Delete' is clicked", () => {
    render(<DeletePin closeModal={closeModal} />);

    const deleteButton = screen.getByText("Excluir");
    fireEvent.click(deleteButton);

    expect(removePin).toHaveBeenCalledWith("area1", "pin1");
    expect(closeModal).toHaveBeenCalled();
  });

  it("should call closeModal when 'Cancel' is clicked", () => {
    render(<DeletePin closeModal={closeModal} />);

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(closeModal).toHaveBeenCalled();
    expect(removePin).not.toHaveBeenCalled();
  });

  it("should not call removePin if no area or pin is selected", () => {
    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      areaSelectId: null,
      pinSelectId: null,
      removePin,
    });

    render(<DeletePin closeModal={closeModal} />);

    const deleteButton = screen.getByText("Excluir");
    fireEvent.click(deleteButton);

    expect(removePin).not.toHaveBeenCalled();
    expect(closeModal).not.toHaveBeenCalled();
  });
});
