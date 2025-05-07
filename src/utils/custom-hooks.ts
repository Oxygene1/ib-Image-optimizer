import {
  useEffect,
  useState,
  useRef,
  DependencyList,
  Dispatch,
  EffectCallback,
  MutableRefObject,
  SetStateAction,
} from "react";

/**
 * A custom effect hook similar to React's useEffect
 * @param effect The effect function to run
 * @param deps Optional dependency array
 */
export function makeEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  return useEffect(effect, deps);
}

/**
 * A custom state hook similar to React's useState
 * @param initialState The initial state value or function
 * @returns A stateful value and a function to update it
 */
export function updateState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  return useState<S>(initialState);
}

/**
 * A custom ref hook similar to React's useRef
 * @param initialValue The initial value
 * @returns A mutable ref object
 */
export function makeRef<T>(initialValue: T): MutableRefObject<T> {
  return useRef<T>(initialValue);
}


/*
(globalThis as any).CustomFeature = {
  makeEffect,
  updateState,
  makeRef
};
*/

// Alternative: Make them available as individual global functions
// Uncomment this if you want them to be available directly in the global scope
/*
(globalThis as any).makeEffect = makeEffect;
(globalThis as any).updateState = updateState;
(globalThis as any).makeRef = makeRef;
*/