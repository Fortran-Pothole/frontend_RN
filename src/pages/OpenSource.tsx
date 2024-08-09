import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { OpenSourceLicense } from '../assets/OpenSourceLicense'; // OpenSourceLicenseScreen 임포트

const OpenSource = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.libraryName}>{item.libraryName} (v{item.version})</Text>
      <Text style={styles.description}>{item._description}</Text>
      <Text style={styles.license}>License: {item._license}</Text>
      <Text style={styles.homepage}>Homepage: {item.homepage}</Text>
      <Text style={styles.author}>Author: {item.author.name} ({item.author.email})</Text>
      <Text style={styles.licenseContent}>{item._licenseContent}</Text>
    </View>
  );

  return (
    <FlatList
      data={OpenSourceLicense}
      keyExtractor={(item, index) => `${item.libraryName}-${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  libraryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  license: {
    fontSize: 14,
    marginBottom: 8,
  },
  homepage: {
    fontSize: 14,
    marginBottom: 8,
    color: '#0000EE',
  },
  author: {
    fontSize: 14,
    marginBottom: 8,
  },
  licenseContent: {
    fontSize: 12,
    color: '#333333',
  },
});

export default OpenSource;