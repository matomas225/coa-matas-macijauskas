import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";

describe("Home Component", () => {
  it("renders the home page title", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check if the Home Page title is rendered
    const headingElement = screen.getByText(/Home Page/i);
    expect(headingElement).toBeInTheDocument();
  });
});
