import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity} from 'react-native';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            email2: '',
            password: '',
            password2: ''
        }
    };

    onButtonPressed() {
        if (this.state.name === '' || this.state.surname === '' || this.state.email === '' || this.state.email2 === '' || this.state.password === '' || this.state.password2 === '') {
            Alert.alert('You must enter all the fields')
        }
        else if (this.state.email !== this.state.email2) {
            Alert.alert('E-mails are not equal')
        }
        else if (this.state.password !== this.state.password2) {
            Alert.alert('Passwords are not equal')
        }
        else {
            this.props.navigation.navigate('Login')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput  style={styles.inputs}
                            placeholder="Name"
                            onChangeText={(name) => this.setState({name})}/>
                <TextInput  style={styles.inputs}
                            placeholder="Surname"
                            onChangeText={(surname) => this.setState({surname})}/>
                <TextInput  style={styles.inputs}
                            placeholder="E-mail"
                            onChangeText={(email) => this.setState({email})}/>
                <TextInput  style={styles.inputs}
                            placeholder="Confirm e-mail"
                            onChangeText={(email2) => this.setState({email2})}/>
                <TextInput  style={styles.inputs}
                            placeholder="Password"
                            onChangeText={(password) => this.setState({password})}/>
                <TextInput  style={styles.inputs}
                            placeholder="Confirm password"
                            onChangeText={(password2) => this.setState({password2})}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onButtonPressed.bind(this)}
                >
                    <Text style={{color: '#fff', fontSize: 25}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 35,
        alignSelf: 'center',
        marginTop: 10,
    },

    inputs: {
        height: 40,
        fontSize: 25,
        marginTop: 12,
        marginLeft: 5,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0d47a1',
        marginTop: 15,
        padding: 20,
        borderRadius: 25,
        margin: 40,

    }

});

