'use client';

import { useEffect } from 'react';

import { collision } from '@/Assets';

import map from '../../Assets/Background/PelletTown.png';
import { Collision } from '../Collision/Collision';
const x = 48;
const y = 48;

const Island = (props) => {
  const { setCurrentMap, setMapsData, currentMap } = props;

  useEffect(() => {
    const initialArray: any[] = [];
    const postArray: any[] = [];
    for (let i = 0; i < collision.length; i += 70) {
      initialArray.push(collision.slice(i, 70 + i));
    }
    for (let i = 0; i < initialArray.length; i++) {
      for (let j = 0; j < initialArray[i].length; j++) {
        if (initialArray[i][j] === 1025) {
          postArray.push(`${i}${j}`);
        }
      }
    }
    setMapsData((prevState) => ({
      ...prevState,
      island: { array: initialArray, positionId: postArray, image: map },
    }));
    setCurrentMap({ array: initialArray, positionId: postArray, image: map });
  }, []);

  return <Collision squareArr={currentMap.array} x={x} y={y} />;
};

export { Island };
