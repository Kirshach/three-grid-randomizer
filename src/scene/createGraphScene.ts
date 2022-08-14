import { createCentreNode } from './createCentreNode';

import type { Dimensions, GraphScene } from '../types';

export const createGraphScene = (
  dimensions: Dimensions
): GraphScene => ({
  ...dimensions,
  centre: createCentreNode(dimensions),
  nodes: new Map(),
});
