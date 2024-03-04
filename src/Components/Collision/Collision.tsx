'use client';

import { useEffect } from 'react';

import styles from './Collision.module.css';

const Collision = (props: any) => {
  const { collisionPos, setCollisionPos } = props;
  return <section className={styles.collisionScreen}></section>;
};

export { Collision };
