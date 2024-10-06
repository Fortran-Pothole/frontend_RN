import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
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
    const formattedDate = new Date(item.created_at).toISOString().split('T')[0];

    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>위치: {item.location}</Text>
          <Text style={styles.itemText}>내용: {item.content}</Text>
          <Text style={styles.itemText}>신고 일자: {formattedDate}</Text>
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

export default ReportPotholeList;
