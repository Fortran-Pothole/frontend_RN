import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PotholeReportList = () => {
  const reports = useSelector(state => state.pothole.reports);
  const navigation = useNavigation();

  const handleItemPress = item => {
    navigation.navigate('PotholeReportDetail', {
      ...item,
      readOnly: true, // 읽기 전용 모드로 설정
    });
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
      data={reports}
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
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
});

export default PotholeReportList;
