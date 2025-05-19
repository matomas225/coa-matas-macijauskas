import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faVolumeUp,
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

import { vi } from "vitest";

// Mock react-i18next for all tests
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value: vi.fn(),
});
Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined),
});

library.add(faVolumeUp, faPlay, faPause, faForward, faBackward);
