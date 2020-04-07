import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image } from 'react-native';

import * as firebase from 'firebase';
import '@firebase/firestore';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 
import Loginscreen from './src/Loginscreen';
import Signup from './src/Signup';
import MainScreen from './src/MainScreen';

const AuthStack = createStackNavigator();
export default () =>(
  <NavigationContainer>
    <AuthStack.Navigator>
    <AuthStack.Screen name="MainScreen" component={MainScreen} options= {{headerShown: false}}/>
      <AuthStack.Screen name="Loginscreen" component={Loginscreen} options= {{ headerShown: false}}/>
      <AuthStack.Screen name="Signup" component={Signup} options= {{ headerShown: false}}/>
      
    </AuthStack.Navigator>
  </NavigationContainer>
);

var firebaseConfig = {
  apiKey: "AIzaSyBmNYJoFofkqxge-28EsHW9bAeFwoHanEg",
  authDomain: "kickproject-3908e.firebaseapp.com",
  databaseURL: "https://kickproject-3908e.firebaseio.com",
  projectId: "kickproject-3908e",
  storageBucket: "kickproject-3908e.appspot.com",
  messagingSenderId: "244147540827",
  appId: "1:244147540827:web:29b00139f73d38a30f007e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


 