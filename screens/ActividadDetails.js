import React, { Component, useState, useCallback, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import {WebView} from 'react-native-webview';
import HyperLink from 'react-native-hyperlink';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LikeButton from '../components/LikeButton';

export default function ActividadDetails({ route, navigation }) {
  
  //aqui lo unico que estoy haciendo es agarrar los parametros de la actividad que es mandado desde MaterialScreen para luego presentarlos en la pantalla 
  //en sus secciones correspondientes y tambien para mandarselos a el LikeButton 
  const {Titulo} = route.params;
  const {DescripcionVideo} = route.params;
  const {Video} = route.params;
  const {DescripcionActividad} = route.params;
  const {ActividadPDF} = route.params;
  const {key} = route.params;
  const {Fecha} = route.params;
  const {Curso} = route.params;
  const {Materia} = route.params;

  //Aqui el primer condicional es para cuando exista un video Youtube en las actividades, que todas las que yo inclui no tenian asique solo trabaje con la segunda condicional
  //y por eso tiene muchas mas cosas y esta mas producida. Tu vas a tener que actualizar y copiar lo de la segunda condicional para hacer la primera igual.
  if (Video !== "undefined"){
      return(
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.tituloact}>{Titulo}</Text>
            <HyperLink linkDefault={ true } linkStyle={{color: '#2980b9' }}>
              <View style={styles.textbox}>
                <Text style={styles.headerobjact}>Objetivo</Text>
                <Text style={styles.descripciones}>{DescripcionVideo}</Text>
                <WebView 
                  style={{width: '100%', height: 200, borderWidth:1, marginVertical: 15}} 
                  source={{ uri: Video }}
                  originWhitelist={['*']}
                  startInLoadingState={true}
                />
              </View>
              <View style={styles.textbox}>
                <Text style={styles.headerobjact}>Actividad</Text>
                <Text style={styles.descripciones}>{DescripcionActividad}</Text>
                <HyperLink
                  linkStyle={{ fontSize: 16, textAlign: 'left', color: '#2980b9', fontFamily:'Ubuntu-Regular', padding: 3}}
                  linkText={ url => url === ActividadPDF ? 'aquí' : url}
                  >
                  <Text style={{fontSize: 16, textAlign: 'left', fontFamily:'Ubuntu-Regular', padding: 3, marginVertical: 10}}>{`Descargue ${ActividadPDF} la guía para facilitar la realización de la actividad.`}</Text>
                </HyperLink>
              </View>
            </HyperLink>
          </ScrollView>
        </View>
      );
  }else{
    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'center', textAlign: 'center'}}>
            <Text style={styles.tituloact}>{Titulo}</Text>
            <Text style={{flex: 1, marginTop: 6, alignSelf: 'center'}}><LikeButton Key={key} titulo={Titulo} descripcionVideo={DescripcionVideo} video={Video} descripcionActividad={DescripcionActividad} actividadPDF={ActividadPDF} fecha={Fecha} curso={Curso} materia={Materia}/></Text>
          </View>
          
          <HyperLink linkDefault={ true } linkStyle={{color: '#2980b9' }}>
            <View style={styles.textbox}>
              <Text style={styles.headerobjact}>Objetivo</Text>
              <View style={styles.descripciones}>
                <Text></Text>
                <Text style={{fontSize: 15, padding: 6}}>{DescripcionVideo}</Text>
              </View>
            
            </View>
            <View style={styles.textbox}>
              <Text style={styles.headerobjact}>Actividad</Text>
              <View style={styles.descripciones}>
                <Text></Text>
                <Text style={{fontSize: 15, padding: 6}}>{DescripcionActividad}</Text>
              
                <HyperLink
                  linkStyle={{ fontSize: 15, textAlign: 'left', color: '#2980b9', fontFamily:'Ubuntu-Regular', padding: 3}}
                  linkText={ url => url === ActividadPDF ? 'aquí' : url}
                  >
                  <Text style={{fontSize: 15, textAlign: 'left', fontFamily:'Ubuntu-Regular', padding: 3, marginVertical: 10}}>{`Descargue ${ActividadPDF} la guía para facilitar la realización de la actividad.`}</Text>
                </HyperLink>
              </View>
            </View>
          </HyperLink>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    //marginTop: Constant.statusBarHeight,
    backgroundColor: '#272727',
    borderRadius:10,
    marginHorizontal:10
  },
  tituloact: {
    flex: 6,
    marginHorizontal:6,
    marginTop: 6, 
    padding: 5,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily:'SourceSans-Pro' ,
    fontWeight: 'bold',
    color: '#333333'
  },
  textbox: {
    flex: 1, 
    marginHorizontal:6,
    marginTop: 10,  
    padding: 6,
    
  },
  headerobjact: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 20, 
    textAlign: 'left', 
    padding: 6,
    elevation: 6,
    marginLeft: 13, 
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderWidth:1,
    borderColor: '#FFBD3A',
    position: 'absolute',
  },
  descripciones: {
    position: 'relative',
      flex: 2,
      borderRadius: 4, 
      borderColor: '#DDDDDD',
      borderWidth: 1,
      textAlign: 'left',
      fontFamily: 'Ubuntu-Regular', 
      padding: 6,
      marginTop: 13,
      backgroundColor: '#FFFFFF',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.80,
      elevation: 5,
  }
});