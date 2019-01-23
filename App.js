/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LoginScreen from "./screens/login";
import ForgetPasswordScreen from "./screens/forget-password";
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  ForgetPassword: {screen: ForgetPasswordScreen},
});
const App = createAppContainer(MainNavigator);

export default App;
