import type {
  Axis,
  Direction,
  SceneNode,
} from '../types';

export const isFurtherAway = (
  node1: SceneNode,
  node2: SceneNode,
  direction: Direction
) => {
  const sign = direction[0] as '-' | '+';
  const axis = direction[1] as Axis;
  const node1Position = node1.position[axis];
  const node2Position = node2.position[axis];

  switch (sign) {
    case '+':
      return node1Position > node2Position;
    case '-':
      return node1Position < node2Position;
    default:
      throw new Error('Unknown direction provided fo `isFurtherAway function`');
  }
};
