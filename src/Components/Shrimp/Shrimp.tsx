import { useEffect, useMemo, useState } from 'react';

import { Character, stances } from '@/Assets/index';

import styles from './Shrimp.module.css';

const updateVar = (vars, value): any => {
  if (typeof document === 'undefined') return;
  return document.documentElement.style.setProperty(vars, value);
};

const position = () => {
  if (typeof document === 'undefined') return;
  // console.log(document.getElementById('shrimp')?.getBoundingClientRect());
  return document.getElementById('shrimp')?.getBoundingClientRect();
};

const Shrimp: any = (props) => {
  const [frameCount, setFrameCount] = useState<number>(0);
  const { pos, setPos, input, setInput } = props;
  const frame = () => {
    animate();
    updateVar('--shrimpX', pos.spriteX + 'px');
    updateVar('--shrimpY', pos.spriteY + 'px');
    setFrameCount((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => frame(), 16);
    return () => clearInterval(interval);
  }, [frameCount]);

  const animate = () => {
    if (Object.keys(input).every((boo) => !input[boo])) return;
    if (input.left) {
      setPos({ ...pos, spriteX: pos.spriteX - 5 });
    }
    if (input.up) {
      setPos({ ...pos, spriteY: pos.spriteY - 5 });
    }
    if (input.right) {
      setPos({ ...pos, spriteX: pos.spriteX + 5 });
    }
    if (input.down) {
      setPos({ ...pos, spriteY: pos.spriteY + 5 });
    }
  };

  const character = useMemo(
    () => (
      <Character
        id={'shrimp'}
        style={{
          position: 'absolute',
        }}
        stance={stances().stand}
        className={styles.shrimp}
      />
    ),
    [],
  );
  return <>{character}</>;
};

export { Shrimp };
