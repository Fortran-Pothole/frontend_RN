import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchManualReports} from '../slices/manualPotholeSlice';

//수동 신고를 처리하는 컴포넌트
const ReportPotholeList = () => {
  const manualReports = useSelector(state => state.manualPothole.manualReports);
  const status = useSelector(state => state.manualPothole.status);
  const error = useSelector(state => state.manualPothole.error);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchManualReports()); // Thunk 액션으로 신고 목록을 가져옴
    }
  }, [dispatch, status]);

  const handleItemPress = item => {
    navigation.navigate('PotholeReportDetail', {
      report_id: item.id,
      readOnly: true,
      reportType: 'manual',
    });
  };

  const renderItem = ({item}) => {
    const formattedDate = item.created_at.split('T')[0];
    const imageUri = item.images ? item.images.split(',')[0] : null;

    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.itemText}>위치: {item.location}</Text>
            <Text style={styles.itemText}>내용: {item.content}</Text>
            <Text style={styles.itemText}>신고 일자: {formattedDate}</Text>
          </View>
          {imageUri && (
            <Image source={{uri: imageUri}} style={styles.itemImage} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <Text>신고 목록을 불러오는 중...</Text>
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <Text>오류: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={manualReports}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row', // 가로로 나열
    justifyContent: 'space-between', // 텍스트와 이미지를 양쪽 끝에 배치
    alignItems: 'center', // 이미지와 텍스트가 세로로 정렬되도록
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  textContainer: {
    flex: 1, // 텍스트가 차지하는 영역을 늘리기
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  itemImage: {
    width: 60, // 이미지의 가로 크기
    height: 60, // 이미지의 세로 크기
    borderRadius: 8,
    marginLeft: 10, // 텍스트와 이미지 사이의 간격
  },
  loadingContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReportPotholeList;
