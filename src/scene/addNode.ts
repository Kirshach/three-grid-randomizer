import { isFurtherAway } from './isFurtherAway';

import type { Axis, GraphScene, Direction, SceneNode, Dimensions } from '../types';

const axes: Axis[] = ['x', 'y', 'z'];
const axisToDimension: Record<Axis, keyof Dimensions> = {
  x: 'width',
  y: 'height',
  z: 'depth',
};

export const addNode = (scene: GraphScene, node: SceneNode) => {
  for (const axis of axes) {
    // if items is outside of the scene, throw an error
    // TODO: Add width + padding to calculations too
    if (Math.abs(node.position[axis]) > scene[axisToDimension[axis]] / 2) { }

    let prevNode = scene.centre;

    const direction: Direction =
      isFurtherAway(node, scene.centre, `+${axis}`) ? `+${axis}` : `-${axis}`;

    // while new node is still further away in a given direction
    while (isFurtherAway(node, prevNode, direction)) {
      const nextAdjacentNode: SceneNode | null = prevNode.adjacentNodes[direction];
      if (nextAdjacentNode) prevNode = nextAdjacentNode;
      else break;
    }

    const nextNode = prevNode.adjacentNodes[direction];
    prevNode.adjacentNodes[direction] = node;
    node.adjacentNodes[direction] = nextNode;

    scene.nodes.set(node.id, node);
  }
};
