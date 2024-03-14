import { useEffect, useMemo, useState } from 'react';

import { Character, stances } from '@/Assets/index';

import styles from './Shrimp.module.css';

type positionType = HTMLDivElement | HTMLImageElement;

const updateVar = (vars, value) => {
  if (typeof document === 'undefined') return;
  return document.documentElement.style.setProperty(vars, value);
};

const position = (id: string) => {
  const element = document.getElementById(id) as positionType;
  return element?.getBoundingClientRect();
};

const boundaryCheck = (square1, square2, left, up, right, down) => {
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
const speed: number = 6;
const collidingSpeed = 15;
const Shrimp = (props) => {
  const [frameCount, setFrameCount] = useState<number>(0);
  const [stance, setStance] = useState('walk1');
  const {
    pos,
    setPos,
    input,
    currentMap,
    setCurrentMap,
    mapsData,
    setIsLoading,
    setMoving,
  } = props;

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

  const colliding = (left, up, right, down, calc) => {
    for (let i = 0; i < currentMap.positionId.length; i++) {
      if (
        boundaryCheck('shrimp', currentMap.positionId[i], left, up, right, down)
      ) {
        return;
      }
    }
    setPos(calc);
  };

  const portalCheck = (left, up, right, down) => {
    for (let i = 0; i < Object.values(currentMap.portals).length; i++) {
      for (
        let j = 0;
        j < Object.values<any>(currentMap.portals)[i].length;
        j++
      ) {
        if (
          boundaryCheck(
            'shrimp',
            Object.values<any>(currentMap.portals)[i][j],
            left,
            up,
            right,
            down,
          )
        ) {
          setIsLoading(true);
          setTimeout(() => {
            setMoving(false);
            setCurrentMap(mapsData[Object.keys(currentMap.portals)[i]]);
          }, 2000);
        }
      }
    }
  };

  const move = () => {
    if (Object.keys(input).every((boo) => !input[boo])) {
      animate(stances().stand);
      return;
    }
    animate(stances().walk);
    if (input.left) {
      colliding(collidingSpeed, 0, 0, 0, {
        ...pos,
        spriteX: pos.spriteX - speed,
      });
      portalCheck(collidingSpeed, 0, 0, 0);
      setDirection();
    }
    if (input.up) {
      colliding(0, collidingSpeed, 0, 0, {
        ...pos,
        spriteY: pos.spriteY - speed,
      });
      portalCheck(0, collidingSpeed, 0, 0);
      setDirection();
    }
    if (input.right) {
      colliding(0, 0, collidingSpeed, 0, {
        ...pos,
        spriteX: pos.spriteX + speed,
      });
      portalCheck(0, 0, collidingSpeed, 0);
      setDirection();
    }
    if (input.down) {
      colliding(0, 0, 0, collidingSpeed, {
        ...pos,
        spriteY: pos.spriteY + speed,
      });
      portalCheck(0, 0, 0, collidingSpeed);
      setDirection();
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
