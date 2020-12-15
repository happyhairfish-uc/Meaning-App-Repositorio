import React, { Component, useState } from 'react';
import { Text, View, Alert, StyleSheet, ImageBackground, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import {WebView} from 'react-native-webview';
import HyperLink from 'react-native-hyperlink';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import database from '@react-native-firebase/database';
//import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonicIcons from 'react-native-vector-icons/Ionicons';

export default function TipDetails({ route,navigation }) {
  const {Titulo} = route.params;
  const {DescripcionVideo} = route.params;
  const {DescripcionActividad} = route.params;
  const {key} = route.params;
  const [Comment, setComment ] = useState('');
  const [Name, setName] = useState('');
  const [User, setUser] = useState(['']);

  function sendComment(Comment, Name) {
    database().ref('/Tips/' + key + '/Comentarios').child(Name).set({
      Comentario: Comment})
  };

  database()
    .ref('/Tips/' + key + '/Comentarios')
    .once('value').then((snapshot) => {
      var us = []
      snapshot.forEach((child) => {
        us.push({
          key:child.key,
          Nombre: child.val().Name,
          Comentario: child.val().Comment
        });
      });
      setUser(us)
    })

  return(
    <View style={styles.container}>
      <ScrollView>
        <HyperLink linkDefault={ true } linkStyle={{color: '#2980b9' }}>
          <View style={styles.textbox}>
            <Text style={styles.headerobjact}>Objetivo</Text>
            <View style={styles.descripciones}>
              <Text></Text>
              <Text style={{fontSize: 15, padding: 6}}>{DescripcionVideo}</Text>
            </View>
          </View>
          
          <View style={styles.textbox}>
            <View style={{textAlign: 'left', marginLeft: 13, borderRadius: 5, backgroundColor: '#FFFFFF', borderWidth:1, borderColor: '#FFBD3A', position: 'absolute', padding: 6, elevation: 6}}>
              <IonicIcons name='chatbubble-outline' size={27} color= '#000000'/>
            </View>
            <View style={styles.descripciones}>
              <Text></Text>
              <Text style={{fontSize: 15, padding: 6, color: '#ADADAD'}}>{DescripcionActividad}</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                    //underlineColorAndroid='#FFFFFF'
                    value={Name}
                    onChangeText={userName => setName(userName)}
                    placeholder='Tu Nombre'
                    placeholderTextColor = '#DDDDDD'
                    autoCapitalize= 'none'
                    autoCorrect= {false}
                    style={{flex: 1, padding: 5, fontSize: 15, borderBottomWidth: 1, borderColor: '#DDDDDD'}} />
                <TextInput
                  //underlineColorAndroid='#FFFFFF'
                  value={Comment}
                  onChangeText={userComment => setComment(userComment)}
                  placeholder='Escribe tu respuesta aqui'
                  placeholderTextColor = '#DDDDDD'
                  autoCapitalize= 'none'
                  autoCorrect= {false}
                  style={{flex: 2, padding: 5, fontSize: 15}} />
                <TouchableOpacity 
                  style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 5}} 
                  onPress={() => 
                  database()
                  .ref('/Tips/' + key + '/Comentarios')
                  .push({Name, Comment})
                  }
                >
                  <Text><FontAwesome name='plus-circle' size={27} color='#6EB2E1'/></Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.textbox}>
            <View style={{textAlign: 'left', marginLeft: 13, borderRadius: 5, backgroundColor: '#FFFFFF', borderWidth:1, borderColor: '#FFBD3A', position: 'absolute', padding: 6, elevation: 6}}>
              <IonicIcons name='chatbubbles-outline' size={27} color='#000000'/>
            </View>
            <View style={styles.descripciones}>
              <Text></Text>
              <FlatList
                data={User}
                keyExtractor={(item) => item.key}
                renderItem= {({item}) =>
                  <Card style={{backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', borderRadius: 0}}>
                    <View style= {{flex: 1, flexDirection:'row', padding: 5, marginLeft: 6}}>
                      <Text style={{flex: 1, fontSize: 15, fontFamily:'Ubuntu-Regular', fontWeight: 'bold'}}>{item.Nombre}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:'row', padding: 6, marginLeft: 6}}>
                      <Text style={{flex: 1, fontSize: 15, fontFamily: 'Ubuntu-Regular'}}>{item.Comentario}</Text>
                    </View>
                  </Card>
                }
              />
            </View>
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
      padding: 6
    },
    textbox2: {
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
      fontFamily: 'Ubuntu-Regular', 
      fontSize: 20, 
      textAlign: 'left',
      marginLeft: 13, 
      borderRadius: 5,
      backgroundColor: '#FFFFFF',
      color: '#000000',
      borderWidth:1,
      borderColor: '#FFBD3A',
      position: 'absolute',
      //borderBottomWidth: 1,
      padding: 6,
      elevation: 6,
      //borderBottomColor: '#DDDDDD'
    },
    headerobject2: { 
      flex: 1,
      borderBottomWidth: 1,
      padding: 3,
      //borderBottomColor: '#DDDDDD',
      //borderRadius: 0,
      flexDirection: 'row'
    },
    descripciones: {
      position: 'relative',
      flex: 2,
      borderRadius: 4, 
      borderColor: '#DDDDDD',
      borderWidth: 1,
      textAlign: 'left',
      //borderTopColor: '#DDDDDD',
      //borderTopWidth: 1,
      fontFamily: 'Ubuntu-Regular', 
      padding: 6,
      marginTop: 13,
      backgroundColor: '#FFFFFF',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.80,
      elevation: 5,
    },
    inputContainer: {
      padding: 6,
      marginTop: 12,
      width: '100%',
      height: windowHeight / 5,
      borderColor: '#CCCCCC',
      borderRadius: 3,
      borderWidth: 1,
      //flexDirection: 'row',
      //alignItems: 'center',
      backgroundColor: '#fff'
    }
  });