import React, {useState, setState} from 'react';
import {Text, Alert, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LikeButton = ({Key, titulo, video, descripcionActividad, descripcionVideo, fecha, curso, materia, actividadPDF}) => {

    const [state, setState] = useState('');
    var user = auth().currentUser;

    database()
      .ref('/Users/' + user.uid + '/Likes/')
      .orderByChild('Actividad')
      .equalTo(titulo)
      .on('value', function(snapshot) {
        if(snapshot.val() == null){
            setState(true);
        }else{
            setState(false)
        }
      })

    const Like = () => {
      setState(!state);
      alert('Haz agregado esta actividad a tus favoritos! Encuentralos en la sección de Más.');
      database()
        .ref('/Users/' + user.uid + '/Likes/' + Key)
        .set({
          Actividad: titulo,
          DescripcionVideo: descripcionVideo,
          Video: video,
          DescripcionActividad: descripcionActividad,
          ActividadPDF: actividadPDF,
          Fecha: fecha,
          Curso: curso,
          Materia: materia
        })
    };

    const Dislike = () => {
      setState(!state);
      alert('Haz eliminado esta actividad de tus favoritos!')
      database()
        .ref('/Users/' + user.uid + '/Likes/' + Key)
        .remove()
    };

    if(state == true) {
      return(
        <TouchableOpacity onPress={() => Like()}>
          <MaterialIcons name='favorite-outline' size={22} color='red'/>
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity  onPress={() => Dislike()}>
          <MaterialIcons name='favorite' size={22} color='red'/>
        </TouchableOpacity>
      );
    }
};

export default LikeButton;