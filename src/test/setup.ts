import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import "./types"
expect.extend(matchers);

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock Image
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

Object.defineProperty(window, "Image", {
  writable: true,
  configurable: true,
  value: MockImage,
});

// Cleanup after each test case
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
