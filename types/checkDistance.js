function checkDistance(coords1, coords2) {
    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;
  
    const dLat = distance(coords2.latitude, coords1.latitude);
    const dLon = distance(coords2.longitude, coords1.longitude);
  
    const lat1 = toRadian(coords1.latitude);
    const lat2 = toRadian(coords2.latitude);
  
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));
  
    return RADIUS_OF_EARTH_IN_KM * c * 1000; 
}

export default checkDistance;

  