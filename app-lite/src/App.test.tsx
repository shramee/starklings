import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders the starklings home page", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getAllByText(/starklings/i).length).toBeGreaterThan(0);
});
