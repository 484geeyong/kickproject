import React, {Component} from 'react';
import {View, Text, StyleSheet,Alert,Image,button,alert,Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-easy-toast';
import WeatherBox from './components/WeatherBox';
import '@firebase/firestore';
import * as Location from 'expo-location';
import axios from "axios";
import FooterButton from './components/FooterButton'
const API_KEY ="f80cd96fc7a28094aa070080d3c5a57b";

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
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
            show:true,
            showre:true,
        };
        
    }
    
    componentDidMount(){
        this.getLocatin();
        this.refreshScreen();

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
   
        console.log(this.state.getdata1);
        if(this.state.getdata1==1){
        this.refs.toast.show('비밀번호는 0000입니다.',1000);
        firebase.firestore()
        .collection('user')
        .doc('kick')
        .update({
            brow: 0,
        })
        .then(()=>{
            this.refreshScreen();
        });
        }
        else if(this.state.getdata1==0){
            this.refs.toast.show('이미 사용중입니다.',1000);
        }
        
    }
    handleRe =()=>{
        this.refreshScreen();
        console.log(this.state.getdata1);
        if(this.state.getdata1==0){
        this.refs.toast.show('반납성공!',1000);
        firebase.firestore()
            .collection('user')
            .doc('kick')
            .update({
                brow: 1,
            })
            .then(()=>{
                this.refreshScreen();
            });
        }
        else if(this.state.getdata1==1){
            this.refs.toast.show('대여한 킥보드가 없습니다.',1000);
        }
        
        this.refreshScreen();
        }
    refreshScreen = ()=>{
        this.setState(previousState=>({show: !previousState.show}))
        this.setState(previousState =>({showre: !previousState.showre}))
        const self=this;
        var gee = firebase.firestore().collection('user').doc('kick');
       
        gee.get().then(function(doc){//대여반납 파이어베이스에...
            if(doc.exists){
                self.setState({getdata1:doc.data().brow })
            }else{
              console.log("No");  
            }
        }).catch(function(error){
            console.log("err",error);
        })
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
                <View style={styles.reload}>
                    <FooterButton  buttonText="대여하기 / 반납하기"
                    style={styles.loginButton}
                    onPress={this.refreshScreen}>
        
                    /</FooterButton>
                </View>
                
                <Image style={styles.img}
                        source={
                            this.state.getdata1
                            ? require('./ok.png')
                            : require('./no.png')
                        }style={styles.icon}/>
                {
                    this.state.show 
                    ? 
                    <View style={styles.bw}>
                    <TouchableOpacity
                        onPress={this.handleBw}>
                        <AntDesign name="clockcircle" color="white" size={45}/>
                    </TouchableOpacity>
                    <Text style={styles.Ts}>대여</Text>
                </View>
                    : 
                    null
                }
                {
                    this.state.showre
                    ?
                    <View style={styles.re}>
                    <TouchableOpacity
                        onPress={this.handleRe}>
                        <AntDesign name="clockcircleo" color="white" size={45}/>
                    </TouchableOpacity>
                    <Text style={styles.Ts}>반납{this.brow}</Text>
                </View>
                    :
                    null
                }
                <View style={styles.webview}>
                    <TouchableOpacity
                        onPress={()=> navigation.push("NewWebview")}>
                        <AntDesign name="iconfontdesktop" color="white" size={40}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.Ewebview}>
                    <TouchableOpacity
                        onPress={()=> navigation.push("eclassWebview")}>
                        <AntDesign name="earth" color="white" size={35}/>
                    </TouchableOpacity>
                </View>
               

                <View style={styles.WBox}>
                <WeatherBox 
                        temperature={Math.round(temp)}
                        weather={name}
                        location=" 현재의 온도 "
                    />
                </View>
                <Text style={styles.Text}>로그아웃</Text>
                <Text style={styles.WebText}>도서관 좌석현황</Text>
                <Text style={styles.eclass}>eclass</Text>
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
        bottom: 55
    },
    Text:{
        position: 'absolute',
        right: 10,
        bottom: 35,
        color: 'white',
    },
    WebText:{
        position: 'absolute',
        left: 10,
        bottom: 35,
        color: 'white',
    },
    eclass:{
        position: 'absolute',
        
        bottom: 35,
        color: 'white',
    },
    WBox:{
        position: 'absolute',
        top: 60,

    },
    bw: {
        position: 'absolute',
        bottom: 200,
        left: 100,

    },
    re:{
        position: 'absolute',
        bottom: 200,
        right: 100,
    },
    Ts:{
        fontSize: 16,
        color: 'white',
        right: -8,

    },
    reload:{
        
        position: 'absolute',
        bottom: 530,
        //left: 30,

    },
    bar:{
        fontSize: 16,
        color: 'white',
        left: 70,
        bottom: 40
    },
    icon: {
        top: 35,
        left: 10
    },
    webview:{
        position: 'absolute',
        left:35,
        bottom: 50
    },
    Ewebview:{
        position: 'absolute',
        bottom: 50,
    
    }
    
});