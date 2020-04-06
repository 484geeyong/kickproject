import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';


export default class MainScreen extends Component{
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.logout}>
                    <TouchableOpacity >
                        <AntDesign name="logout" color="white" size={30}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.Text}>로그아웃</Text>
                <View>
                    <MaterialIcons name="payment" color="white" size={50}/>
                </View>
            </View>

            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#36485f',
    },
    logout:{
        position: 'absolute',
        right:15,
        top: 50,
    },
    Text:{
        position: 'absolute',
        right: 5,
        top: 90,
        color: 'white',
    }
});
