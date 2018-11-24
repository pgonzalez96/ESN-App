import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';



export default class Maps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: '',
            lng: '',
            coord: ''
        }
    };

    componentDidMount() {
        let lat = this.props.navigation.getParam('lat', 'NO-Lat');
        let lng = this.props.navigation.getParam('lng', 'NO-Lng');
        let lat2 = parseFloat(lat)
        let lng2 = parseFloat(lng)
        console.log(lat2)
        console.log(lng2)
        this.setState({
            lat: lat2,
            lng: lng2
        })
        console.log(this.state.lat)
        let coord = {
            lat: this.state.lat,
            lng: this.state.lng
        }
        console.log(coord)
        this.setState({
            coord: coord
        })


    }

    render() {

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: this.state.lat,
                        longitude: this.state.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}/>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }

});



