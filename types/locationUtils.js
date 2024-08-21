// locationUtils.js

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
  