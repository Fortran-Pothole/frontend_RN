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

export const moveTowardsEnd = (myPosition, setMyPosition, start, end, potholePosition, setShowPotholeInfo, moveIntervalRef) => {
  const direction = calculateDirection(myPosition, end);
  const newPosition = {
    latitude: myPosition.latitude + direction.deltaY * 0.0001, // 10m 이동
    longitude: myPosition.longitude + direction.deltaX * 0.0001,
  };

  const distanceToPothole = checkDistance(newPosition, potholePosition);
  if (distanceToPothole <= 500) {
    const bearingToPothole = calculateBearing(newPosition, potholePosition);
    const userBearing = calculateBearing(start, end);
    const relativeBearing = (bearingToPothole - userBearing + 360) % 360;

    if (relativeBearing < 90 || relativeBearing > 270) {
      setShowPotholeInfo(true);
    } else {
      setShowPotholeInfo(false);
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