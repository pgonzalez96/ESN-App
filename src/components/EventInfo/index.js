import React from 'react';
import * as firebase from 'firebase';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MapView} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';


let button, buttonStyle;
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
            button: '',
            buttonStyle: '',
            loading: 0
        }

        this.onAddressClicked = this.onAddressClicked.bind(this);
        this.onButtonPressed = this.onButtonPressed.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    };




    componentDidMount() {
        let name = this.props.navigation.getParam('nameEvent', 'NO-Name');
        const { currentUser } = firebase.auth();
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
        });
        let email = currentUser.providerData[0].email;
        rootRef = firebase.database().ref();
        ref = rootRef.child('users/');
        let exist = 0;
        ref.once('value').then(snapshot => {
            snapshot.forEach(user => {
                if(user.val().email === email) {
                        if (user.val().events) {
                            let us = ref.child(user.key + '/events');
                            us.once('value').then(snapshot => {
                                snapshot.forEach(event => {
                                    if (event.val() === name) {
                                        ++exist;
                                        button = 'Event booked';
                                        buttonStyle = 'buttonBooked';
                                    }
                                });
                                if (exist === 0) {
                                    button = 'Book the event';
                                    buttonStyle = 'buttonNotBooked';
                                }
                                this.setState({
                                    button: button,
                                    buttonStyle: buttonStyle
                                })
                            })
                        }
                        else {
                            button= 'Book the event';
                            buttonStyle= 'buttonNotBooked';
                            this.setState({
                                button: button,
                                buttonStyle: buttonStyle
                            })
                        }
                }


            })
        });


    }

    onAddressClicked() {
        this.props.navigation.navigate('Maps',
            {
                lat: this.state.lat,
                lng: this.state.lng
            });
    }



    onButtonPressed() {
        const { currentUser } = firebase.auth();
        let email = currentUser.providerData[0].email;
        let rootRef = firebase.database().ref();
        let ref = rootRef.child('users/');
        let exist = 0;
        const name = this.state.name;
        ref.once('value').then(snapshot => {
            snapshot.forEach(user => {
                if(user.val().email === email) {
                    if (user.val().events) {
                        let us = ref.child(user.key+'/events');
                        us.once('value').then(snapshot => {
                            snapshot.forEach(event => {
                                if (event.val() === name) {
                                    ++exist;
                                    let eve = us.child(event.key);
                                    eve.remove();
                                    button = 'Book the event';
                                    buttonStyle = 'buttonNotBooked';
                                }
                            });
                            if (exist === 0) {
                                us.push(name);
                                button = 'Event booked';
                                buttonStyle = 'buttonBooked';
                            }
                            this.setState({
                                button: button,
                                buttonStyle: buttonStyle
                            })
                        })
                    }
                    else {
                        button = 'Event booked';
                        buttonStyle = 'buttonBooked';
                        this.setState({
                            button: button,
                            buttonStyle: buttonStyle,
                        });
                        let us = ref.child(user.key+'/events');
                        us.push(name)
                    }
                }

            })
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
                    <TouchableOpacity
                        style={styles[this.state.buttonStyle]}
                        onPress={this.onButtonPressed}
                    >
                        <Text style={{color: '#fff', fontSize: 25}}>{this.state.button}</Text>
                    </TouchableOpacity>
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

    buttonNotBooked: {
        alignItems: 'center',
        backgroundColor: '#0d47a1',
        marginTop: 15,
        padding: 20,
        borderRadius: 25,
        margin: 40,

    },

    buttonBooked: {
        alignItems: 'center',
        backgroundColor: '#0aa114',
        marginTop: 15,
        padding: 20,
        borderRadius: 25,
        margin: 40,

    },


});



