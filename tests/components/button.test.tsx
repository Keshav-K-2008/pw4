import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("should render correctly with text content", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render custom variants correctly", () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    let buttonElement = screen.getByRole("button", { name: /delete/i });
    expect(buttonElement).toHaveClass("bg-red-600");

    rerender(<Button variant="glass">Glassy</Button>);
    buttonElement = screen.getByRole("button", { name: /glassy/i });
    expect(buttonElement).toHaveClass("backdrop-blur-md");
  });

  it("should render loading spinner when isLoading is true", () => {
    render(<Button isLoading>Loading Button</Button>);
    const buttonElement = screen.getByRole("button");
    const svgElement = buttonElement.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass("animate-spin");
    expect(buttonElement).toBeDisabled();
  });

  it("should be disabled when disabled prop is provided", () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole("button", { name: /disabled button/i });
    expect(buttonElement).toBeDisabled();
  });
});
