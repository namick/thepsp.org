import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/functions'
import { CssBaseline } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@material-ui/styles'
import { CookiesProvider } from 'react-cookie'
import { SnackbarProvider } from 'notistack'
import * as env from 'env-var'

import App from './App'
import { FirebaseProvider } from './utilities/firebase'
import theme from './utilities/theme'
import firebaseConfig from './.firebaseConfig'

firebase.initializeApp(firebaseConfig)
firebase.firestore().enablePersistence()

if (env.get('REACT_APP_FIREBASE_FUNCTIONS_EMULATOR').asBool()) {
  console.log('Using local functions emulator')
  firebase.functions().useFunctionsEmulator('http://localhost:5001')
}

const notistackRef = React.createRef()
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key)
}

ReactDOM.render(
  <CookiesProvider>
    <FirebaseProvider value={firebase}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          preventDuplicate
          ref={notistackRef}
          action={key => <Button onClick={onClickDismiss(key)}>Dismiss</Button>}>
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </FirebaseProvider>
  </CookiesProvider>,
  document.getElementById('root')
)
