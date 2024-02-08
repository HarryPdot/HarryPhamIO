'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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

  const [pos, setPos] = useState<spritePosition>({
    spriteX: 0,
    spriteY: 0,
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

  return (
    <main
      className={styles.main}
      tabIndex={0}
      onKeyDown={inputKey}
      onKeyUp={offPutKey}
    >
      <section>
        {/* <Image src={map} alt="Map" className={styles.bg} /> */}
        <Shrimp pos={pos} setPos={setPos} input={input} setInput={setInput} />
      </section>
    </main>
  );
};

export { MainPage };
