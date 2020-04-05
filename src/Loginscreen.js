import React, {Component} from 'react';
import{StyleSheet,view, Text, View,Image,TextInput, TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import FooterButton from './components/FooterButton'
import { ScreenContainer } from 'react-native-screens';


export default class Loginscreen extends Component{
    
    constructor(props){
        super(props);
        this.state={
            idText: '이메일',
            pwText: '비밀번호',
            id: '',
            pw: '',
        }
    }
    render(){
        const {navigation} = this.props;
        
        return(
            <View style={styles.container}>
              
                <Image source={require('./pin-icons.png')}
                style={styles.icon}/>
                <Text style={styles.welcomtext}>한국외대 교내 킥보드 공유</Text>
                
                <TextInput style={styles.textInputButton}
                onChangeText={(id)=> this.setState({id})}
                placeholder={this.state.idText}
                autoCorrect={false}/>
                <TextInput style={styles.textInputButton}
                onChangeText={(pw)=> this.setState({pw})}
                placeholder={this.state.pwText}
                autoCorrect={false}
                secureTextEntry={true}/>
        
                <FooterButton
                    buttonText="로그인"
                    style={styles.loginButton}
                    onPress={()=> alert("todo!")}
                />
                <Text style={styles.noAccountText}>계정이 없으신가요?</Text>
                <TouchableOpacity
                    onPress={()=> navigation.push("Signup")}>
                <Text style={styles.makeAccountText}>계정 만들기</Text>
                </TouchableOpacity>
        
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0080ff',
    },
    icon: {
        width: 58,
        height: 93,
        marginBottom: 90,
    },
    welcomtext: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 23,
        color: 'white',
    
    },
    textInputButton:{
        width: 288,
        borderColor: 'white',
        paddingVertical: 10,
        borderWidth: 0.3,
        paddingHorizontal: 5,
        borderRadius: 2,
        backgroundColor: 'white',
        height: 50,
    },
    loginButton:{
        width: 315,
        height: 50,
        marginTop: 50,
    },
    noAccountText: {
        marginTop: 30,
        fontSize: 12,
        color: '#5B5A5A',
    },
    makeAccountText: {
        fontSize: 14,
        
        color: 'white',
    },
});