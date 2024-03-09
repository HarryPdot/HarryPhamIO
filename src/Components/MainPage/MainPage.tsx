'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Island } from '../Island/Island';
import { Shrimp } from '../Shrimp/Shrimp';
import { Test } from '../Test/Test';
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

type loadObjects = {
  shrimp: boolean;
  island: boolean;
  test: boolean;
};

type mapInfo = {
  name: string;
  array: string[];
  positionId: string[];
  image: any;
  startPosition: number[];
};

const left = 37 || 'a';
const up = 38 || 'w';
const right = 39 || 'd';
const down = 40 || 's';

const MainPage: React.FunctionComponent = () => {
  const [input, setInput] = useState<keysInput>({
    left: false,
    up: false,
    right: false,
    down: false,
  });

  const [loadReady, setLoadReady] = useState<loadObjects>({
    shrimp: false,
    island: false,
    test: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mapsData, setMapsData] = useState<any>([]);

  const [pos, setPos] = useState<spritePosition>({
    spriteX: 684,
    spriteY: 546,
  });

  const [currentMap, setCurrentMap] = useState<any>([]);

  useEffect(() => {
    if (
      Object.values(loadReady).every((component) => {
        component === true;
      })
    ) {
      console.log('ready');
    }
  }, [loadReady]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (currentMap.length === 0) return;
    setPos({
      spriteX: currentMap.startPosition.x,
      spriteY: currentMap.startPosition.y,
    });
  }, [currentMap]);

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

  return (
    <main
      className={styles.main}
      tabIndex={0}
      onKeyDown={inputKey}
      onKeyUp={offPutKey}
    >
      {/* {isLoading ? (
        <div className={styles.loading}></div>
      ) : (
        <div className={styles.loadingOut}></div>
      )} */}
      <section className={styles.screen}>
        <Shrimp
          pos={pos}
          setPos={setPos}
          input={input}
          currentMap={currentMap}
          mapsData={mapsData}
          setCurrentMap={setCurrentMap}
          setLoadReady={setLoadReady}
          loadReady={loadReady}
        />
        {currentMap.image && (
          <Image
            src={currentMap.image}
            alt="Map"
            className={styles.bg}
            priority
          />
        )}
        <Island
          setCurrentMap={setCurrentMap}
          setMapsData={setMapsData}
          currentMap={currentMap}
          setLoadReady={setLoadReady}
        ></Island>
        <Test
          setMapsData={setMapsData}
          currentMap={currentMap}
          setLoadReady={setLoadReady}
        ></Test>
      </section>
    </main>
  );
};
export { MainPage };
