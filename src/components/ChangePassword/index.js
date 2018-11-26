import React from 'react';
import * as firebase from 'firebase';
import {Text, StyleSheet, View, TouchableOpacity, Alert, TextInput} from 'react-native';
import {Icon, Header, Container, Left} from 'native-base'


export default class ChangePassword extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPassword2: ''
        }
        this.onButtonPressed = this.onButtonPressed.bind(this);
        this.onIconPressed = this.onIconPressed.bind(this);


    };

    onIconPressed() {
        this.props.navigation.openDrawer();
    }


    onButtonPressed() {
        firebase.auth().currentUser.reauthenticateWithCredential(
            firebase.auth.EmailAuthProvider.credential(
                firebase.auth().currentUser.email,
                this.state.oldPassword
            )
        );
        if (this.state.password !== this.state.password2) {
            Alert.alert('Error','Passwords are not equals.');
        }
        else {
            let user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(function() {
                console.log("password updated succesfully")
            }).catch(function(error) {
                console.log(error)
            })
        }
    }






    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <Icon name="ios-menu" onPress={this.onIconPressed}
                              style={styles.icon}
                        />
                    </Left>
                </Header>
                <View style={styles.container}>
                    <TextInput  style={styles.inputs}
                                placeholder="Old password"
                                onChangeText={(oldPassword) => this.setState({oldPassword})}
                                secureTextEntry={true}
                    />
                    <TextInput  style={styles.inputs}
                                placeholder="New password"
                                onChangeText={(newPassword) => this.setState({newPassword})}
                                secureTextEntry={true}
                    />
                    <TextInput  style={styles.inputs}
                                placeholder="Confirm new password"
                                onChangeText={(newPassword2) => this.setState({newPassword2})}
                                secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onButtonPressed}
                    >
                        <Text style={{color: '#fff', fontSize: 25}}>Change Password</Text>
                    </TouchableOpacity>
                </View>


            </Container>
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
    icon: {
        position: 'absolute',
        backgroundColor: '#8e8e8e',
        left: 0,
        right: 0,
        bottom: -23

    },
    header: {
        backgroundColor: '#8e8e8e',
        justifyContent: 'flex-start',

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