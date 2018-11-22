import React from 'react';
import * as firebase from 'firebase';
import { List, ListItem } from 'react-native-elements';
import {StyleSheet, Text, View} from 'react-native';


export default class EventInfo extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentUser: null
        }

    };


    render() {

        return (

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

});



