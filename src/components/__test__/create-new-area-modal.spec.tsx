import { CreateNewAreaModal } from "@/components/create-new-area-modal";
import * as services from "@/services/create-area";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@/store/useAreaMarkers.store");
vi.mock("@/services/create-or-update-areas-and-pins");

describe("CreateNewAreaModal (Vitest)", () => {
  const closeModalMock = vi.fn();
  const fetchAreasMock = vi.fn();
  const resetCreateAreaMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (
      useAreaMarkersStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      createPositionsArea: [{ lat: -10.0, lng: -50.0 }],
      resetCreateArea: resetCreateAreaMock,
      fetchAreas: fetchAreasMock,
    });
  });

  it("renders modal elements correctly", () => {
    render(<CreateNewAreaModal closeModal={closeModalMock} />);

    expect(screen.getByText("Cadastrar nova área?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeDisabled();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("enables the submit button when a valid name is entered", async () => {
    render(<CreateNewAreaModal closeModal={closeModalMock} />);

    const input = screen.getByPlaceholderText("Nome");
    fireEvent.change(input, { target: { value: "Test Area" } });

    await waitFor(() => {
      expect(screen.getByText("Cadastrar")).not.toBeDisabled();
    });
  });

  it("shows error styling when name is invalid", async () => {
    render(<CreateNewAreaModal closeModal={closeModalMock} />);

    const input = screen.getByPlaceholderText("Nome");
    fireEvent.change(input, { target: { value: "A" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveAttribute("data-error", "true");
    });
  });

  it("submits the form and triggers callbacks correctly", async () => {
    const createOrUpdateMock = vi
      .spyOn(services, "createArea")
      .mockResolvedValue(new Response());

    render(<CreateNewAreaModal closeModal={closeModalMock} />);

    const input = screen.getByPlaceholderText("Nome");
    fireEvent.change(input, { target: { value: "New Area" } });

    await waitFor(() => {
      expect(screen.getByText("Cadastrar")).not.toBeDisabled();
    });

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(createOrUpdateMock).toHaveBeenCalled();
      expect(resetCreateAreaMock).toHaveBeenCalled();
      expect(fetchAreasMock).toHaveBeenCalled();
      expect(closeModalMock).toHaveBeenCalled();
    });
  });

  it("calls closeModal when cancel button is clicked", () => {
    render(<CreateNewAreaModal closeModal={closeModalMock} />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(closeModalMock).toHaveBeenCalled();
  });
});
