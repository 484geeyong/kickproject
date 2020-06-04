import React, { Component } from 'react';

import {StyleSheet,View,Text,Image} from 'react-native';
import '@firebase/firestore';

export default class WeatherBox extends Component{
    render(){
        return(
            <View>
                <Image source={require('./WeatherBox.png')}
                style={StyleSheet.weatherBox}
                />
                <Text style={styles.temperatureText}>
                    {this.props.temperature}℃
                </Text>
                <Text style={styles.weatherText}>
                    {this.props.weather}
                </Text> 
                <Text style={styles.locationText}>
                    {this.props.location}
                </Text> 
            </View>
            

        );
    }
}
const styles = StyleSheet.create({
    weatherBox:{
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    temperatureText:{
        position: 'absolute',
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        marginTop: 35,
        right: 30,
    },
    weatherText: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 70,
        right: 30,
    },
    locationText: {
        position: 'absolute',
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        marginTop: 45,
        left: 10,
    },
    weatherIcon: {
        position: 'absolute',
        marginTop: 10,
        left: 5,
        width: 170,
        height: 130,
    },

})