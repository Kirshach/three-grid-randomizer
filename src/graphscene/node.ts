import type { PositionedElement } from "../types";

export class Node implements PositionedElement {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  padding: number;
  id: string;

  constructor({ x, y, z, width, height, depth, id, padding = 0 }:
    {
      x: number,
      y: number,
      z: number,
      id: string,
      width: number,
      height: number,
      depth: number,
      padding: number
    }) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.padding = padding;
    this.id = id;
  }
};
