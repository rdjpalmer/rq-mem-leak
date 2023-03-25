import * as React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Component from "./Component";

const queryClient = new QueryClient();

function Wrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("Component", () => {
  it("should render the component and update on button click", async () => {
    jest.useFakeTimers();

    render(<Component />, { wrapper: Wrapper });

    expect(screen.getByText("Hello, world @")).toBeInTheDocument();

    const updateButton = screen.getByRole("button", { name: /Update/i });
    fireEvent.click(updateButton);

    await waitFor(() => {
      const loadingText = screen.getByText(/Hello, world @ Loading…/i);
      expect(loadingText).toBeInTheDocument();
    });

    await waitFor(() => {
      const loadingText = screen.queryByText(/Hello, world @ Loading…/i);
      expect(loadingText).toBeNull();
    });

    const updatedText = screen.getByText(/Hello, world @ \d+/);
    expect(updatedText).toBeInTheDocument();

    const previousData = updatedText.textContent.match(/\d+/)[0];

    act(() => {
      jest.advanceTimersByTime(100);
    });

    fireEvent.click(updateButton);

    await waitFor(() => {
      const newData = screen
        .getByText(/Hello, world @ \d+/)
        .textContent.match(/\d+/)[0];
      expect(parseInt(newData, 10)).toBeGreaterThan(parseInt(previousData, 10));
    });
  });
});
