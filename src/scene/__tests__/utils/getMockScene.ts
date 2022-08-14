import { createGraphScene } from '../../createGraphScene';

import type { Dimensions } from '../../../types';

export const getMockScene = (dimensions: Partial<Dimensions> = {}) =>
  createGraphScene({ width: 100, height: 100, depth: 100, ...dimensions });