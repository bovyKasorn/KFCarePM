import React from 'react'
import { AppRegistry } from 'react-native'
import { ThemeProvider } from 'styled-components'
import App from './App'
import { name as appName } from './app.json'
import mainTheme from './theme'

const AppWithTheme = () => (
  <ThemeProvider theme={mainTheme}>
    <App />
  </ThemeProvider>
)

AppRegistry.registerComponent(appName, () => AppWithTheme)
