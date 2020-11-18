import React, {useContext} from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import headerlogo from './logos/logo2.png';
import { AuthContext } from '../navigation/AuthProvider';

export default function MasScreen() {
  const {logout} = useContext(AuthContext);

  return(
      <View style = { styles.container } >
        <View style={styles.header}>
          <Image source={headerlogo} style={styles.logo} />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingVertical: 150}}>
          <Button title= "Cerrar Sesión" onPress={() => logout()} color='#FFBD3A' />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column'
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginLeft: 23,
    resizeMode: 'contain'
  }
});
