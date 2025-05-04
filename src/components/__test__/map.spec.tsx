import { fireEvent, render } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Map } from "../map";

// Mock the global `google` object
beforeAll(() => {
  globalThis.google = {
    maps: {
      MapTypeId: { SATELLITE: "satellite" },
      ControlPosition: { TOP_RIGHT: 1 },
      Polygon: class {
        constructor() { }
        getPath() {
          return [];
        }
      },
      geometry: {
        poly: {
          containsLocation: vi.fn(() => true),
        },
      },
    },
  } as any;
});

// Mock dependencies
const fetchAreas = vi.fn();
const addBorderArea = vi.fn();
const selectAreaAndPinId = vi.fn();
const changePositionPin = vi.fn();

vi.mock("@react-google-maps/api", async () => {
  const actual = await vi.importActual("@react-google-maps/api");
  return {
    ...actual,
    useJsApiLoader: () => ({ isLoaded: true }),
    GoogleMap: ({ children, onClick }: any) => (
      <div data-testid="google-map" onClick={onClick}>
        {children}
      </div>
    ),
  };
});

vi.mock("../../store/useAreaMarkers.store", () => ({
  useAreaMarkersStore: () => ({
    fetchAreas,
    areas: [
      {
        id: "area-1",
        position: [{ lat: 10, lng: 20 }],
        pins: [
          {
            id: "pin-1",
            name: "Pin 1",
            position: { lat: 10, lng: 20 },
          },
        ],
      },
    ],
    isCreateNewArea: false,
    addBorderArea,
    createPositionsArea: [],
    areaSelectId: null,
    pinSelectId: null,
    selectAreaAndPinId,
    changePositionPin,
    centerMap: { lat: 0, lng: 0 },
  }),
}));

vi.mock("../polygon", () => ({
  Polygon: ({ onClick }: any) => (
    <div data-testid="polygon" onClick={onClick}>
      Polygon
    </div>
  ),
}));

vi.mock("../marker", () => ({
  Marker: ({ onClick, onDragEnd }: any) => (
    <div
      data-testid="marker"
      onClick={onClick}
      onMouseUp={() =>
        onDragEnd &&
        onDragEnd({ latLng: { toJSON: () => ({ lat: 1, lng: 1 }) } })
      }
    >
      Marker
    </div>
  ),
}));

vi.mock("../loading", () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

describe("Map - internal functions", () => {
  it("should call fetchAreas on mount", () => {
    render(<Map />);
    expect(fetchAreas).toHaveBeenCalled();
  });

  it("should call selectAreaAndPinId when clicking on a polygon", () => {
    const { getByTestId } = render(<Map />);
    fireEvent.click(getByTestId("polygon"));
    expect(selectAreaAndPinId).toHaveBeenCalledWith("area-1", null);
  });

  it("should call selectAreaAndPinId when clicking on a marker", () => {
    const { getByTestId } = render(<Map />);
    fireEvent.click(getByTestId("marker"));
    expect(selectAreaAndPinId).toHaveBeenCalledWith("area-1", "pin-1");
  });

  it("should call changePositionPin with the new valid position (inside the polygon)", () => {
    const { getByTestId } = render(<Map />);
    fireEvent.mouseUp(getByTestId("marker"));
    expect(changePositionPin).toHaveBeenCalledWith("area-1", "pin-1", {
      lat: 1,
      lng: 1,
    });
  });

  it("should render the GoogleMap component when isLoaded is true", () => {
    const { getByTestId } = render(<Map />);
    expect(getByTestId("google-map")).toBeInTheDocument();
  });
});
