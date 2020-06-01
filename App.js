import React, { Component } from 'react';

import * as firebase from 'firebase';
import '@firebase/firestore';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 
import Loginscreen from './src/Loginscreen';
import Signup from './src/Signup';
import MainScreen from './src/MainScreen';
import NewWebview from './src/NewWebview';
import eclassWebview from './src/eclassWebview';

const AuthStack = createStackNavigator();


export default () =>(
  <NavigationContainer>
    <AuthStack.Navigator> 
      <AuthStack.Screen name="Loginscreen" component={Loginscreen} options= {{ headerShown: false}}/>
      <AuthStack.Screen name="Signup" component={Signup} options= {{ headerShown: false}}/>
      <AuthStack.Screen name="MainScreen" component={MainScreen} options= {{headerShown: false}}/> 
      <AuthStack.Screen name="NewWebview" component={NewWebview} options= {{ headerShown: false}}/>
      <AuthStack.Screen name="eclassWebview" component={eclassWebview} options= {{ headerShown: false}}/>
      
      
    </AuthStack.Navigator>
  </NavigationContainer>
);

var firebaseConfig = {
  apiKey: "AIzaSyChruCHF59jwYFTgopy3wTy4ZG615zanPQ",
  authDomain: "moonlit-byway-253404.firebaseapp.com",
  databaseURL: "https://moonlit-byway-253404.firebaseio.com",
  projectId: "moonlit-byway-253404",
  storageBucket: "moonlit-byway-253404.appspot.com",
  messagingSenderId: "531783704118",
  appId: "1:531783704118:web:030639fbeb7247f2078297",
  measurementId: "G-P8XFR4R2WR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 
 