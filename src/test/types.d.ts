import "@testing-library/jest-dom";

declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toBeInTheDocument(): Assertion<T>;
      toHaveStyle(style: string | Record<string, string>): Assertion<T>;
      toHaveAttribute(attr: string, value?: any): Assertion<T>;
      toHaveClass(...classNames: string[]): Assertion<T>;
      toHaveBeenCalled(): Assertion<T>;
      toHaveBeenCalledWith(...args: unknown[]): Assertion<T>;
    }

    interface AsymmetricMatchersContaining {
      toBeInTheDocument(): Assertion<void>;
      toHaveStyle(style: string | Record<string, string>): Assertion<void>;
      toHaveAttribute(attr: string, value?: any): Assertion<void>;
      toHaveClass(...classNames: string[]): Assertion<void>;
      toHaveBeenCalled(): Assertion<void>;
      toHaveBeenCalledWith(...args: unknown[]): Assertion<void>;
    }
  }
}

declare module "vitest" {
  interface Assertion<T = any> extends Vi.Assertion<T> {}
  interface AsymmetricMatchersContaining
    extends Vi.AsymmetricMatchersContaining {}
}
