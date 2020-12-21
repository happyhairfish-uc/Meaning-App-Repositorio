import 'react-native-gesture-handler';
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import MaterialScreen from '../screens/MaterialScreen';
import MasScreen from '../screens/MasScreen';
import ActividadDetails from '../screens/ActividadDetails';
import TipDetails from '../screens/TipDetails';
import ICONHOME from '../assets/Home.png';
import ICONMAS from '../assets/Mas.png';
import LikesScreen from '../screens/LikesScreen';

const Tab = createBottomTabNavigator();

//Esto es como para que el LoginScreen te lleve al InicioScreen, que es donde salen los tabs abajo de Material y Mas

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

  var user = auth().currentUser;
  var name, email, uid;

  //Lo siguiente es para que cuando un usuario haga login, cada vez que se mete una persona nueva se sube su informacion al realtime database y cuando ya es una persona que ya se
  //ha metido antes, solo se hace update para no borrar la informacion que esta tendro de la cosa de eses usuario, como sus likes por ejemplo.

  if (user != null) {
    database()
    .ref('/Users/' + user.uid)
    .update({
      name: user.displayName,
      email: user.email
    })
  }

  //lo siguiente son todas las "vistas". Antes hice los tabs, ahora lo que esta abajo no tiene ninguna tab abajo, solo son todas las vistas por las que uno podria llegar usando navigation.
   
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
            headerTintColor: '#333333',
            headerTitleStyle: {fontFamily: 'SourceSansPro-Bold'}
          }}
        />
        <Stack.Screen
          name="Tip"
          component= {TipDetails}
          options={{
            title: 'Tip +Meaning',
            headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, backgroundColor: '#FFFFFF'},
            headerTitleAlign: 'center',
            headerTitleStyle: {fontFamily: 'SourceSansPro-Bold'},
            headerTintColor: '#333333'
          }}
        />
        <Stack.Screen
          name="Likes"
          component= {LikesScreen}
          options={{
            title: 'Mis Favoritos',
            headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, backgroundColor: '#FFFFFF'},
            headerTitleAlign: 'center',
            headerTintColor: '#333333',
            headerTitleStyle: {fontFamily: 'SourceSansPro-Bold'}
          }}
        />
      </Stack.Navigator>
    //</NavigationContainer>
  );
}

export default HomeStack;