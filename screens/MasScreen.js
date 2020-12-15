import React, {useContext} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import headerlogo from './logos/logo2.png';
import { AuthContext } from '../navigation/AuthProvider';
import {windowHeight, windowWidth} from '../utils/Dimensions';

export default function MasScreen({ navigation }) {
  const {logout} = useContext(AuthContext);

  return(
      <View style = {styles.container} >
        <View style={styles.header}>
          <Image source={headerlogo} style={styles.logo} />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Likes')}>
            <Text style={{padding: 6, margin: 6, borderBottomWidth: 0.5, borderBottomColor: '#ADADAD', fontFamily: 'Ubuntu-Regular', fontWeight: 'bold', color: '#333333'}}>Ver mis Favoritos</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'column', marginTop: windowHeight/2, fontFamily: 'Ubuntu-Regular' }}>
          <Button title= "Cerrar Sesión" onPress={() => logout()} color='#1C355E' />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginLeft: 23,
    resizeMode: 'contain'
  }
});
