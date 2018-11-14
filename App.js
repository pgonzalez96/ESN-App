import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';

export default class App extends React.Component {

    render() {
    return (
        <AppStackNavigator/>
    );
  }
}

const AppStackNavigator = createStackNavigator({
    Login: Login,
    SignUp: SignUp

})

