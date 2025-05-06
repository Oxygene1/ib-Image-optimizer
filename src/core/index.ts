export interface ImageOptimizerOptions {
  src: string;
  fallbackSrc?: string;
  onError?: (error: Error) => void;
  onLoad?: () => void;
  aspectRatio?: string | number;
}

export interface ImageOptimizerState {
  currentSrc: string;
  isLoading: boolean;
  hasError: boolean;
}

export type ImageOptimizerSubscriber = (state: ImageOptimizerState) => void;

export interface ImageOptimizer {
  getState: () => ImageOptimizerState;
  subscribe: (listener: ImageOptimizerSubscriber) => () => void;
  handleError: () => void;
  handleLoad: () => void;
  reset: (newSrc: string) => void;
  updateOptions: (newOptions: Partial<ImageOptimizerOptions>) => void;
}

/**
 * createImageOptimizer core functionality to be used in framewroks
 *
 */
export function createImageOptimizer(
  options: ImageOptimizerOptions
): ImageOptimizer {
  let currentOptions: ImageOptimizerOptions = { ...options };
  let state: ImageOptimizerState = {
    currentSrc: options.src,
    isLoading: true,
    hasError: false,
  };

  // I am thinking we should use Set here instead of an array, but it depends on the amount of subscribers on the image. If it is small, array is sufficient, if not, Set might be the future option.
  let subscribers: ImageOptimizerSubscriber[] = [];

  function notifySubscribers(): void {
    subscribers.forEach((subscriber) => subscriber(state));
  }
  function setState(newState: Partial<ImageOptimizerState>): void {
    state = { ...state, ...newState };
    notifySubscribers();
  }
  return {
    getState: () => ({ ...state }),
    subscribe: (listener: ImageOptimizerSubscriber) => {
      subscribers.push(listener);
      // Immediately notify with current state
      listener(state);
      // Return unsubscribe function
      return () => {
        subscribers = subscribers.filter((sub) => sub !== listener);
      };
    },
    handleError: () => {
      setState({ hasError: true });

      if (
        currentOptions.fallbackSrc &&
        state.currentSrc !== currentOptions.fallbackSrc
      ) {
        setState({
          currentSrc: currentOptions.fallbackSrc,
          isLoading: true,
        });
      }
      if (currentOptions.onError) {
        currentOptions.onError(new Error("Failed to load image"));
      }
    },
    handleLoad: () => {
      setState({ isLoading: false });
      if (currentOptions.onLoad) {
        currentOptions.onLoad();
      }
    },
    reset: (newSrc: string) => {
      setState({
        currentSrc: newSrc,
        isLoading: true,
        hasError: false,
      });

      currentOptions = {
        ...currentOptions,
        src: newSrc,
      };
    },
    updateOptions: (newOptions: Partial<ImageOptimizerOptions>) => {
      currentOptions = {
        ...currentOptions,
        ...newOptions,
      };

      // If source changed, reset state
      if (newOptions.src && newOptions.src !== state.currentSrc) {
        setState({
          currentSrc: newOptions.src,
          isLoading: true,
          hasError: false,
        });
      }
    },
  };
}

/**
 * Custom hook/composable function for frameworks that support effects and state
 */
export function useImageOptimizer(
  options: ImageOptimizerOptions,
  setState: (state: ImageOptimizerState) => void,
  cleanup: (fn: () => void) => void
) {
  const optimizer = createImageOptimizer(options);
  const unsubscribe = optimizer.subscribe(setState);

  cleanup(unsubscribe);

  return optimizer;
}

/**
 * Version 2 that accepts state-setter and cleanup functions
 * allowing it to adapt to different frameworks' patterns - Simple component use-case
 */
export function initImageOptimizer(
  options: ImageOptimizerOptions,
  onStateChange: (state: ImageOptimizerState) => void,
  registerCleanup: (cleanup: () => void) => void
): Omit<ImageOptimizer, "subscribe" | "getState"> {
  const { subscribe, handleError, handleLoad, reset, updateOptions } =
    createImageOptimizer(options);

  const unsubscribe = subscribe(onStateChange);

  registerCleanup(unsubscribe);

  return {
    handleError,
    handleLoad,
    reset,
    updateOptions,
  };
}

// incase you wanna add eslint to package.json in future:
// "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
