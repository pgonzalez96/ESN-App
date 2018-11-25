import React from 'react';
import * as firebase from 'firebase';
import {ListItem} from 'react-native-elements';
import {Text, StyleSheet} from 'react-native';

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

        this.onEventPressed = this.onEventPressed.bind(this)


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

     onEventPressed(name) {
         this.props.screenProps.rootNavigation.navigate('EventInfo',
             {
                 nameEvent: name,
             });
     }


    render() {
        if (this.state.loading) {
            return <Text>Loading...</Text>
        }
        return (
            events.map((e) => (
                        <ListItem
                            key={e.name}
                            title={e.name}
                            subtitle={e.date}
                            onPress={() => this.onEventPressed(e.name)}
                        />
            ))

        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#0d47a1',
        marginTop: 15,
        padding: 20,
        borderRadius: 25,
        margin: 40,

    }

});





