import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";
import { vi } from "vitest";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

vi.mock("./components/AudioPlayer/useCurrentSong", () => ({
  useCurrentSong: () => ({
    currentSongData: {
      songPath: "song.mp3",
      imagePath: "cover.jpg",
      title: "Test Song",
      artist: "Test Artist",
    },
    currentSongId: "123",
    isPlaying: false,
    songIcon: () => faPlayCircle,
    handlePlayPause: vi.fn(),
    handleNextSong: vi.fn(),
    handlePreviousSong: vi.fn(),
  }),
}));

describe("App", () => {
  it("renders Home and Login when not authenticated", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders Navigation and AudioPlayer", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("audio-player")).toBeInTheDocument();
  });
});
