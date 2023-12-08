'use client';
import { Blob } from 'buffer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

export const Character = ({ stance, className, style, id }) => {
  const url = `https://maplestory.io/api/character/%7B%22itemId%22%3A2000%2C%22version%22%3A%22235%22%7D%2C%7B%22itemId%22%3A12000%2C%22version%22%3A%22235%22%7D%2C%7B%22itemId%22%3A1053252%2C%22version%22%3A%22235%22%7D%2C%7B%22itemId%22%3A1005061%2C%22version%22%3A%22235%22%7D%2C%7B%22itemId%22%3A26703%2C%22animationName%22%3A%22default%22%2C%22version%22%3A%22235%22%7D/${stance}/animated?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=false&bgColor=0,0,0,0`;
  const fetcher = (item: string) =>
    fetch(item).then((res) => {
      return res.blob();
    });

  const { data, error, isLoading } = useSWR<any>(url, fetcher);
  const { cache } = useSWRConfig();

  if (error) {
    return <div>Failed to fetch users.</div>;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      id={id}
      src={URL.createObjectURL(data)}
      alt="Character"
      className={className}
      style={style}
    />
  );
};
