import 'react-native-gesture-handler';
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialScreen from '../screens/MaterialScreen'
import MasScreen from '../screens/MasScreen'
import ActividadDetails from '../screens/ActividadDetails'
import TipDetails from '../screens/TipDetails'
import ICONHOME from '../assets/Home.png';
import ICONMAS from '../assets/Mas.png';

const Tab = createBottomTabNavigator();

function InicioScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FFBD3A',
        inactiveTintColor: 'gray'
      }}>
      <Tab.Screen 
        name="Material" 
        component={MaterialScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image 
              style={{width: 36, height: 36, marginTop: 2}}
              source= {ICONHOME}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Mas" 
        component={MasScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image 
              style={{width: 40, height: 35}}
              source= {ICONMAS}/>
          )
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function HomeStack() {

  return (

    //<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={ InicioScreen }
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Actividad"
          component= { ActividadDetails }
          options={{
            title: 'Actividad  +Meaning',
            headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, backgroundColor: '#DDDDDD'},
            headerTintColor: '#333333'
          }}
        />
        <Stack.Screen
          name="Tip"
          component= {TipDetails}
          options={{
            title: 'Tip +Meaning',
            headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, backgroundColor: '#DDDDDD'},
            headerTintColor: '#333333'
          }}
        />
      </Stack.Navigator>
    //</NavigationContainer>
  );
}

export default HomeStack;