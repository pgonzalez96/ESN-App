import React from 'react';
import * as firebase from 'firebase';
import {StyleSheet, Text, View} from 'react-native';
import {MapView} from 'react-native-maps';
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
            lng: '',
        }

        this.onAddressClicked = this.onAddressClicked.bind(this)
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
            Geocoder.from(this.state.address + " " + this.state.city)
                .then(json => {
                    let lat = json.results[0].geometry.location.lat;
                    let lng = json.results[0].geometry.location.lng;
                    this.setState({
                        lat: lat,
                        lng: lng
                    })
                }).catch(error => console.warn(error))
        })
    }

    onAddressClicked() {
        this.props.navigation.navigate('Maps',
            {
                lat: this.state.lat,
                lng: this.state.lng
            });
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
                <Text
                    onPress={this.onAddressClicked}
                    style={styles.address}>Look for the address in the map</Text>
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

    address: {
        color: '#212121',
        textDecorationLine: 'underline'
    },


});



