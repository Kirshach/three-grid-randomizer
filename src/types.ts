export interface Element {
  id: string,
  width: number,
  height: number,
  depth: number,
  padding?: number,
};

export interface PositionedElement extends Element {
  x: number,
  y: number,
  z: number,
};
