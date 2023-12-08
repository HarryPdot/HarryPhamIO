'use client';

import { ReactElement } from 'react';

import { Shrimp } from '../Shrimp/Shrimp';
import styles from './MainPage.module.css';

const MainPage: FC = () => {
  const arrowKeys = (e: KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 37) {
      console.log('left');
    } else if (e.keyCode === 38) {
      console.log('up');
    } else if (e.keyCode === 39) {
      console.log('right');
    } else if (e.keyCode === 40) {
      console.log('down');
    }
  };
  return (
    <main className={styles.main} tabIndex="0" onKeyDown={arrowKeys}>
      <Shrimp />
    </main>
  );
};

export { MainPage };
