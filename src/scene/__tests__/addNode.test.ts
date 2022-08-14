import { describe, it, expect } from 'vitest'

import { addNode } from '../addNode';

import { getMockNode, getMockScene } from './utils';

const generateMockScene = () => getMockScene();

describe('addNode', () => {
  it('adds new node with negative coordinates correctly to an empty scene', () => {
    const scene = generateMockScene();
    const node = getMockNode({ position: { x: -1, y: -1, z: -1 } });
    addNode(scene, node);

    expect(scene.centre.adjacentNodes['-x']).toBe(node);
    expect(scene.centre.adjacentNodes['-y']).toBe(node);
    expect(scene.centre.adjacentNodes['-z']).toBe(node);
    expect(scene.centre.adjacentNodes['+x']).toBe(null);
    expect(scene.centre.adjacentNodes['+y']).toBe(null);
    expect(scene.centre.adjacentNodes['+z']).toBe(null);
  });

  it('adds new node with positive coordinates correctly to an empty scene', () => {
    const scene = generateMockScene();
    const node = getMockNode({ position: { x: 1, y: 1, z: 1 } });
    addNode(scene, node);

    expect(scene.centre.adjacentNodes['-x']).toBe(null);
    expect(scene.centre.adjacentNodes['-y']).toBe(null);
    expect(scene.centre.adjacentNodes['-z']).toBe(null);
    expect(scene.centre.adjacentNodes['+x']).toBe(node);
    expect(scene.centre.adjacentNodes['+y']).toBe(node);
    expect(scene.centre.adjacentNodes['+z']).toBe(node);
  });

  it('adds new node with mixed coordinates correctly to an empty scene', () => {
    const scene = generateMockScene();
    const node = getMockNode({ position: { x: -3, y: 2, z: -4 } });
    addNode(scene, node);

    expect(scene.centre.adjacentNodes['-x']).toBe(node);
    expect(scene.centre.adjacentNodes['-y']).toBe(null);
    expect(scene.centre.adjacentNodes['-z']).toBe(node);
    expect(scene.centre.adjacentNodes['+x']).toBe(null);
    expect(scene.centre.adjacentNodes['+y']).toBe(node);
    expect(scene.centre.adjacentNodes['+z']).toBe(null);
  });

  it('adds new node with negative coordinates correctly to non-empty scene', () => {
    const scene = generateMockScene();
    const leftmostXNode = getMockNode({ position: { x: -10, y: 2, z: -100 } });
    const leftmostYNode = getMockNode({ position: { x: 1000, y: -10, z: 100 } });
  });
});
