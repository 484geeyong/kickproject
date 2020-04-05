import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image } from 'react-native';


 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 
import Loginscreen from './src/Loginscreen';
import Signup from './src/Signup';

const AuthStack = createStackNavigator();
export default () =>(
  <NavigationContainer>
    <AuthStack.Navigator>
      <AuthStack.Screen name="Loginscreen" component={Loginscreen} options= {{title: " "}}/>
      <AuthStack.Screen name="Signup" component={Signup} options= {{title: "회원가입"}}/>
    </AuthStack.Navigator>
  </NavigationContainer>
);

 