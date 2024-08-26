// locationUtils.js

// 두 좌표 사이의 거리 계산 함수 (단위: 미터)
export const checkDistance = (pos1, pos2) => {
  const R = 6371e3; // 지구 반경 (미터 단위)
  const lat1 = pos1.latitude * (Math.PI / 180);
  const lat2 = pos2.latitude * (Math.PI / 180);
  const deltaLat = (pos2.latitude - pos1.latitude) * (Math.PI / 180);
  const deltaLon = (pos2.longitude - pos1.longitude) * (Math.PI / 180);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 두 지점 사이의 거리 (미터 단위)
  return distance;
};

export const movePosition = (currentPosition, direction, distance = 0.0001) => {
  let newLatitude = currentPosition.latitude;
  let newLongitude = currentPosition.longitude;

  switch (direction) {
    case 'N':
      newLatitude += distance;
      break;
    case 'NE':
      newLatitude += distance;
      newLongitude += distance;
      break;
    case 'E':
      newLongitude += distance;
      break;
    case 'SE':
      newLatitude -= distance;
      newLongitude += distance;
      break;
    case 'S':
      newLatitude -= distance;
      break;
    case 'SW':
      newLatitude -= distance;
      newLongitude -= distance;
      break;
    case 'W':
      newLongitude -= distance;
      break;
    case 'NW':
      newLatitude += distance;
      newLongitude -= distance;
      break;
    default:
      break;
  }

  return { latitude: newLatitude, longitude: newLongitude };
};

export const getDirection = (dx, dy) => {
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angle >= -22.5 && angle < 22.5) return 'E';
  if (angle >= 22.5 && angle < 67.5) return 'NE';
  if (angle >= 67.5 && angle < 112.5) return 'N';
  if (angle >= 112.5 && angle < 157.5) return 'NW';
  if (angle >= -67.5 && angle < -22.5) return 'SE';
  if (angle >= -112.5 && angle < -67.5) return 'S';
  if (angle >= -157.5 && angle < -112.5) return 'SW';
  return 'W';
};

export const calculateDirection = (start, end) => {
  const deltaX = end.longitude - start.longitude;
  const deltaY = end.latitude - start.latitude;
  const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  return { deltaX: deltaX / magnitude, deltaY: deltaY / magnitude };
};

export const calculateBearing = (start, end) => {
  const startLat = start.latitude * (Math.PI / 180);
  const startLng = start.longitude * (Math.PI / 180);
  const endLat = end.latitude * (Math.PI / 180);
  const endLng = end.longitude * (Math.PI / 180);

  const dLng = endLng - startLng;
  const y = Math.sin(dLng) * Math.cos(endLat);
  const x = Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);
  const bearing = Math.atan2(y, x) * (180 / Math.PI);
  return (bearing + 360) % 360; // 방위각을 0-360도로 변환
};

export const moveTowardsEnd = (
  myPosition, 
  setMyPosition, 
  start, 
  end, 
  potholePositions, 
  setSelectedPothole, //가장 가까운 포트홀 
  setShowPotholeInfo, 
  moveIntervalRef,
  passedPotholes,
  setPassedPotholes
) => {
  const direction = calculateDirection(myPosition, end);
  const newPosition = {
    latitude: myPosition.latitude + direction.deltaY * 0.0001, // 10m 이동
    longitude: myPosition.longitude + direction.deltaX * 0.0001,
  };

  // 현재 위치에서 500m 이내의 포트홀만 필터링하고, 가장 가까운 포트홀 찾기
  const closePotholes = potholePositions
    .map(position => ({
      ...position,
      distance: checkDistance(newPosition, position),
    }))
    .filter(position => position.distance <= 400 && !passedPotholes.has(position.id))
    .sort((a, b) => a.distance - b.distance);

  if (closePotholes.length > 0) {
    const nearestPothole = closePotholes[0]; // 가장 가까운 포트홀 선택
    setSelectedPothole(nearestPothole);
    setShowPotholeInfo(true);

    // 가장 가까운 포트홀이 사용자를 지나쳤는지 확인
    const distanceToNearestPothole = checkDistance(myPosition, nearestPothole);
    const distanceToNewPosition = checkDistance(newPosition, nearestPothole);

    // 사용자가 포트홀을 지나치면, 지나간 포트홀로 처리
    if (distanceToNewPosition > distanceToNearestPothole) {
      setPassedPotholes(prev => new Set(prev).add(nearestPothole.id));
    }
  } else {
    setShowPotholeInfo(false);
  }

  const distanceToEnd = checkDistance(newPosition, end);
  if (distanceToEnd <= 0.0001) {
    clearInterval(moveIntervalRef.current); 
    setMyPosition(end);
  } else {
    setMyPosition(newPosition);
  }
};