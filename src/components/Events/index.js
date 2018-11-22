import React from 'react';
import * as firebase from 'firebase';
import { List, ListItem } from 'react-native-elements';
import {StyleSheet, Text, View} from 'react-native';

let events = [];

export default class Events extends React.Component {

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

    getEvents() {
        let rootRef = firebase.database().ref();
        let ref = rootRef.child('events');
        ref.orderByChild('date').once('value').then(snapshot => {
            snapshot.forEach(function (event) {
                events.push(event.val())
            })
            this.setState({
                loading: false
            })
        })


    }

     componentDidMount() {
        if (events.length === 0) {
            this.getEvents();
        }
        else {
            this.setState({
                loading: false
            })
        }
     }






    render() {
        if (this.state.loading) {
            return <Text>Loading...</Text>
        }
        return (
            <List containerStyle={{marginBottom: 30}}>
                {
                    events.map((e) => (
                        <ListItem
                            key={e.name}
                            title={e.name}
                            subtitle={e.date}
                        />
                    ))
                }
            </List>
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



