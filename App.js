import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Firebase from './src/api';
import * as firebase from 'firebase'

export default class App extends React.Component {

    constructor(props) {
        super(props)
        Firebase.init()
        this.state = {
            initialView: null,
            userLoaded: false
        }

        this.getInitialView = this.getInitialView.bind(this)
    }

    getInitialView() {
        firebase.auth().onAuthStateChanged((user) => {
            let initialView = user ? 'Signup' : 'Login'
            this.setState({
                userLoaded: true,
                initialView
            })
        })
    }

    render() {
        if (!this.state.userLoaded) {
            return (
                <AppStackNavigator/>
            );
        }

        else {
            return null
        }

  }
}

const AppStackNavigator = createStackNavigator({
    Login: Login,
    SignUp: SignUp

})

