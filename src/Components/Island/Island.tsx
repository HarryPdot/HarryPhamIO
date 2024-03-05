'use client';

import { useEffect } from 'react';

import { Collision } from '../Collision/Collision';

const Island = (props) => {
  const {
    collisionPos,
    setCollisionPos,
    collision,
    squareArr,
    setSquareArr,
    x,
    y,
  } = props;

  useEffect(() => {
    const newArr: any[] = [];
    for (let i = 0; i < collision.length; i += 70) {
      newArr.push(collision.slice(i, 70 + i));
    }
    setSquareArr(newArr);
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].length; j++) {
        if (newArr[i][j] === 1025) {
          setCollisionPos((collisionPos) => [...collisionPos, `${i}${j}`]);
        }
      }
    }
  }, []);

  return <Collision squareArr={squareArr} x={x} y={y} />;
};

export { Island };
