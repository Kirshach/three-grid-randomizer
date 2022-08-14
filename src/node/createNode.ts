import type {
  Dimensions,
  SceneNode,
  Position,
} from "../types";

type CreateNodeProps = {
  position: Position,
  dimensions: Dimensions,
  id: string,
  padding?: number
};

export const createNode = (
  { padding = 0, ...props }: CreateNodeProps
): SceneNode => ({
  ...props,
  padding,
  adjacentNodes: {
    '-x': null,
    '+x': null,
    '-y': null,
    '+y': null,
    '-z': null,
    '+z': null
  },
});
