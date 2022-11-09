import React, { lazy } from "react";

export enum LayerType {
  CALENDER = "calender",
}

const layers: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.LazyExoticComponent<React.ComponentType<any>>;
} = {
  [LayerType.CALENDER]: lazy(() => import("./display/calender")),
};

export default layers;

export function addLayer(
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: React.LazyExoticComponent<React.ComponentType<any>>
) {
  layers[key] = layer;
}

export function getLayer(key: string) {
  return layers[key];
}
