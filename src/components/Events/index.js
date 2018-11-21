import React from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';


export default class Events extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {}
    };


    render() {
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



