import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import * as firebase from 'firebase';
import FooterButton from './components/FooterButton';
import Toast from 'react-native-easy-toast';
import '@firebase/firestore';

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('user')
        this.state={
            email: '이메일',
            StudentId:'학번', 
            password:'비밀번호',
                    
        }
        
    }
    handleSignUp = () => {
        const {navigation} = this.props;
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=> navigation.push('Loginscreen'),this.ref.add({id:this.state.StudentId}))
        .catch(() => this.refs.toast.show('이메일 형식을 확인해주세요. \n비밀번호는 6자 이상이어야 합니다.',1000));
    }
    render(){
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.swicthText}>한국외대 킥보드 공유어플{"\n"}계정 만들기</Text>
                <TextInput
                style={styles.TextInputButton}
                onChangeText={(email)=> this.setState({email})}
                placeholder={this.state.email}
                placeholderTextColor='white' 
                autoCorrect={false} />
                <TextInput
                style={styles.TextInputButton}
                onChangeText={(StudentId)=> this.setState({StudentId})}
                placeholder={this.state.StudentId}
                placeholderTextColor='white' 
                autoCorrect={false} />
                <TextInput
                style={styles.TextInputButton}
                onChangeText={(password)=> this.setState({password})}
                placeholder={this.state.password}
                placeholderTextColor='white' 
                autoCorrect={false}
                secureTextEntry={true} />
                <Text style={styles.descriptionText}>회원가입 시 이용약관에 동의한 것으로 간주합니다.</Text>
                <FooterButton
                    style={styles.signupButton}
                    onPress={this.handleSignUp}
                    buttonText="회원가입"
                    
                    />
                    <Toast ref = "toast"/>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36485f',
       
    },
    swicthText: {
        fontSize: 16,
        marginTop: 41,
        textAlign: 'center',
        marginBottom: 115,
        color: 'white',
    },
    TextInputButton:{
        width: 288,
        borderColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 2,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#199187',
    },
    descriptionText:{
        marginTop:20,
        fontSize: 12,
        color: 'white',
        fontWeight: '200',
    },
    signupButton:{
        marginTop: 67.5,

    }
});