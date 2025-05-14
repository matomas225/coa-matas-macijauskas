import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import store from "@/state/store";

describe("Navigation Component", () => {
  it("renders navigation inner elements", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
