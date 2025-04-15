import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ImageOptimizer from "../use-react";

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

  addEventListener(event: string, callback: EventListener) {
    if (event === "load") this.onload = callback as () => void;
    if (event === "error") this.onerror = callback as (e: ErrorEvent) => void;
  }

  removeEventListener(event: string) {
    if (event === "load") this.onload = null;
    if (event === "error") this.onerror = null;
  }
}

describe("ImageOptimizer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global as any).Image = MockImage;
  });

  it("renders with skeleton when loading", async () => {
    render(
      <ImageOptimizer
        src="https://example.com/image.jpg"
        alt="Test image"
        width={400}
        height={300}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test image");
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveStyle({ opacity: "0" });

    await waitFor(() => {
      expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveStyle({ opacity: "1" });
    });
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
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://example.com/image.jpg"
      );
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
      expect(screen.getByRole("img")).toHaveStyle({ opacity: "1" });
      expect(onError).toHaveBeenCalledWith(expect.any(ErrorEvent));
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
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("handles missing src prop", () => {
    const onError = vi.fn();

    render(
      <ImageOptimizer
        alt="Test image"
        width={400}
        height={300}
        onError={onError}
        src="https://example.com/image.jpg"
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

  it("handles missing width and height props", async () => {
    render(
      <ImageOptimizer
        src="https://example.com/image.jpg"
        alt="Test image"
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("img")).toHaveStyle({ opacity: "1" });
    });
  });
});