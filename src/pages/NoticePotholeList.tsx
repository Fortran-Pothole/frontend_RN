import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux'; // 리덕스 관련 추가
import {fetchAutoReports} from '../slices/autoPotholeSlice'; // 리덕스 액션 가져오기

//자동 신고를 처리하는 컴포넌트
const NoticePotholeList = () => {
  const autoReports = useSelector(state => state.autoPothole.autoReports);
  const status = useSelector(state => state.autoPothole.status);
  const error = useSelector(state => state.autoPothole.error);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    // 자동 신고 목록을 가져오기 위한 Thunk 액션 호출
    dispatch(fetchAutoReports());
  }, [dispatch]);

  const handleItemPress = item => {
    navigation.navigate('PotholeReportDetail', {...item, readOnly: true});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          위치: {item.lat}, {item.lng}
        </Text>
        <Text style={styles.itemText}>
          신고 일자: {item.created_at.split('T')[0]}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <Text>자동 신고 목록을 불러오는 중...</Text>
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
      data={autoReports}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {padding: 20},
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemText: {fontSize: 16, marginBottom: 5, color: '#000'},
  loadingContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {padding: 20, justifyContent: 'center', alignItems: 'center'},
});

export default NoticePotholeList;
