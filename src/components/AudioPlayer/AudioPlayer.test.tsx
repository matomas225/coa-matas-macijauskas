import React from "react";
import { render, screen } from "@testing-library/react";
import { AudioPlayer } from "./AudioPlayer";
import { Provider } from "react-redux";
import store from "@/state/store";

describe("AudioPlayer", () => {
  it("Renders and audio player component", () => {
    render(
      <Provider store={store}>
        <AudioPlayer />
      </Provider>
    );
  });
});
