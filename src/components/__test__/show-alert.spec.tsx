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
        title: "Test Title",
        subtitle: "Test Subtitle",
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

  it("should render the Toast with title and subtitle", () => {
    render(<ShowAlert />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("should trigger handleSaveAreaAndPins when the button is clicked", async () => {
    render(<ShowAlert />);
    const button = screen.getByRole("button", { name: /Save/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(updatePinsMock).toHaveBeenCalled();
    expect(fetchAreasMock).toHaveBeenCalled();
    expect(closeMock).toHaveBeenCalled();
  });

  it("should automatically close the toast after the duration", () => {
    render(<ShowAlert />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(closeMock).toHaveBeenCalled();
  });

  it('should manually close the toast when callbackFunctionName is "close"', () => {
    (useNotificationStore as unknown as Mock).mockReturnValue({
      notification: {
        open: true,
        type: "DEFAULT",
        title: "Test Title",
        subtitle: "Test Subtitle",
        callbackFunctionName: "close",
        alertDurationInSeconds: null,
      },
      close: closeMock,
    });

    render(<ShowAlert />);
    const button = screen.getByRole("button", { name: /Close/i });

    fireEvent.click(button);
    expect(closeMock).toHaveBeenCalled();
  });
});
