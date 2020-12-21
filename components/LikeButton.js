import React, {useState, setState} from 'react';
import {Text, Alert, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Todo este archivo es para el boton de Like que va en ActividadDetails. 
//Eran muchas funciones y caracteristicas que le queria poner, entonces enves de poner todo en el AcitividadDetails y hacerlo larigismo, lo hice aca y de ahi en ActividadDetails puedes ver como lo incluyo.

const LikeButton = ({Key, titulo, video, descripcionActividad, descripcionVideo, fecha, curso, materia, actividadPDF}) => {

    const [state, setState] = useState('');
    var user = auth().currentUser;

    //Paso1
    //lo que pasa aca esque, snapshot.key es la llave, osea 0, 1 o 2.. la "llave" que hice que coincidiera con el numero de la actividad para que sea todo mas facil. 
    //snapshot.val() es lo que esta dentro de esa llave, los valores de esa llave. que seria lo de Actividad, DescripcionVideo, etc. Entonces si no hay nada
    //significa que esa actividad no esta likeada todavia y ahi el state es true y si hay algo, es porque esta likeada ya y el state es false.
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

    //Paso3
    //Aqui van las funciones Like() y Dislike() que se usan en las condicionales de mas abajo.
    //Es bastante obvio los nombres, y poder identificar que es lo que va hacer cada funcion.
    //El Like, primero va cambiar el state para que se ponga en flaso y asi se rellena el corazon al momento de apretar el boton de me gusta.
    //Ademas de rellenarlo, Va apretar el alert cuando uno lo apreta que te avisa lo que escribi ahi.
    //Lo que pasa en el realtime database es que en la cosa creada de cada usuario, va aparecer una seccion de Likes y dentro del Like, si es que le gusta la actividad 0 va aparecer la llave 0
    //y dentro de ésta va estar Actividad, DescripcionVideo, etc.. Que son cosas pasadas desde la ActividadDetails.
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

    //Aqui en el Dislike es llamado cuando uno apreta el corazon que esta relleno, como para sacar el like y se vuelve vacio el corazon.
    //Por eso se cambia el state, se pone true para que el corazon sea vacio. 
    //Ademas de esto, en el realtime Database, se va borrar esa actividad de los likes cuando se apreta el corazon.
    const Dislike = () => {
      setState(!state);
      alert('Haz eliminado esta actividad de tus favoritos!')
      database()
        .ref('/Users/' + user.uid + '/Likes/' + Key)
        .remove()
    };

    //Paso2
    //aqui, como ya explique antes, si el state es true, es porque la actividad no esta likeada entonces el boton deberia ser un corazon vacio y si uno lo apreta
    //te lleva a la funcion Like(), que mas arriba explicare
    //si el state es false, la actividad ya es likeada entonces va aparecer en la actividad un corazon relleno. 
    //aqui se pone tood dentro del return, y lo que escribes adentro va ser lo que se va mostrar en la aplicacion dentro del ActivdadDetails. Todo lo otro es como el 
    //"behind the scenes" de las funcionalidades del boton.
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