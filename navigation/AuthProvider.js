import React, {createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin'; 

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider 
          value={{
            user, 
            setUser, 
            login: async (email, password) => {
              try {
                await auth().signInWithEmailAndPassword(email, password);
              } catch(e) {
                console.log(e);
              }
            },
            googleLogin: async () => {
              try {
                const { idToken } = await GoogleSignin.signIn();

                // Create a Google credential with the token
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                // Sign-in the user with the credential
                await auth().signInWithCredential(googleCredential);
              } catch(e) {
                console.log(e);
              }
            },
            register: async (email, password) => {
              try {
                await auth().createUserWithEmailAndPassword(email, password);
              } catch(e) {
                console.log(e);
                if(e=="Error: [auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]") {
                  alert('Contraseña inválida: debe tener al menos 6 caracteres.')
                }
                if (e=="Error: [auth/email-already-in-use] The email address is already in use by another account.") {
                  alert('Ya tiene una cuenta creada con este email.')
                }
              } 
            },
            logout: async () => {
              try {
                await auth().signOut();
              } catch(e) {
                console.log(e);
              }
            } 
          }}
        >
            {children}
        </AuthContext.Provider>
    );
};