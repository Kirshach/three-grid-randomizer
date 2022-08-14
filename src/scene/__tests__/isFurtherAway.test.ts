import { describe, it, expect } from 'vitest';

import { isFurtherAway } from '../../scene/isFurtherAway'
import { getMockNode } from './utils/getMockNode';

describe.concurrent('`isFurtherAway` returns correct values', () => {
  it('for -x direction', () => {
    const node1 = getMockNode({ position: { x: -10 } });
    const node2 = getMockNode({ position: { x: -9 } });
    expect(isFurtherAway(node1, node2, '-x')).toBe(true);
    expect(isFurtherAway(node1, node2, '+x')).toBe(false);
    expect(isFurtherAway(node2, node1, '-x')).toBe(false);
    expect(isFurtherAway(node2, node1, '+x')).toBe(true);
  });

  it('for +x direction', () => {
    const node1 = getMockNode({ position: { x: 10 } });
    const node2 = getMockNode({ position: { x: -3 } });
    expect(isFurtherAway(node1, node2, '+x')).toBe(true);
    expect(isFurtherAway(node1, node2, '-x')).toBe(false);
    expect(isFurtherAway(node2, node1, '+x')).toBe(false);
    expect(isFurtherAway(node2, node1, '-x')).toBe(true);
  });

  it('for -y direction', () => {
    const node1 = getMockNode({ position: { y: -1 } });
    const node2 = getMockNode({ position: { y: 1 } });
    expect(isFurtherAway(node1, node2, '-y')).toBe(true);
    expect(isFurtherAway(node1, node2, '+y')).toBe(false);
    expect(isFurtherAway(node2, node1, '-y')).toBe(false);
    expect(isFurtherAway(node2, node1, '+y')).toBe(true);
  });

  it('for +y direction', () => {
    const node1 = getMockNode({ position: { y: 3 } });
    const node2 = getMockNode({ position: { y: 1 } });
    expect(isFurtherAway(node1, node2, '+y')).toBe(true);
    expect(isFurtherAway(node1, node2, '-y')).toBe(false);
    expect(isFurtherAway(node2, node1, '+y')).toBe(false);
    expect(isFurtherAway(node2, node1, '-y')).toBe(true);
  });

  it('for -z direction', () => {
    const node1 = getMockNode({ position: { z: -1 } });
    const node2 = getMockNode({ position: { z: 10 } });
    expect(isFurtherAway(node1, node2, '-z')).toBe(true);
    expect(isFurtherAway(node1, node2, '+z')).toBe(false);
    expect(isFurtherAway(node2, node1, '-z')).toBe(false);
    expect(isFurtherAway(node2, node1, '+z')).toBe(true);
  });

  it('for +z direction', () => {
    const node1 = getMockNode({ position: { z: 3 } });
    const node2 = getMockNode({ position: { z: -1 } });
    expect(isFurtherAway(node1, node2, '+z')).toBe(true);
    expect(isFurtherAway(node1, node2, '-z')).toBe(false);
    expect(isFurtherAway(node2, node1, '+z')).toBe(false);
    expect(isFurtherAway(node2, node1, '-z')).toBe(true);
  });
});
