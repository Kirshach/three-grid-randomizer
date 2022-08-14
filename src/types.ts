export type Axis = 'x' | 'y' | 'z';

export type Direction = '-x' | '+x' | '-y' | '+y' | '-z' | '+z';

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

export interface SceneNode {
  position: Position;
  dimensions: Dimensions;
  padding: number;
  id: string;
  adjacentNodes: Record<Direction, SceneNode | null>;
}

export type GraphScene = {
  centre: SceneNode;
  nodes: Map<string, SceneNode>;
  width: number;
  height: number;
  depth: number;
};
