'use client';
import { useEffect } from 'react';

import { testCollision } from '@/Assets/Background/TestCollision';

import map from '../../Assets/Background/TestMap.png';
import { Collision } from '../Collision/Collision';
const x = 48;
const y = 48;
const screenWidth: number = 540;
const screenHeight: number = 360;
const Test = (props) => {
  const { setMapsData, currentMap, testing, setLoadReady } = props;

  useEffect(() => {
    const initialArray: any[] = [];
    const postArray: any[] = [];
    let startPosition = '';
    for (let i = 0; i < testCollision.length; i += 70) {
      initialArray.push(testCollision.slice(i, 70 + i));
    }
    for (let i = 0; i < initialArray.length; i++) {
      for (let j = 0; j < initialArray[i].length; j++) {
        if (initialArray[i][j] === 1025) {
          postArray.push(`${i}${j}`);
        }
        if (initialArray[i][j] === 1026) {
          startPosition = {
            x: j * x - screenWidth,
            y: i * y - screenHeight,
          };
        }
      }
    }

    setMapsData((prevState) => ({
      ...prevState,
      test: {
        name: 'test',
        array: initialArray,
        positionId: postArray,
        image: map,
        startPosition: startPosition,
      },
    }));
    setLoadReady((prev) => ({ ...prev, test: true }));
  }, []);

  return <Collision squareArr={currentMap.island} x={x} y={y} />;
};

export { Test };
