import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBYrIABkFQh7pj3Gtdk2y9SGqjunNG9AlA",
    authDomain: "huwngnosleeppp.firebaseapp.com",
    projectId: "huwngnosleeppp",
    storageBucket: "huwngnosleeppp.appspot.com",
    messagingSenderId: "533381222168",
    appId: "1:533381222168:web:fa9a112734c4810710186d"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase