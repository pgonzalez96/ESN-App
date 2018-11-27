import React from 'react';
import * as firebase from 'firebase';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';

export default class Login extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            response: ''
        }
        this.Login = this.Login.bind(this)
        this.onButtonPressed = this.onButtonPressed.bind(this)
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'MainView' : 'Login')
        })
    }

    async Login() {
        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            this.props.navigation.navigate('MainView')
        } catch(error) {
            this.setState({
                response: error.toString()
            })
            Alert.alert('Error', this.state.response)
        }
    }

    onButtonPressed() {
        this.Login()

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ESN app</Text>
                <Image source={require('../../img/esn.png')}/>
                <TextInput  style={{height: 50, fontSize: 30}}
                            placeholder="E-mail"
                            onChangeText={(email) => this.setState({email})}/>
                <TextInput  style={{height: 50, fontSize: 30}}
                            placeholder="Password"
                            onChangeText={(password) => this.setState({password})}
                            secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onButtonPressed.bind(this)}
                >
                    <Text style={{color: '#fff', fontSize: 20}}>Sign in</Text>
                </TouchableOpacity>
                <Text
                    onPress={() => this.props.navigation.navigate('RecoveryPassword')}
                    style={styles.signup}> Forgotten password?</Text>
                <Text style ={styles.text}>If you don't have an account,
                    <Text
                        onPress={() => this.props.navigation.navigate('SignUp')}
                        style={styles.signup}> Sign up</Text>
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
    },
    text: {
        color: '#90a4ae',
        marginTop: 30,
        fontSize: 17

    },
    signup: {
        color: '#212121',
        textDecorationLine: 'underline'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0d47a1',
        marginTop: 15,
        padding: 10,
        borderRadius: 20,
    },
});

