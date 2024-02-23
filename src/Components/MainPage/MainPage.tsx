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

const MainPage: React.FunctionComponent = () => {
  const [input, setInput] = useState<keysInput>({
    left: false,
    up: false,
    right: false,
    down: false,
  });

  const [collisionArr, setCollisionArr] = useState();

  const [pos, setPos] = useState<spritePosition>({
    spriteX: 684,
    spriteY: 546,
  });

  const inputKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 37) {
      setInput({ ...input, left: true });
    } else if (e.keyCode === 38) {
      setInput({ ...input, up: true });
    } else if (e.keyCode === 39) {
      setInput({ ...input, right: true });
    } else if (e.keyCode === 40) {
      setInput({ ...input, down: true });
    }
  };

  const offPutKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 37) {
      setInput({ ...input, left: false });
    } else if (e.keyCode === 38) {
      setInput({ ...input, up: false });
    } else if (e.keyCode === 39) {
      setInput({ ...input, right: false });
    } else if (e.keyCode === 40) {
      setInput({ ...input, down: false });
    }
  };

  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < collision.length; i += 70) {
      newArr.push(collision.slice(i, 70 + i));
    }
    setCollisionArr(newArr);
  }, []);

  const x = 48;
  const y = 48;

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
          setInput={setInput}
          collisionArr={collisionArr}
          setCollisionArr={setCollisionArr}
        />
        <Image src={map} alt="Map" className={styles.bg} />
        <section className={styles.collisionScreen}>
          {collisionArr?.map((row, i) => {
            return (
              <div key={i}>
                {row?.map((col, j) => {
                  const divStyle = {
                    top: `${i * 48}px`,
                    left: `${j * 48}px`,
                    width: 48,
                    height: 48,
                    position: 'absolute',
                    backgroundColor: 'red',
                    border: '1px solid red',
                  };
                  if (col === 1025) {
                    return <div key={j} style={divStyle}></div>;
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
