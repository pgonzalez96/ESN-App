import React from 'react';
import * as firebase from 'firebase';
import {StyleSheet, Text, View} from 'react-native';
import Geocoder from 'react-native-geocoding';
export default class EventInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            city: '',
            country: '',
            date: '',
            place: '',
            time: '',
            lat: '',
            lng: ''
        }
    };

    componentDidMount() {
        const name = this.props.navigation.getParam('nameEvent', 'NO-Name');
        let rootRef = firebase.database().ref();
        let ref = rootRef.child('events/'+name);
        ref.once('value').then(snapshot => {
            this.setState({
                name: snapshot.val().name,
                address: snapshot.val().address,
                city: snapshot.val().city,
                country: snapshot.val().country,
                date: snapshot.val().date,
                place: snapshot.val().place,
                time: snapshot.val().time
            })
            Geocoder.init('AIzaSyDDIEZf8ns_KZkfcZUwh0R5n5lErf-rk1c'); // use a valid API key

            Geocoder.from(this.state.address + "" + this.state.city)
                .then(json => {
                    //                                                                          var location = json.results[0].geometry.location;
                    console.log(json);
                }).catch(error => console.warn(error));
        })




    }

    render() {

        return (
            <View style={styles.container}>
                <Text>DETAILS:</Text>
                <Text>Name: {this.state.name}</Text>
                <Text>Place: {this.state.place}</Text>
                <Text>Date: {this.state.date}</Text>
                <Text>Time: {this.state.time}</Text>
                <Text>Address: {this.state.address}</Text>
                <Text>City: {this.state.city}</Text>
                <Text>Country: {this.state.country}</Text>
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



