import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert} from 'react-native';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    };

    onPressButton() {
        Alert.alert('Login');

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
                <Button title="Login"
                        color="#1e88e5"
                        onPress={this.onPressButton}
                />
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
});
