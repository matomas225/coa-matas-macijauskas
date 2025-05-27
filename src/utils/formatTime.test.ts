import { describe, it, expect } from "vitest";
import { formatTime } from "./formatTime";

describe("formatTime", () => {
  it("formats 0 seconds as 0:00", () => {
    expect(formatTime(0)).toBe("0:00");
  });

  it("formats less than a minute correctly", () => {
    expect(formatTime(5)).toBe("0:05");
    expect(formatTime(59)).toBe("0:59");
  });

  it("formats exactly one minute correctly", () => {
    expect(formatTime(60)).toBe("1:00");
  });

  it("formats minutes and seconds correctly", () => {
    expect(formatTime(75)).toBe("1:15");
    expect(formatTime(125)).toBe("2:05");
    expect(formatTime(3599)).toBe("59:59");
  });

  it("pads single digit seconds with zero", () => {
    expect(formatTime(61)).toBe("1:01");
    expect(formatTime(600)).toBe("10:00");
  });

  it("handles large numbers", () => {
    expect(formatTime(3600)).toBe("60:00");
    expect(formatTime(3725)).toBe("62:05");
  });
});
