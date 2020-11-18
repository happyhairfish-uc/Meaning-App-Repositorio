import React, { useState, useContext } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from './logos/fondoblanco.png';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../navigation/AuthProvider';


export default function CrearCuenta({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {register} = useContext(AuthContext);

      return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          
          <Text style={styles.text}>Crear una cuenta</Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name="user" color='#666' />
            </View>
            <TextInput
              value={email}
              returnKeyType="next"
              keyboardType = 'email-address'
              onChangeText={userEmail => setEmail(userEmail)}
              placeholder='Correo Electrónico'
              placeholderTextColor = '#B4B4B4'
              autoCapitalize= 'none'
              autoCorrect= {false}
              style={styles.inputtext} />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
              <AntDesign name='LockOutlined' size={25} color='#666' />
            </View>
            <TextInput
              value={password}
              onChangeText={userPassword => setPassword(userPassword)}
              placeholder={'Contraseña'}
              secureTextEntry={true}
              autoCapitalize= 'none'
              autoCorrect= {false}
              placeholderTextColor = '#B4B4B4'
              returnKeyType="next"
              style={styles.inputtext} />
          </View>
          
          <TouchableOpacity style={styles.BtnContainer} onPress={() => register(email, password)} >
            <Text style={styles.BtnText}>Crear Usuario</Text>
          </TouchableOpacity>

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>Registrandose, usted confirma que acepta nuestros </Text>
            <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
              <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>Términos de servicio</Text>
            </TouchableOpacity>
            <Text style={styles.color_textPrivate}> y </Text>
            <TouchableOpacity onPress={() => alert('Privacy Policy Clicked!')}>
              <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>Politica de Privacidad</Text>
            </TouchableOpacity>
          </View>
      
      </KeyboardAvoidingView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#CCCCCC',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50
  },
  inputtext:{
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f'
  },
  BtnContainer:{
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#2e64e5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3
  },
  BtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular'   
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center'
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey'
  }
});