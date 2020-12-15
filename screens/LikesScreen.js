import React, { Component, useEffect } from 'react';
import { Button, Text, TextInput, View, StyleSheet, KeyboardAvoidingView, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {Card} from 'react-native-paper';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const cursos = [
  { label: 'Prekinder/Kinder', value: 'Prekinder/Kinder' },
  { label: '1° Básico', value: '1° Básico' },
  { label: '2° Básico', value: '2° Básico' },
  { label: '3° Básico', value: '3° Básico' },
  { label: '4° Básico', value: '4° Básico' },
  { label: '5° Básico', value: '5° Básico' },
];

const materias = [
  { label: 'Matemáticas', value: 'Matemáticas' },
  { label: 'Lenguaje', value: 'Lenguaje' },
  { label: 'Ciencias Naturales', value: 'Ciencias Naturales' },
  { label: 'Historia', value: 'Historia' },
  { label: 'Inglés', value: 'Inglés'}
];

class LikesScreen extends Component {
  constructor(props) {
    super(props);
   //el state de aqui abajo seria this.state y el extends Component seria extends React.Component
    this.state = {
      favCurso: undefined,
      favMateria: undefined,
      Likes: [],
      LikesFiltered: []
    }
  }
    
  componentDidMount(){
    var user = auth().currentUser;

    database()
    .ref('/Users/' + user.uid + '/Likes/')
    .once('value').then((snapshot) => {
      var like = []
      snapshot.forEach((child) => {
        like.push({
          key: child.key,
          Titulo: child.val().Actividad,
          DescripcionVideo: child.val().DescripcionVideo,
          Video: child.val().Video,
          DescripcionActividad: child.val().DescripcionActividad,
          ActividadPDF: child.val().ActividadPDF,
          Fecha: child.val().Fecha,
          Curso: child.val().Curso,
          Materia: child.val().Materia,
        });
      });
      this.setState({Likes : like})
      this.setState({LikesFiltered : like})
    })
  }

  FilterSelect() {
    const { favCurso, favMateria } = this.state;
    if (favCurso == undefined){
      this.setState({ LikesFiltered: this.state.Likes.filter(i => i.Materia.includes(favMateria))})
    }else{
      //this.setState({ ActFiltered: this.state.Actividades.filter(i => i.Curso.includes(favCurso))})
      if(favMateria =='Matemáticas' || favMateria == 'Lenguaje' || favMateria == 'Ciencias Naturales' || favMateria == 'Historia'){
        this.setState({ LikesFiltered: this.state.Likes.filter(i => i.Materia.includes(favMateria) && i.Curso.includes(favCurso))})
      }else{
        this.setState({ LikesFiltered: this.state.Likes.filter(i => i.Curso.includes(favCurso))})
      }
    }
  }

  getActividad=(item)=>{
    this.props.navigation.navigate('Actividad', item);
  }

  handleSearch(textsearch){
    this.setState({
      LikesFiltered: this.state.Likes.filter(i => i.Titulo.toLowerCase().indexOf(textsearch.toLowerCase()) !== -1)});
  }

  render() {
    return(
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <View style={styles.inputsearch}>
          <MaterialIcons name="search" style={{ marginLeft: 4, marginRight: 13 }} size={25} color='black' />
          <TextInput
            placeholder='Buscar'
            style={styles.buscar}
            returnKeyType="search"
            onChangeText= {text=> this.handleSearch(text)} />
        </View>

        <View style={styles.ContainerActTips}>
          <Text style={{padding: 5, fontFamily: 'SourceSansPro-Bold', fontSize: 21, textAlign: 'left', borderBottomColor: '#ADADAD', backgroundColor: '#FFBD3A'}}>Actividades</Text>
          <View style={{flex:1, borderWidth: 1, borderColor: '#DDDDDD'}}>
            <FlatList
              data={this.state.LikesFiltered}
              keyExtractor={(item)=> item.key}
              renderItem={({item})=>
                <Card style={{backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', borderRadius: 0}} onPress={this.getActividad.bind(this,item)}>
                  <View style= {{flex: 1, flexDirection:'row', padding: 5, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 13, fontFamily: 'Ubuntu-Regular', marginRight: 6, fontWeight: 'bold'}}>{item.Titulo}</Text>
                  </View>

                  <View style= {{flex: 1, flexDirection:'row', padding: 6, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 13, fontFamily: 'Ubuntu-Regular'}}>{item.Fecha}</Text>
                    <Text style={{flex: 2, fontSize: 13, textAlign: 'left', paddingRight: 6, marginLeft: 23, fontFamily: 'Ubuntu-Regular'}}>{`${item.Curso} ${item.Materia}`}</Text> 
                  </View>
                </Card>
              }
              //keyExtractor={item=>item.ID}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  inputsearch: {
    marginTop: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
    //justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#6EB2E1',
    borderColor: '#6EB2E1',
    borderWidth: 1,
    borderRadius: 3,
    width: '94%',
    height: windowHeight / 17,
    //padding: 8,
    //fontSize: 19
  },
  buscar: {
    flex: 1,
    fontSize: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 280,
    paddingTop: 0,
    paddingBottom: 0
    //height: 25
  },
  filtros:{
    marginTop: 6,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    width: '94%',
    height: windowHeight / 17,
    padding: 8,
    backgroundColor: '#6EB2E1',
    borderColor: '#6EB2E1',
    flexDirection: 'row'
  },
  iconofiltros: {
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: 'black',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
  },
  Btnaplicar: {
    marginTop: 5,
    marginLeft: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    width: 51,
    backgroundColor: '#1C355E',
    borderRadius: 16,
    height: 20,
  },
  BtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    //fontFamily: 'SourceSansPro_400Regular'
  },
  ContainerActTips: {
    flex: 1,
    marginTop: 6,
    marginLeft: 12,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 4,
    width: '93%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.80,
    elevation: 5,
  }
});



export default LikesScreen;
