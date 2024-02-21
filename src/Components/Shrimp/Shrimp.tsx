import { useEffect, useMemo, useState } from 'react';

import { Character, stances, collision } from '@/Assets/index';

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

const fps: number = 16;
const speed: number = 3;
const Shrimp: any = (props) => {
  const [frameCount, setFrameCount] = useState<number>(0);
  const [stance, setStance] = useState('stand1');
  const { pos, setPos, input, setInput } = props;
  const frame = () => {
    move();
    alignCharacterPosition();
    alignMapPosition();
    setFrameCount((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => frame(), fps);
    return () => clearInterval(interval);
  }, [frameCount]);

  const move = () => {
    if (Object.keys(input).every((boo) => !input[boo])) {
      animate(stances().stand);
      return;
    }
    setDirection();
    animate(stances().walk);
    if (input.left) {
      setPos({ ...pos, spriteX: pos.spriteX - speed });
    }
    if (input.up) {
      setPos({ ...pos, spriteY: pos.spriteY - speed });
    }
    if (input.right) {
      setPos({ ...pos, spriteX: pos.spriteX + speed });
    }
    if (input.down) {
      setPos({ ...pos, spriteY: pos.spriteY + speed });
    }
    console.log(collision);
  };

  const setDirection = () => {
    if (input.right) {
      updateVar('--transform', 'translate(-50%, -50%) scaleX(-1)');
    } else if (input.left) {
      updateVar('--transform', 'translate(-50%, -50%) scaleX(1)');
    }
  };

  const animate = (animation) => {
    setStance(animation);
  };

  const alignCharacterPosition = () => {
    updateVar('--shrimpX', pos.spriteX + 'px');
    updateVar('--shrimpY', pos.spriteY + 'px');
  };

  const alignMapPosition = () => {
    updateVar('--mapY', -pos.spriteY + 'px');
    updateVar('--mapX', -pos.spriteX + 'px');
  };

  const character = useMemo(
    () => (
      <Character
        id={'shrimp'}
        style={{
          position: 'absolute',
        }}
        stance={stance}
        className={styles.shrimp}
      />
    ),
    [stance],
  );
  return <>{character}</>;
};

export { Shrimp };
