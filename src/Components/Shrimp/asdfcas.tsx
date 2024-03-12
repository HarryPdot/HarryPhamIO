if (input.left && lastKey === 'left') {
  for (let i = 0; i < currentMap.positionId.length; i++) {
    if (colliding('shrimp', currentMap.positionId[i], collidingSpeed, 0, 0, 0))
      return;
  }
  for (let i = 0; i < Object.values<any>(currentMap.portals).length; i++) {
    for (let j = 0; j < Object.values<any>(currentMap.portals)[i].length; j++) {
      if (
        colliding(
          'shrimp',
          Object.values<any>(currentMap.portals)[i][j],
          0,
          0,
          0,
          portalCollisionSpeed,
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
  setPos({ ...pos, spriteX: pos.spriteX - speed });
  setDirection();
}

const portalling = () => {
  for (let i = 0; i < Object.values<any>(currentMap.portals).length; i++) {
    for (let j = 0; j < Object.values<any>(currentMap.portals)[i].length; j++) {
      if (
        colliding(
          'shrimp',
          Object.values<any>(currentMap.portals)[i][j],
          0,
          0,
          0,
          portalCollisionSpeed,
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
