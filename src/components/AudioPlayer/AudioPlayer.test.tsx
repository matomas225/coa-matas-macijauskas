import { fireEvent, render, screen } from "@testing-library/react";
import { AudioPlayer } from "./AudioPlayer";
import { vi } from "vitest";
import { useCurrentSong } from "./useCurrentSong";
import { faPlayCircle, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

const mockHandlePlayPause = vi.fn();
const mockNextSong = vi.fn();
const mockPreviousSong = vi.fn();

vi.mock("./useCurrentSong", () => ({
  useCurrentSong: () => ({
    currentSongData: {
      songPath: "song.mp3",
      imagePath: "cover.jpg",
      title: "Test Song",
      artist: "Test Artist",
    },
    isPlaying: false,
    currentSongId: "123",
    songIcon: () => faPlayCircle,
    handlePlayPause: mockHandlePlayPause,
    handleNextSong: mockNextSong,
    handlePreviousSong: mockPreviousSong,
  }),
}));

const mockHandleSliderChange = vi.fn();
const mockVolumeChange = vi.fn();

vi.mock("./useAudioPlayer", () => ({
  useAudioPlayer: () => ({
    audioRef: { current: null },
    currentTime: 10,
    duration: 100,
    volume: 0.5,
    volumeIcon: faVolumeHigh,
    audioSliderRef: { current: null },
    volumeSliderRef: { current: null },
    handleVolumeChange: mockVolumeChange,
    handleSliderChange: mockHandleSliderChange,
  }),
}));

vi.mock("@utils/formatTime", () => ({
  formatTime: (time: number) => `${Math.floor(time)}s`,
}));

describe("AudioPlayer", () => {
  it("Renders an audio player component and song info", () => {
    render(<AudioPlayer />);
    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("calls previous song handler on click", () => {
    render(<AudioPlayer />);
    const button = screen.getByTestId("previous-button");
    fireEvent.click(button);
    expect(useCurrentSong().handlePreviousSong).toHaveBeenCalled();
  });

  it("calls play/pause handler on click", () => {
    render(<AudioPlayer />);
    const button = screen.getByTestId("play-pause-button");
    fireEvent.click(button);
    expect(useCurrentSong().handlePlayPause).toHaveBeenCalled();
  });

  it("calls next song handler on click", () => {
    render(<AudioPlayer />);
    const button = screen.getByTestId("next-button");
    fireEvent.click(button);
    expect(useCurrentSong().handleNextSong).toHaveBeenCalled();
  });

  it("displays current time and duration", () => {
    render(<AudioPlayer />);
    expect(screen.getByText("10s")).toBeInTheDocument();
  });

  it("calls handleSliderChange when slider is clicked or draged", () => {
    render(<AudioPlayer />);
    const audioSlider = screen.getByTestId("audio-slider");
    fireEvent.change(audioSlider, { target: { value: "50" } });
    expect(mockHandleSliderChange).toHaveBeenCalled();
  });

  it("call handleVolumeChange when volume slider is clicked or dragged", () => {
    render(<AudioPlayer />);
    const volumeSlider = screen.getByTestId("volume-slider");
    fireEvent.change(volumeSlider, { target: { value: "0.05" } });
    expect(mockVolumeChange).toHaveBeenCalled();
  });
});
