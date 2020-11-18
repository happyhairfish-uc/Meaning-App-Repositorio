import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-community/google-signin';

import LoginScreen from '../screens/LoginScreen'
import CrearCuenta from '../screens/CrearCuenta'

const Stack = createStackNavigator();

export default function AuthStack() {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '432650538639-5cmhnhv3qbklhs79re0no1jjg4v9eo9k.apps.googleusercontent.com',
    });
  
  }, []);

  return (
    //<NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={ LoginScreen }
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Crear Cuenta"
          component={ CrearCuenta }
        />
      </Stack.Navigator>
    //</NavigationContainer>
  );
}