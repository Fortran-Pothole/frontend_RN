import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import checkDistance from '../../types/checkDistance';


function PotholeInfo({ position, myPosition}) {
  const encodedURL = encodeURI(position.image);
  const warningLevel = position.warning;

  let warningText = '';
  let warningColor = '#000000'; // 기본 색상을 검정색으로 설정

  if (warningLevel >= 1 && warningLevel <= 3) {
    warningText = '주의';
    warningColor = '#FFA500'; // 오렌지 색상
  } else if (warningLevel >= 4 && warningLevel <= 5) {
    warningText = '위험';
    warningColor = '#FF0000'; // 빨간색
  }

  console.log('Warning Text:', warningText, 'Color:', warningColor);
  return (
    <View style={styles.potholeInfoContainer}>
      <Text style={styles.potholeInfoHeader}>포트홀 정보</Text>
      <Text style={styles.potholeInfoText}>
        전방 {Math.round(checkDistance(myPosition, position))}m
      </Text>
      <Text style={[styles.potholeInfoText, { color: warningColor }]}>
        포트홀 위험도: {warningText}
      </Text>
      <Text style={styles.potholeInfoText}>
        위도: {position.latitude.toFixed(5)}
      </Text>
      <Text style={styles.potholeInfoText}>
        경도: {position.longitude.toFixed(5)}
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: encodedURL }}
          style={styles.potholeImage}
          resizeMode="cover" 
          onError={() => console.log('Failed to load image')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  potholeInfoContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
    width: 200,
    height: 320,
    borderColor: '#ccc',
  },
  potholeInfoHeader: { color: 'black', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  potholeInfoText: { color: 'black', fontSize: 16, marginBottom: 5 },
  imageContainer: { marginTop: 15, width: '100%', height: 100, alignItems: 'center', justifyContent: 'center' },
  potholeImage: { width: '100%', height: '100%', resizeMode: 'contain' },
});

export default PotholeInfo;
