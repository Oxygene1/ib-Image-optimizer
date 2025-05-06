import { DependencyList, Dispatch, EffectCallback, MutableRefObject, SetStateAction } from "react";

 declare namespace CustomFeature {
  function makeEffect(effect: EffectCallback, deps?: DependencyList): void;
  function updateState<S>(
    initialState: S | (() => S)
  ): [S, Dispatch<SetStateAction<S>>];
  function makeRef<T>(initialValue: T): MutableRefObject<T>;
}