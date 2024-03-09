import { useEffect, useMemo, useState } from 'react';

import { Character, stances } from '@/Assets/index';

import styles from './Shrimp.module.css';

type positionType = HTMLDivElement | HTMLImageElement;

const updateVar = (vars, value): any => {
  if (typeof document === 'undefined') return;
  return document.documentElement.style.setProperty(vars, value);
};

const position = (id: string) => {
  const element = document.getElementById(id) as positionType;
  return element?.getBoundingClientRect();
};

const collisionDetection = (square1, square2, left, up, right, down) => {
  return (
    position(square1)?.x + position(square1)?.width >=
      position(square2)?.x - right &&
    position(square2)?.x + position(square2)?.width + left >=
      position(square1)?.x &&
    position(square1)?.y + position(square1)?.height + down >=
      position(square2)?.y &&
    position(square2)?.y + position(square2)?.height >=
      position(square1)?.y - up
  );
};

const fps: number = 16;
const speed: number = 3;
const Shrimp: any = (props) => {
  const [frameCount, setFrameCount] = useState<number>(0);
  const [stance, setStance] = useState('stand1');
  const { pos, setPos, input, currentMap, mapsData, setCurrentMap } = props;

  useEffect(() => {
    const interval = setInterval(() => frame(), fps);
    return () => clearInterval(interval);
  }, [frameCount]);

  const frame = () => {
    move();
    alignCharacterPosition();
    alignMapPosition();
    setFrameCount((prev) => prev + 1);
  };

  const move = () => {
    if (Object.keys(input).every((boo) => !input[boo])) {
      animate(stances().stand);
      return;
    }
    animate(stances().walk);
    setDirection();
    if (input.left) {
      for (let i = 0; i < currentMap.positionId.length; i++) {
        if (collisionDetection('shrimp', currentMap.positionId[i], 6, 0, 0, 0))
          return;
      }
      setPos({ ...pos, spriteX: pos.spriteX - speed });
    }
    if (input.up) {
      for (let i = 0; i < currentMap.positionId.length; i++) {
        if (collisionDetection('shrimp', currentMap.positionId[i], 0, 6, 0, 0))
          return;
      }
      setPos({ ...pos, spriteY: pos.spriteY - speed });
    }
    if (input.right) {
      for (let i = 0; i < currentMap.positionId.length; i++) {
        if (collisionDetection('shrimp', currentMap.positionId[i], 0, 0, 6, 0))
          return;
      }
      setPos({ ...pos, spriteX: pos.spriteX + speed });
    }
    if (input.down) {
      for (let i = 0; i < currentMap.positionId.length; i++) {
        if (collisionDetection('shrimp', currentMap.positionId[i], 0, 0, 0, 6))
          return;
      }
      setPos({ ...pos, spriteY: pos.spriteY + speed });
    }
  };

  const setDirection = () => {
    if (input.right) {
      updateVar('--transform', 'scaleX(-1)');
    } else if (input.left) {
      updateVar('--transform', 'scaleX(1)');
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
