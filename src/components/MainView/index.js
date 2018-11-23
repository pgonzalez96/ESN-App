import React from 'react';
import {StyleSheet} from 'react-native';
import * as DrawerNavigator from 'react-navigation';
import Events from '../Events';
import EventInfo from '../EventInfo';
import * as firebase from "firebase";


export default class MainView extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {}
    };

    /*componentDidMount() {
        const { currentUser } = firebase.auth()
        console.log(currentUser)
    }*/


    render() {
        return (
            <MyApp screenProps={{ rootNavigation: this.props.navigation }}/>
        );
    }
}

const MyApp = DrawerNavigator.createDrawerNavigator({

    Home: {
        screen: Events
    },

    Settings: {
      screen: EventInfo
    }
})





