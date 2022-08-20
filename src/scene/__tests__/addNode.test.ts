import { describe, it, expect, vi } from 'vitest'

import { addNode } from '../addNode';

import { getMockNode, getMockScene } from './utils';

describe('addNode', () => {
  it('adds new node with negative coordinates correctly to an empty scene', () => {
    const scene = getMockScene();
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
    const scene = getMockScene();
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
    const scene = getMockScene();
    const node = getMockNode({ position: { x: -3, y: 2, z: -4 } });
    addNode(scene, node);

    expect(scene.centre.adjacentNodes['-x']).toBe(node);
    expect(scene.centre.adjacentNodes['-y']).toBe(null);
    expect(scene.centre.adjacentNodes['-z']).toBe(node);
    expect(scene.centre.adjacentNodes['+x']).toBe(null);
    expect(scene.centre.adjacentNodes['+y']).toBe(node);
    expect(scene.centre.adjacentNodes['+z']).toBe(null);
  });

  it('correctly adds nodes to the scene in the negative directions', () => {
    // setup phase
    const scene = getMockScene();

    const leftmostX = getMockNode({ id: `leftmostX`, position: { x: -49, y: -1, z: 1 } });
    const leftmostY = getMockNode({ id: `leftmostY`, position: { x: 1, y: -49, z: -1 } });
    const leftmostZ = getMockNode({ id: `leftmostZ`, position: { x: -1, y: 1, z: -49 } });

    addNode(scene, leftmostX, leftmostY, leftmostZ);

    // check the centre node is connected correctly
    expect(scene.centre.adjacentNodes['+x']?.id).toBe(leftmostY.id);
    expect(scene.centre.adjacentNodes['-x']?.id).toBe(leftmostZ.id);
    expect(scene.centre.adjacentNodes['+y']?.id).toBe(leftmostZ.id);
    expect(scene.centre.adjacentNodes['-y']?.id).toBe(leftmostX.id);
    expect(scene.centre.adjacentNodes['+z']?.id).toBe(leftmostX.id);
    expect(scene.centre.adjacentNodes['-z']?.id).toBe(leftmostY.id);

    const middleNode = getMockNode({ id: 'middle_node', position: { x: -25, y: -25, z: -25 } });
    addNode(scene, middleNode);

    // testing `leftmostX` node
    expect(leftmostX.adjacentNodes['+x']?.id).toBe(middleNode.id);
    expect(leftmostX.adjacentNodes['-x']).toBe(null);
    expect(leftmostX.adjacentNodes['+y']?.id).toBe(scene.centre.id);
    expect(leftmostX.adjacentNodes['-y']?.id).toBe(middleNode.id);
    expect(leftmostX.adjacentNodes['+z']).toBe(null);
    expect(leftmostX.adjacentNodes['-z']?.id).toBe(scene.centre.id);

    // testing `leftmostY` node
    expect(leftmostY.adjacentNodes['+x']).toBe(null);
    expect(leftmostY.adjacentNodes['-x']?.id).toBe(scene.centre.id);
    expect(leftmostY.adjacentNodes['+y']?.id).toBe(middleNode.id);
    expect(leftmostY.adjacentNodes['-y']).toBe(null);
    expect(leftmostY.adjacentNodes['+z']?.id).toBe(scene.centre.id);
    expect(leftmostY.adjacentNodes['-z']?.id).toBe(middleNode.id);

    // testing `leftmostZ` node
    expect(leftmostZ.adjacentNodes['+x']?.id).toBe(scene.centre.id);
    expect(leftmostZ.adjacentNodes['-x']?.id).toBe(middleNode.id);
    expect(leftmostZ.adjacentNodes['+y']).toBe(null);
    expect(leftmostZ.adjacentNodes['-y']?.id).toBe(scene.centre.id);
    expect(leftmostZ.adjacentNodes['+z']?.id).toBe(middleNode.id);
    expect(leftmostZ.adjacentNodes['-z']).toBe(null);

    // testing `middle_node`
    expect(middleNode.adjacentNodes['+x']?.id).toBe(leftmostZ.id);
    expect(middleNode.adjacentNodes['-x']?.id).toBe(leftmostX.id);
    expect(middleNode.adjacentNodes['+y']?.id).toBe(leftmostX.id);
    expect(middleNode.adjacentNodes['-y']?.id).toBe(leftmostY.id);
    expect(middleNode.adjacentNodes['+z']?.id).toBe(leftmostY.id);
    expect(middleNode.adjacentNodes['-z']?.id).toBe(leftmostZ.id);
  });

  it('correctly adds nodes to the scene in the positive directions', () => {
    // setup phase
    const scene = getMockScene();

    const rightmostX = getMockNode({ id: `rightmostX`, position: { x: 49, y: 1, z: -1 } });
    const rightmostY = getMockNode({ id: `rightmostY`, position: { x: -1, y: 49, z: 1 } });
    const rightmostZ = getMockNode({ id: `rightmostZ`, position: { x: 1, y: -1, z: 49 } });

    addNode(scene, rightmostX, rightmostY, rightmostZ);

    // check the centre node is connected correctly
    expect(scene.centre.adjacentNodes['+x']?.id).toBe(rightmostZ.id);
    expect(scene.centre.adjacentNodes['-x']?.id).toBe(rightmostY.id);
    expect(scene.centre.adjacentNodes['+y']?.id).toBe(rightmostX.id);
    expect(scene.centre.adjacentNodes['-y']?.id).toBe(rightmostZ.id);
    expect(scene.centre.adjacentNodes['+z']?.id).toBe(rightmostY.id);
    expect(scene.centre.adjacentNodes['-z']?.id).toBe(rightmostX.id);

    const middleNode = getMockNode({ id: 'middle_node', position: { x: 25, y: 25, z: 25 } });
    addNode(scene, middleNode);

    // testing `rightmostX` node
    expect(rightmostX.adjacentNodes['+x']).toBe(null);
    expect(rightmostX.adjacentNodes['-x']?.id).toBe(middleNode.id);
    expect(rightmostX.adjacentNodes['+y']?.id).toBe(middleNode.id);
    expect(rightmostX.adjacentNodes['-y']?.id).toBe(scene.centre.id);
    expect(rightmostX.adjacentNodes['+z']?.id).toBe(scene.centre.id);
    expect(rightmostX.adjacentNodes['-z']).toBe(null);

    // testing `rightmostY` node
    expect(rightmostY.adjacentNodes['+x']?.id).toBe(scene.centre.id);
    expect(rightmostY.adjacentNodes['-x']).toBe(null);
    expect(rightmostY.adjacentNodes['+y']).toBe(null);
    expect(rightmostY.adjacentNodes['-y']?.id).toBe(middleNode.id);
    expect(rightmostY.adjacentNodes['+z']?.id).toBe(middleNode.id);
    expect(rightmostY.adjacentNodes['-z']?.id).toBe(scene.centre.id);

    // testing `rightmostZ` node
    expect(rightmostZ.adjacentNodes['+x']?.id).toBe(middleNode.id);
    expect(rightmostZ.adjacentNodes['-x']?.id).toBe(scene.centre.id);
    expect(rightmostZ.adjacentNodes['+y']?.id).toBe(scene.centre.id);
    expect(rightmostZ.adjacentNodes['-y']).toBe(null);
    expect(rightmostZ.adjacentNodes['+z']).toBe(null);
    expect(rightmostZ.adjacentNodes['-z']?.id).toBe(middleNode.id);

    // testing `middle_node`
    expect(middleNode.adjacentNodes['+x']?.id).toBe(rightmostX.id);
    expect(middleNode.adjacentNodes['-x']?.id).toBe(rightmostZ.id);
    expect(middleNode.adjacentNodes['+y']?.id).toBe(rightmostY.id);
    expect(middleNode.adjacentNodes['-y']?.id).toBe(rightmostX.id);
    expect(middleNode.adjacentNodes['+z']?.id).toBe(rightmostZ.id);
    expect(middleNode.adjacentNodes['-z']?.id).toBe(rightmostY.id);
  });

  it('correctly adds nodes to the scene in the mixed directions', () => {
    // setup phase
    const scene = getMockScene();

    const node1 = getMockNode({ id: `node1`, position: { x: 15, y: 10, z: -10 } });
    const node2 = getMockNode({ id: `node2`, position: { x: -4, y: -19, z: 11 } });
    const node3 = getMockNode({ id: `node3`, position: { x: -33, y: 5, z: 40 } });

    addNode(scene, node1, node2, node3);

    // check the centre node is connected correctly
    expect(scene.centre.adjacentNodes['+x']?.id).toBe(node1.id);
    expect(scene.centre.adjacentNodes['-x']?.id).toBe(node2.id);
    expect(scene.centre.adjacentNodes['+y']?.id).toBe(node3.id);
    expect(scene.centre.adjacentNodes['-y']?.id).toBe(node2.id);
    expect(scene.centre.adjacentNodes['+z']?.id).toBe(node2.id);
    expect(scene.centre.adjacentNodes['-z']?.id).toBe(node1.id);

    const node4 = getMockNode({ id: 'node4', position: { x: 49, y: -49, z: 1 } });
    addNode(scene, node4);

    // testing node1
    expect(node1.adjacentNodes['+x']?.id).toBe(node4.id);
    expect(node1.adjacentNodes['-x']?.id).toBe(scene.centre.id);
    expect(node1.adjacentNodes['+y']).toBe(null);
    expect(node1.adjacentNodes['-y']?.id).toBe(node3.id);
    expect(node1.adjacentNodes['+z']?.id).toBe(scene.centre.id);
    expect(node1.adjacentNodes['-z']).toBe(null);

    // testing node2
    expect(node2.adjacentNodes['+x']?.id).toBe(scene.centre.id);
    expect(node2.adjacentNodes['-x']?.id).toBe(node3.id);
    expect(node2.adjacentNodes['+y']?.id).toBe(scene.centre.id);
    expect(node2.adjacentNodes['-y']?.id).toBe(node4.id);
    expect(node2.adjacentNodes['+z']?.id).toBe(node3.id);
    expect(node2.adjacentNodes['-z']?.id).toBe(node4.id);

    // testing node3
    expect(node3.adjacentNodes['+x']?.id).toBe(node2.id);
    expect(node3.adjacentNodes['-x']).toBe(null);
    expect(node3.adjacentNodes['+y']?.id).toBe(node1.id);
    expect(node3.adjacentNodes['-y']?.id).toBe(scene.centre.id);
    expect(node3.adjacentNodes['+z']).toBe(null);
    expect(node3.adjacentNodes['-z']?.id).toBe(node2.id);

    // testing node4
    expect(node4.adjacentNodes['+x']).toBe(null);
    expect(node4.adjacentNodes['-x']?.id).toBe(node1.id);
    expect(node4.adjacentNodes['+y']?.id).toBe(node2.id);
    expect(node4.adjacentNodes['-y']).toBe(null);
    expect(node4.adjacentNodes['+z']?.id).toBe(node2.id);
    expect(node4.adjacentNodes['-z']?.id).toBe(scene.centre.id);
  });

  it(
    'throws error when trying to add a node that is outside of the scene or intersects its boundaries',
    () => {
      // setup
      const consoleErrorSpy = vi.spyOn(console, 'error');

      const scene = getMockScene({ width: 100, height: 10, depth: 10 });
      const node1 = getMockNode({
        position: { x: 51, y: 0, z: 0 },
        dimensions: { width: 0, height: 0, depth: 0 },
      });
      const node2 = getMockNode({
        position: { x: 0, y: 0, z: -4.9 },
        dimensions: { width: 0, height: 0, depth: 1.1 },
      });
      const node3 = getMockNode({
        position: { x: 0, y: 0, z: 0 },
        dimensions: { width: 0, height: 10.1, depth: 1.1 },
      });

      // test
      addNode(scene, node1);
      expect(consoleErrorSpy).toHaveBeenCalledOnce();
      consoleErrorSpy.mockReset()

      addNode(scene, node2);
      expect(consoleErrorSpy).toHaveBeenCalledOnce();
      consoleErrorSpy.mockReset()

      addNode(scene, node3);
      expect(consoleErrorSpy).toHaveBeenCalledOnce();
      // cleanup
      consoleErrorSpy.mockRestore();
    }
  )
});
