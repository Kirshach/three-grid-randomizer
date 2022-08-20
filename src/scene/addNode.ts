import { isFurtherAway } from './isFurtherAway';

import type { Axis, GraphScene, Direction, SceneNode, Dimensions } from '../types';

const axes: Axis[] = ['x', 'y', 'z'];
const axisToDimension: Record<Axis, keyof Dimensions> = {
  x: 'width',
  y: 'height',
  z: 'depth',
};

export const addNode = (scene: GraphScene, ...nodes: SceneNode[]) => {
  for (const node of nodes) {
    for (const axis of axes) {
      // if item is outside of the scene, throw an error
      /* 
        TODO: Remember that object's origin is not always in the centre.
              That case should be supported in the future
      */
      if (
        Math.abs(node.position[axis]) + node.dimensions[axisToDimension[axis]] / 2
        >
        scene[axisToDimension[axis]] / 2
      ) {
        console.error(
          'Cannot add a node' +
          node.id +
          'to the scene' +
          JSON.stringify({ height: scene.height, width: scene.width }) +
          'because at least part of it is outside of the scene'
        );
        return;
      }

      const forwardDirection: Direction = node.position[axis] > 0 ? `+${axis}` : `-${axis}`;
      const backDirection: Direction = node.position[axis] > 0 ? `-${axis}` : `+${axis}`;

      let prevNode = scene.centre;
      let nextAdjacentNode: SceneNode | null = prevNode.adjacentNodes[forwardDirection];

      // while new node is still further away in a given direction
      while (nextAdjacentNode && isFurtherAway(node, nextAdjacentNode, forwardDirection)) {
        prevNode = nextAdjacentNode;
        nextAdjacentNode = nextAdjacentNode.adjacentNodes[forwardDirection];
      }

      const nextNode = prevNode.adjacentNodes[forwardDirection];
      // setting forward links
      prevNode.adjacentNodes[forwardDirection] = node;
      node.adjacentNodes[forwardDirection] = nextNode;

      // setting backward links
      if (nextNode) nextNode.adjacentNodes[backDirection] = node;
      node.adjacentNodes[backDirection] = prevNode;

      if (node.id === 'leftmostZ' && axis === 'x') {
        console.log({
          prevNode: prevNode.id,
          nextNode: nextNode?.id,
        });
      }

    }
    scene.nodes.set(node.id, node);
  }
};
