import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NoticePotholeList from './NoticePotholeList';
import ReportPotholeList from './ReportPotholeList';
import {Text} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const PotholeReportTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPosition: 'top',
        tabBarStyle: {backgroundColor: '#fff'},
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#aaa',
        tabBarIndicatorStyle: {
          backgroundColor: '#266DFC',
        },
      }}>
      <Tab.Screen
        name="자동 신고"
        component={NoticePotholeList}
        options={{
          tabBarLabel: '자동 신고',
        }}
      />
      <Tab.Screen
        name="수동 신고"
        component={ReportPotholeList}
        options={{
          tabBarLabel: '수동 신고',
        }}
      />
    </Tab.Navigator>
  );
};

export default PotholeReportTabs;
