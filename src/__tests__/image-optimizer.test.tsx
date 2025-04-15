import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ImageOptimizer } from "../index";

class MockImage {
  onload: (() => void) | null = null;
  onerror: ((e: ErrorEvent) => void) | null = null;
  src: string = "";

  constructor() {
    setTimeout(() => {
      if (this.src.includes("error")) {
        this.onerror?.(new ErrorEvent("error"));
      } else {
        this.onload?.();
      }
    }, 0);
  }

  addEventListener(event: string, callback: () => void) {
    if (event === "load") this.onload = callback;
    if (event === "error") this.onerror = callback as any;
  }

  removeEventListener(event: string) {
    if (event === "load") this.onload = null;
    if (event === "error") this.onerror = null;
  }
}

(global as any).Image = MockImage;

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

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("handles image load successfully", async () => {
    render(
      <ImageOptimizer
        src="https://example.com/image.jpg"
        alt="Test image"
        width={400}
        height={300}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("img")).toHaveStyle({ opacity: "1" });
    });
  });

  it("uses fallback image on error", async () => {
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

    await waitFor(() => {
      expect(screen.getByRole("img")).toHaveAttribute("src", fallbackSrc);
      expect(onError).toHaveBeenCalled();
    });
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
        src="https://example.com/image.jpg"
        alt="Test image"
        showSkeleton={false}
        width={400}
        height={300}
      />
    );

    expect(onError).toHaveBeenCalledWith(expect.any(Error));
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
});
