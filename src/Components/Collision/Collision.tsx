'use client';

import styles from './Collision.module.css';

const Collision = (props) => {
  const { squareArr, x, y } = props;
  return (
    <section className={styles.collisionScreen}>
      {squareArr?.map((row, i) => {
        return row?.map((col, j) => {
          const divStyle = {
            top: i * y,
            left: j * x,
            width: x,
            height: y,
            position: 'absolute',
            backgroundColor: 'red',
            opacity: 0,
          } as React.CSSProperties;
          if (col === 1025 || col === 1027 || col === 1028 || col === 1029) {
            return <div key={j} id={`${i}${j}`} style={divStyle}></div>;
          }
        });
      })}
    </section>
  );
};

export { Collision };
