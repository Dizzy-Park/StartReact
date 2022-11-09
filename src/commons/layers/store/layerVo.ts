export interface ILayerDo<T> {
  type: string;
  data: T;
  rect?: DOMRect;
}
