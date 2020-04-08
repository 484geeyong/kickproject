import React, {Component} from 'react';
import {View, Text, StyleSheet,Alert,Image} from 'react-native';
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
    constructor(props) {
        super(props);
        this.ref=firebase.firestore().collection('user');
        this.state = {
            isSwitchTurnOn: true,
            weatherIcon: "",
            weatherText: "",
            temperature: null,
            location: null,
            getdata1: null,
        };
    }
    
    componentDidMount(){
        this.getLocatin();
        const self=this;
        var hufs;
        var gee = firebase.firestore().collection('user').doc('kick');
       
        gee.get().then(function(doc){
            if(doc.exists){
                self.setState({getdata1:doc.data().brow })
                
            }else{
              console.log("No");  
            }
        }).catch(function(error){
            console.log("err",error);
        });
       
       
    }
    
    
    getdata=()=>{
       
    }
     
    handleSignOut = () =>{
    const {navigation} = this.props;
    firebase
        .auth()
        .signOut()
        .then(() => navigation.push('Loginscreen'))
        .catch(()=> this.refs.toast.show('오류가 발생했습니다. 다시 시도해 주세요',1000));
    }
    handleBw =()=>{
    firebase.firestore()
        .collection('user')
        .doc('kick')
        .update({
            brow: 0,
        })
        .then(()=>{
            console.log('update!');
            
        });
    }
    handleRe =()=>{
        firebase.firestore()
            .collection('user')
            .doc('kick')
            .update({
                brow: 1,
            })
            .then(()=>{
                console.log('update!');
            });
        }
    
    render(){
        const{temp,name}=this.state;
        const {navigation} = this.props;
        
        return (
            
            <View style={styles.container}>
                <View style={styles.logout}>
                    <TouchableOpacity 
                        onPress={this.handleSignOut}>
                        <AntDesign name="logout" color="white" size={30}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.bw}>
                    <TouchableOpacity
                        onPress={this.handleBw}>

                        
                        <AntDesign name="clockcircle" color="white" size={45}/>
                    </TouchableOpacity>
                    <Text style={styles.Ts}>대여{this.state.getdata1}</Text>
                </View>

                <View style={styles.re}>
                    <TouchableOpacity
                        onPress={this.handleRe}>
                        <AntDesign name="clockcircleo" color="white" size={45}/>
                    </TouchableOpacity>
                    <Text style={styles.Ts}>반납{this.brow}</Text>
                </View>

                <View style={styles.WBox}>
                <WeatherBox 
                        temperature={Math.round(temp)}
                        weather={name}
                        location=" 현재의 온도 "
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

    },
    bw: {
        position: 'absolute',
        top: 250,
    },
    re:{
        position: 'absolute',
        top: 250,
        right: 130,
    },
    Ts:{
        fontSize: 16,
        color: 'white',
        right: -8,

    }
});