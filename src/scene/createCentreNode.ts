import { createNode } from '../node';

import type { SceneNode } from '../types';

export const CENTRE = 'CENTRE';

export const createCentreNode = (): SceneNode =>
  createNode({
    id: CENTRE,
    position: { x: 0, y: 0, z: 0 },
    dimensions: { width: 0, height: 0, depth: 0 },
  });
