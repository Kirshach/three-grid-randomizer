import { SceneNode } from '../graphscene/node';

import type { Dimensions } from '../types';

export const CENTRE = 'CENTRE';

export const createCentreNode = (
  { width, height, depth }: Dimensions
) => new SceneNode({
  x: width / 2,
  y: height / 2,
  z: depth / 2,
  id: CENTRE,
  width: 0,
  height: 0,
  depth: 0,
});
