'use client';

import { useEffect } from 'react';

import { collision } from '@/Assets';

import map from '../../Assets/Background/PelletTown.png';
import { Collision } from '../Collision/Collision';
const x = 48;
const y = 48;
const screenWidth = 540;
const screenHeight = 360;

const Island = (props) => {
  const { setCurrentMap, setMapsData, currentMap, setLoadReady } = props;

  useEffect(() => {
    const initialArray: any[] = [];
    const postArray: any[] = [];
    let startPosition = '';
    for (let i = 0; i < collision.length; i += 70) {
      initialArray.push(collision.slice(i, 70 + i));
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
      island: {
        name: 'island',
        array: initialArray,
        positionId: postArray,
        image: map,
        startPosition: startPosition,
      },
    }));
    setCurrentMap({
      name: 'island',
      array: initialArray,
      positionId: postArray,
      image: map,
      startPosition: startPosition,
    });
    setLoadReady((prev) => ({ ...prev, island: true }));
  }, []);

  return <Collision squareArr={currentMap.array} x={x} y={y} />;
};

export { Island };
