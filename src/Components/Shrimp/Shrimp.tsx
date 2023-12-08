import { useMemo } from 'react';

import { Character, stances } from '@/Assets/index';

import styles from './Shrimp.module.css';

const Shrimp: FC = () => {
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
  return <div>{character}</div>;
};

export { Shrimp };
