import { createNode } from '../../../node';
import type { Dimensions, Position } from '../../../types';

const FAKE_ID = 'FAKE_ID';

type Props = {
  position?: Partial<Position>,
  dimensions?: Partial<Dimensions>
};

export const getMockNode = ({
  position = {},
  dimensions = {}
}: Props = { position: {}, dimensions: {} }
) =>
  createNode({
    position: ({ x: 0, y: 0, z: 0, ...position }),
    dimensions: { width: 0, height: 0, depth: 0, ...dimensions },
    id: FAKE_ID,
  });
