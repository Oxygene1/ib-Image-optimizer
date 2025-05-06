// src/types/global.d.ts
import {
  DependencyList,
  Dispatch,
  EffectCallback,
  MutableRefObject,
  SetStateAction,
} from "react";

declare global {
  namespace CustomFeature {
    function makeEffect(
      effect: EffectCallback,
      deps?: DependencyList
    ): void;
    function updateState<S>(
      initialState: S | (() => S)
    ): [S, Dispatch<SetStateAction<S>>];
    function makeRef<T>(initialValue: T): MutableRefObject<T>;
  }
}

export {};