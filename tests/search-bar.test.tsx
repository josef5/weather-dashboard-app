import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";
import weatherReducer from "../src/store/weatherSlice";
import SearchBar from "../src/components/search-bar";

// Create a properly typed mock for dispatch
const mockDispatch = vi.fn();

// Mock react-redux hooks
vi.mock("react-redux", async () => {
  const actual = await import("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

// Mock the addCity action creator
vi.mock("../store/weatherSlice", async () => {
  const actual = await import("../src/store/weatherSlice");
  return {
    ...actual,
    addCity: vi.fn().mockImplementation((city: string) => ({
      type: "weather/addCity",
      payload: city,
    })),
  };
});

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

describe("SearchBar", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );

    expect(screen.getByPlaceholderText("Add a city")).toBeInTheDocument();
  });

  it("updates input value when user types", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );

    const input = screen.getByPlaceholderText("Add a city") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "London" } });

    expect(input.value).toBe("London");
  });

  it("dispatches addCity action on form submission", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );

    const input = screen.getByPlaceholderText("Add a city");
    fireEvent.change(input, { target: { value: "New York" } });

    const form = input.closest("form");
    fireEvent.submit(form || input);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("clears input after form submission", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );

    const input = screen.getByPlaceholderText("Add a city") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Tokyo" } });

    const form = input.closest("form");
    fireEvent.submit(form || input);

    expect(input.value).toBe("");
  });
});
