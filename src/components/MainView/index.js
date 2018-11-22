import React from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import * as DrawerNavigator from 'react-navigation';
import Events from '../Events';
import Login from '../Login';
import * as firebase from "firebase";


export default class MainView extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {}
    };

    componentDidMount() {
        const { currentUser } = firebase.auth()
        console.log(currentUser)
    }


    render() {
        return (
            <MyApp/>
        );
    }
}

const MyApp = DrawerNavigator.createDrawerNavigator({

    Home: {
        screen: Events
    },

    Settings: {
      screen: Login
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});



