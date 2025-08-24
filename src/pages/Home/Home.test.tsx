import { render } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/state/store";

describe("Home Component", () => {
  it("renders the home page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  });
});
