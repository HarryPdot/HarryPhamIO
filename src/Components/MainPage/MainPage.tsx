'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { collision } from '@/Assets';

import map from '../../Assets/Background/PelletTown.png';
import { Shrimp } from '../Shrimp/Shrimp';
import styles from './MainPage.module.css';
type spritePosition = {
  spriteX: number;
  spriteY: number;
};

type keysInput = {
  left: boolean;
  up: boolean;
  right: boolean;
  down: boolean;
};

const position = (id) => {
  if (typeof document === 'undefined') return;
  return document.getElementById(id)?.getBoundingClientRect();
};

const left = 37 || 'a';
const up = 38 || 'w';
const right = 39 || 'd';
const down = 40 || 's';
const x = 48;
const y = 48;

const MainPage: React.FunctionComponent = () => {
  const [input, setInput] = useState<keysInput>({
    left: false,
    up: false,
    right: false,
    down: false,
  });

  const [squareArr, setSquareArr] = useState<any>();

  const [collisionPos, setCollisionPos] = useState<any>([]);

  const [pos, setPos] = useState<spritePosition>({
    spriteX: 684,
    spriteY: 546,
  });

  const inputKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === left) {
      setInput({ ...input, left: true });
    } else if (e.keyCode === up) {
      setInput({ ...input, up: true });
    } else if (e.keyCode === right) {
      setInput({ ...input, right: true });
    } else if (e.keyCode === down) {
      setInput({ ...input, down: true });
    }
  };

  const offPutKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === left) {
      setInput({ ...input, left: false });
    } else if (e.keyCode === up) {
      setInput({ ...input, up: false });
    } else if (e.keyCode === right) {
      setInput({ ...input, right: false });
    } else if (e.keyCode === down) {
      setInput({ ...input, down: false });
    }
  };

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

  return (
    <main
      className={styles.main}
      tabIndex={0}
      onKeyDown={inputKey}
      onKeyUp={offPutKey}
    >
      <section className={styles.screen}>
        <Shrimp
          pos={pos}
          setPos={setPos}
          input={input}
          collisionPos={collisionPos}
        />
        <Image src={map} alt="Map" className={styles.bg} />
        <section className={styles.collisionScreen}>
          {squareArr?.map((row, i) => {
            return (
              <div key={i}>
                {row?.map((col, j) => {
                  const divStyle = {
                    top: i * y,
                    left: j * x,
                    width: x,
                    height: y,
                    position: 'absolute',
                    backgroundColor: 'red',
                  };
                  if (col === 1025) {
                    return <div key={j} id={`${i}${j}`} style={divStyle}></div>;
                  }
                })}
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
};

export { MainPage };
