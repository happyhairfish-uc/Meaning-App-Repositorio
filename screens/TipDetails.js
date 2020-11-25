import React, { Component} from 'react';
import { Text, View, Alert, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import {WebView} from 'react-native-webview';
import HyperLink from 'react-native-hyperlink';

export default function TipDetails({ route,navigation }) {
  const {Titulo} = route.params;
  const {DescripcionVideo} = route.params;
  const {DescripcionActividad} = route.params;

  return(
    <View style={styles.container}>
      <ScrollView>
        <HyperLink linkDefault={ true } linkStyle={{color: '#2980b9' }}>
          <View style={styles.textbox}>
            <Text style={styles.headerobjact}>Objetivo</Text>
            <Text style={styles.descripciones}>{DescripcionVideo}</Text>
          </View>
          <View style={styles.textbox}>
            <Text style={styles.headerobjact}>Actividad</Text>
            <Text style={styles.descripciones}>{DescripcionActividad}</Text>
          </View>
        </HyperLink>
      </ScrollView>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF'
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
      fontFamily: 'Ubuntu_400Regular', 
      padding: 3
    }
  });