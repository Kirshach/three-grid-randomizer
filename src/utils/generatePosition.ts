export const generatePosition = (width: number, height: number, depth: number) => {
  return {
    x: width * Math.random(),
    y: height * Math.random(),
    z: depth * Math.random(),
  };
};
