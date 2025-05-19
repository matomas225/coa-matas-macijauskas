import { fireEvent, render, screen } from "@testing-library/react";
import { A } from "./A";
import { Button } from "./Button";
import { Label } from "./Label";
import { Input } from "./Input";
import { vi } from "vitest";

const mockOnClick = vi.fn();

describe("A", () => {
  it("renders A element", () => {
    render(<A href="logout">Logout</A>);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls onClick when element is clicked", () => {
    render(
      <A href="logout" onClick={mockOnClick}>
        Logout
      </A>
    );
    const element = screen.getByText("Logout");
    fireEvent.click(element);
    expect(mockOnClick).toHaveBeenCalled();
  });
});

describe("Button", () => {
  it("renders Button element", () => {
    render(<Button type="button">Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", () => {
    const onClick = vi.fn();
    render(
      <Button type="button">
        <span onClick={onClick}>Click Me</span>
      </Button>
    );
    fireEvent.click(screen.getByText("Click Me"));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("Label", () => {
  it("renders Label element", () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("associates label with input", () => {
    render(
      <>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" />
      </>
    );
    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", "test-input");
  });
});

describe("Input", () => {
  it("renders Input element", () => {
    render(<Input type="text" id="test" name="test" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    render(
      <Input type="text" id="test" name="test" error="This is an error" />
    );
    expect(screen.getByText("This is an error")).toBeInTheDocument();
  });
});
