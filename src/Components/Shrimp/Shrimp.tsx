import { Character, stances } from '@/Assets/index';
import styles from './Shrimp.module.css';
import { useMemo } from 'react';

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
