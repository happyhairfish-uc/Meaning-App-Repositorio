import React, { useState, useContext} from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from './logos/fondoblanco.png';
import auth from '@react-native-firebase/auth';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, googleLogin } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 50}}>
            <Image source={logo} style={styles.logos} />
          </View>
          
          <View style={styles.inputContainer}>
            <AntDesign style={styles.iconStyle} name="user" size={25} color='#666' />
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
              <AntDesign name='lock' size={25} color='#666' />
            </View>
            <TextInput
              value={password}
              onChangeText={userPassword => setPassword(userPassword)}
              placeholder='Contraseña'
              secureTextEntry={true}
              autoCapitalize= 'none'
              autoCorrect= {false}
              placeholderTextColor = '#B4B4B4'
              returnKeyType="go"
              style={styles.inputtext} />
          </View>
          
          <TouchableOpacity>
            <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.Btnlogin} onPress={() => login(email, password)} >
            <Text style={styles.BtnText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.GbuttonContainer} onPress={() => googleLogin()}>
            <View style={styles.GiconWrapper}>
              <FontAwesome name='google' size={22} color='#4867aa' style={{fontWeight: 'bold'}}/>
            </View>
            <View style={styles.GTxtWrapper}>
              <Text style= {[styles.GbuttonText, {color: '#4867aa'}]}>Iniciar Sesión con Google</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.abajo}>
            <Text style={styles.cuentapregunta}>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Crear Cuenta')}>
              <Text style={styles.registrate}> Registrate</Text>
            </TouchableOpacity>
          </View>
      
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  logos: {
    height: 150,
    resizeMode: 'contain',
  },
  inputContainer: {
    //marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#CCCCCC',
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: '#fff'
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
  inputtext: {
    //marginTop: 5,
    //marginBottom: 10,
    //width: '100%',
    height: windowHeight / 16,
    //flexDirection: 'row',
    borderWidth: 0,
    alignItems: 'center',
    paddingBottom: 0,
    paddingTop: 0
    //backgroundColor: '#fff'
  },
  forgot: {
    color: '#FFBD3A',
    fontSize: 12,
    textAlign: 'right',
    //marginLeft: 150,
    marginBottom: 35,
  },
  Btnlogin: {
    width: '100%',
    backgroundColor: '#FFBD3A',
    borderRadius: 30,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    height: windowHeight / 15,
    marginVertical: 20
  },
  BtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  GbuttonContainer: {
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#e6eaf4',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30
  },
  GiconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  GTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  GbuttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular'
  },
  abajo: {
    flex: 1,
    marginTop: 25,
    fontSize: 7,
    //alignItems:'flex-end',
    flexDirection: 'row',
    //flexWrap:'wrap',
    justifyContent: 'flex-end',
    //alignItems: 'center', 
    justifyContent: 'center'
  },
  cuentapregunta: {
    color: '#666666',
  },
   registrate: {
    color: '#FFBD3A',
  },
});