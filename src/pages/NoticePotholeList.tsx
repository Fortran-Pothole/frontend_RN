import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux'; // 리덕스 관련 추가
import {addAutoReport} from '../slices/autoPotholeSlice'; // 리덕스 액션 가져오기

//자동 신고를 처리하는 컴포넌트
const NoticePotholeList = () => {
  const autoReports = useSelector(state => state.autoPothole.autoReports);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    // 여기에 자동 신고 조회 API 호출
    // const fetchAutoReports = async () => {
    //   try {
    //     const response = await fetch('자동신고 API URL');
    //     const data = await response.json();
    //     setAutoReports(data);
    //   } catch (error) {
    //     console.error('자동 신고 목록을 가져오는 중 오류 발생:', error);
    //   }
    // };
    // fetchAutoReports();
  }, [dispatch]);

  const handleItemPress = item => {
    navigation.navigate('PotholeReportDetail', {...item, readOnly: true});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>위치: {item.location}</Text>
        <Text style={styles.itemText}>내용: {item.description}</Text>
        <Text style={styles.itemText}>신고 일자: {item.reportDate}</Text>
      </View>
    </TouchableOpacity>
  );

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
});

export default NoticePotholeList;
