'use client';

import { useEffect } from 'react';

import { collision } from '@/Assets/Background/NewTownCollision';

import map from '../../Assets/Background/NewTown.png';
import { Collision } from '../Collision/Collision';
const x = 48;
const y = 48;
const screenWidth = 540;
const screenHeight = 360;

const NewTown = (props) => {
  const { setMapsData, currentMap } = props;

  useEffect(() => {
    const initialArray: any = [];
    const postArray: string[] = [];
    let startPosition;
    const portals = { test: [] };
    for (let i = 0; i < collision.length; i += 70) {
      initialArray.push(collision.slice(i, 70 + i));
    }
    for (let i = 0; i < initialArray.length; i++) {
      for (let j = 0; j < initialArray[i].length; j++) {
        if (initialArray[i][j] === 1025 || initialArray[i][j] === 1027) {
          postArray.push(`${i}${j}`);
        }
        if (initialArray[i][j] === 1026) {
          startPosition = {
            x: j * x - screenWidth,
            y: i * y - screenHeight,
          };
        }
        if (initialArray[i][j] === 1027) {
          portals.test.push(`${i}${j}`);
        }
      }
    }
    setMapsData((prevState) => ({
      ...prevState,
      newTown: {
        name: 'newTown',
        array: initialArray,
        positionId: postArray,
        image: map,
        startPosition: startPosition,
        portals: portals,
      },
    }));
  }, []);

  return <Collision squareArr={currentMap.array} x={x} y={y} />;
};

export { NewTown };
