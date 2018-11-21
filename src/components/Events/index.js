import React from 'react';
import * as firebase from 'firebase';
import {StyleSheet, Text, View} from 'react-native';

let events = [];

export default class Events extends React.Component {

    static navigationOptions = {
        header: null
    }

    getEvents() {
        let rootRef = firebase.database().ref();
        let users = rootRef.child('users');
        let name2;
        users.once('value').then(snapshot => {
            snapshot.forEach(function (event) {
                //console.log(event.val().name);
                name2 = event.val().name;
                console.log(name2);
            })

        })

    }

    constructor(props) {
        super(props);
        this.state = {
            name: []
        }
        this.getEvents();

    };



    render() {
        //this.getEvents()
        return (
            <View style={styles.container}>
                <Text>Events view</Text>
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

});



