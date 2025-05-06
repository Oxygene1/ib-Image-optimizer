import { ImageOptimizer } from "@/use-react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { beforeEach, describe, expect, it, vi } from "vitest";

global.Image = class MockImage implements Partial<HTMLImageElement> {
  onload: () => void = () => {};
  onerror: () => void = () => {};
  src: string = "";
  alt: string = "";
  width: number = 0;
  height: number = 0;
  complete: boolean = false;

  constructor(width?: number, height?: number) {
    if (width) this.width = width;
    if (height) this.height = height;

    // For testing, trigger load/error after a small delay
    setTimeout(() => {
      if (this.src.includes("error")) {
        this.onerror();
      } else if (this.src) {
        this.complete = true;
        this.onload();
      }
    }, 10);
  }

  addEventListener(event: string, callback: any) {
    if (event === "load") this.onload = callback;
    if (event === "error") this.onerror = callback;
  }

  removeEventListener() {}
} as any;

describe("ImageOptimizer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with skeleton when loading", () => {
    render(
      <ImageOptimizer
        src="https://example.com/image.jpg"
        alt="Test image"
        width={400}
        height={300}
      />
    );

    // Initial state should show skeleton and hide image
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveStyle({ opacity: 0 });

    fireEvent.load(screen.getByRole("img"));

    // After load, skeleton should be gone and image visible
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveStyle({ opacity: 1 });
  });

  it("handles image load successfully", () => {
    const onLoad = vi.fn();

    render(
      <ImageOptimizer
        src="https://example.com/image.jpg"
        alt="Test image"
        width={400}
        height={300}
        onLoad={onLoad}
      />
    );

    fireEvent.load(screen.getByRole("img"));

    // Check that image is visible and onLoad called
    expect(screen.getByRole("img")).toHaveStyle({ opacity: 1 });
    expect(onLoad).toHaveBeenCalled();
  });

  it("uses fallback image on error", () => {
    const fallbackSrc = "https://example.com/fallback.jpg";
    const onError = vi.fn();

    render(
      <ImageOptimizer
        src="https://error.com/image.jpg"
        fallbackSrc={fallbackSrc}
        alt="Test image"
        width={400}
        height={300}
        onError={onError}
      />
    );

    fireEvent.error(screen.getByRole("img"));

    // Now the src should be the fallback and onError should be called
    expect(screen.getByRole("img")).toHaveAttribute("src", fallbackSrc);
    expect(onError).toHaveBeenCalled();
  });

  it("respects aspect ratio classes", () => {
    const { container } = render(
      <ImageOptimizer
        src="https://example.com/image.jpg"
        alt="Test image"
        aspectRatio="square"
        width={400}
        height={400}
      />
    );

    expect(container.firstChild).toHaveClass("aspect-square");
  });

  it("disables skeleton when showSkeleton is false", () => {
    render(
      <ImageOptimizer
        src="https://example.com/image.jpg"
        alt="Test image"
        showSkeleton={false}
        width={400}
        height={300}
      />
    );

    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
  });

  it("handles missing src prop", () => {
    const onError = vi.fn();

    render(
      <ImageOptimizer
        alt="Test image"
        width={400}
        height={300}
        onError={onError}
      />
    );

    expect(onError).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ImageOptimizer
        src="https://example.com/image.jpg"
        alt="Test image"
        className="custom-class"
        width={400}
        height={300}
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("handles missing width and height props", () => {
    render(
      <ImageOptimizer src="https://example.com/image.jpg" alt="Test image" />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();

    fireEvent.load(screen.getByRole("img"));

    expect(screen.getByRole("img")).toHaveStyle({ opacity: 1 });
  });
});
