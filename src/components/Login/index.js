import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';

export default class Login extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    };

    onButtonPressed() {
        this.props.navigation.navigate('SignUp')
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
                            onChangeText={(password) => this.setState({password})}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onButtonPressed.bind(this)}
                >
                    <Text style={{color: '#fff', fontSize: 20}}>Sign in</Text>
                </TouchableOpacity>
                <Text style ={styles.text}>If you don't have an account,
                    <Text
                        onPress={() => this.props.navigation.navigate('SignUp')}
                        style={styles.signup}>Sign up</Text>
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

