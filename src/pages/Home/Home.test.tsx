import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home Component", () => {
  test("renders the home page title", () => {
    render(<Home />);

    // Check if the Home Page title is rendered
    const headingElement = screen.getByText(/Home Page/i);
    expect(headingElement).toBeInTheDocument();
  });
});
