import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {removeReport} from '../slices/potholeSlice';

const PotholeReportList = () => {
  const reports = useSelector(state => state.pothole.reports);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(removeReport(id));
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>위치: {item.location}</Text>
      <Text style={styles.itemText}>내용: {item.description}</Text>
      <Text style={styles.itemText}>신고 일자: {item.reportDate}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButtonText}>삭제</Text>
      </TouchableOpacity>
    </View>
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
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PotholeReportList;
