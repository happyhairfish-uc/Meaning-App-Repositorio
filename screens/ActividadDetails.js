import React, { Component, useState, useCallback, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import {WebView} from 'react-native-webview';
import HyperLink from 'react-native-hyperlink';


export default function ActividadDetails({ route, navigation }) {
  const { Titulo } = route.params;
  const {DescripcionVideo} = route.params;
  const {Video} = route.params;
  const {DescripcionActividad} = route.params;
  const {ActividadPDF} = route.params;

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
                  linkStyle={{ fontSize: 16, textAlign: 'left', color: '#2980b9', fontFamily:'Ubuntu_400Regular', padding: 3}}
                  linkText={ url => url === ActividadPDF ? 'aquí' : url}
                  >
                  <Text style={{fontSize: 16, textAlign: 'left', fontFamily:'Ubuntu_400Regular', padding: 3, marginVertical: 10}}>{`Descargue ${ActividadPDF} la guía para facilitar la realización de la actividad.`}</Text>
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
          <Text style={styles.tituloact}>{Titulo}</Text>
          <HyperLink linkDefault={ true } linkStyle={{color: '#2980b9' }}>
            <View style={styles.textbox}>
              <Text style={styles.headerobjact}>Objetivo</Text>
              <Text style={styles.descripciones}>{DescripcionVideo}</Text>
            </View>
            <View style={styles.textbox}>
              <Text style={styles.headerobjact}>Actividad</Text>
              <Text style={styles.descripciones}>{DescripcionActividad}</Text>
              <HyperLink
                  linkStyle={{ fontSize: 16, textAlign: 'left', color: '#2980b9', fontFamily:'Ubuntu_400Regular', padding: 3}}
                  linkText={ url => url === ActividadPDF ? 'aquí' : url}
                  >
                <Text style={{fontSize: 16, textAlign: 'left', fontFamily:'Ubuntu_400Regular', padding: 3, marginVertical: 10}}>{`Descargue ${ActividadPDF} la guía para facilitar la realización de la actividad.`}</Text>
              </HyperLink>
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
    textAlign: 'left',
    marginHorizontal:6,
    marginTop: 6, 
    padding: 5,
    fontSize: 20,
    fontFamily:'SourceSansPro_600SemiBold' ,
    color: '#333333'
  },
  textbox: {
    flex: 1, 
    marginHorizontal:6,
    marginTop: 10, 
    borderRadius: 4,  
    padding: 6, 
    borderColor: '#DDDDDD',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.80,
    elevation: 5,
  },
  headerobjact: {
    fontFamily: 'Ubuntu_500Medium', 
    fontSize: 18, 
    textAlign: 'left', 
    borderBottomWidth: 1,
    padding: 3,
    borderBottomColor: '#DDDDDD'
  },
  descripciones: {
    fontSize: 16, 
    textAlign: 'left', 
    fontFamily:'Ubuntu_400Regular', 
    padding: 3
  }
});