export type Axis = 'x' | 'y' | 'z';

export type NodeDirection = '-x' | '+x' | '-y' | '+y' | '-z' | '+z';

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
};

export type Position = {
  [Key in Axis]: number;
};

export interface Element {
  dimensions: Dimensions;
  id: string;
  padding?: number;
};

export interface PositionedElement extends Element {
  position: Position,
};
