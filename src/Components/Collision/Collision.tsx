'use client';

import { useEffect } from 'react';

import styles from './Collision.module.css';

const Collision = (props: any) => {
  const {
    squareArr,

    x,
    y,
  } = props;
  return (
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
                opacity: 0,
              } as React.CSSProperties;
              if (col === 1025) {
                return <div key={j} id={`${i}${j}`} style={divStyle}></div>;
              }
            })}
          </div>
        );
      })}
    </section>
  );
};

export { Collision };
