import { createNode } from './node';
import { createGraphScene, addNode } from './scene';

import type { Element, PositionedElement } from './types';

interface SceneParams {
  width: number,
  height: number,
  depth: number,
};

export const randomizePositions = (
  {
    positionedElements,
    nonPositionedElements,
    sceneParams: { width, height, depth }
  }: {
    positionedElements: PositionedElement[],
    nonPositionedElements: Element[],
    sceneParams: SceneParams
  }) => {
  const scene = createGraphScene({ width, height, depth });

  // adding all definitely positioned elements
  for (let i = 0; i < positionedElements.length; i++) {
    const node = createNode(positionedElements[i])
    addNode(scene, node);
  }

  // adding randomly positioned elements
  for (let i = 0; i < nonPositionedElements.length; i++) {
    const position = {
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * depth,
    };
    const node = createNode({ ...nonPositionedElements[i], position });


    // scene.addNode(node);
  }
};
