import React, {Component} from 'react';
import {View, Text, StyleSheet,Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-easy-toast';
import WeatherBox from './components/WeatherBox';
import '@firebase/firestore';
import * as Location from 'expo-location';
import axios from "axios";


const API_KEY ="f80cd96fc7a28094aa070080d3c5a57b";

export default class MainScreen extends Component{
    getWeather = async(latitude,longitude) => {
        const {data}= await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        this.setState({temp: data.main.temp,name: data.name})
    };
    getLocatin = async()=>{
        try{
           
            await Location.requestPermissionsAsync();
            const {
                coords: {latitude,longitude}
            } = await Location.getCurrentPositionAsync();
            this.getWeather(latitude,longitude)
        }catch(error){
            Alert.alert("Can't find u");
        }
    };
    componentDidMount(){
        this.getLocatin();
    }

    //
    constructor(props) {
        super(props);
        this.state = {
            isSwitchTurnOn: true,
            weatherIcon: "",
            weatherText: "",
            temperature: null,
            location: null,
        };
    }
    
    // handleSwitch = () => {
    //     let URL = this.state.isSwitchTurnOn
    //     ? "http://192.168.4.1/OFF"
    //     : "http://192.168.4.1/ON"
    //     fetch(URL).then(res => console.log(res.json())).catch(err => console.log(err));
    //     this.setState({isSwitchTurnOn: !this.state.isSwitchTurnOn})
    // }
    handleSignOut = () =>{
    const {navigation} = this.props;
    firebase
        .auth()
        .signOut()
        .then(() => navigation.push('Loginscreen'))
        .catch(()=> this.refs.toast.show('오류가 발생했습니다. 다시 시도해 주세요',1000));
}
    render(){
        const{temp,name}=this.state;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.logout}>
                    <TouchableOpacity onPress ={this.handleSignOut}>

                        <AntDesign name="logout" color="white" size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.WBox}>
                <WeatherBox 
                        //weatherIcon={this.state.weatherIcon}
                        temperature={Math.round(temp)}
                        weather={name}
                        location=" 오늘의 온도 "
                    />
                </View>
                <Text style={styles.Text}>로그아웃</Text>
                <View>
                    
                    <MaterialIcons name="payment" color="white" size={50}/>
                </View>
            
                <Toast ref="toast"/>
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
        right:20,
        bottom: 50
    },
    Text:{
        position: 'absolute',
        right: 10,
        bottom: 30,
        color: 'white',
    },
    WBox:{
        position: 'absolute',
        top: 60,
    

    }
});
