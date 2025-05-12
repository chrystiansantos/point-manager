import * as updatePinsModule from "@/services/update-pins";
import { useNotificationStore } from "@/store/notification.store";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { ShowAlert } from "../show-alert";

vi.mock("@/store/notification.store");
vi.mock("@/store/useAreaMarkers.store");
vi.mock("@/services/update-pins");

describe("ShowAlert Component", () => {
  const closeMock = vi.fn();
  const fetchAreasMock = vi.fn();
  const updatePinsMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();

    (useNotificationStore as unknown as Mock).mockReturnValue({
      notification: {
        open: true,
        type: "DEFAULT",
        title: "Teste Título",
        subtitle: "Teste Subtítulo",
        callbackFunctionName: "saveAreaAndPins",
        alertDurationInSeconds: 2,
      },
      close: closeMock,
    });

    (useAreaMarkersStore as unknown as Mock).mockReturnValue({
      areas: [{ id: "1", name: "Area 1", position: [], pins: [] }],
      fetchAreas: fetchAreasMock,
    });

    (updatePinsModule.updatePins as unknown as Mock).mockImplementation(
      updatePinsMock,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  it("deve renderizar o Toast com título e subtítulo", () => {
    render(<ShowAlert />);

    expect(screen.getByText("Teste Título")).toBeInTheDocument();
    expect(screen.getByText("Teste Subtítulo")).toBeInTheDocument();
  });

  it("deve disparar handleSaveAreaAndPins ao clicar no botão", async () => {
    render(<ShowAlert />);
    const button = screen.getByRole("button", { name: /Salvar/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(updatePinsMock).toHaveBeenCalled();
    expect(fetchAreasMock).toHaveBeenCalled();
    expect(closeMock).toHaveBeenCalled();
  });

  it("deve fechar o toast automaticamente após o tempo", () => {
    render(<ShowAlert />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(closeMock).toHaveBeenCalled();
  });

  it('deve fechar o toast manualmente quando callbackFunctionName for "close"', () => {
    (useNotificationStore as unknown as Mock).mockReturnValue({
      notification: {
        open: true,
        type: "DEFAULT",
        title: "Teste Título",
        subtitle: "Teste Subtítulo",
        callbackFunctionName: "close",
        alertDurationInSeconds: null,
      },
      close: closeMock,
    });

    render(<ShowAlert />);
    const button = screen.getByRole("button", { name: /Fechar/i });

    fireEvent.click(button);
    expect(closeMock).toHaveBeenCalled();
  });
});
