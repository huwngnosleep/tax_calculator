import React from 'react'

import { signInWithGoogle } from '../firebase/firebase.utils'

const SignInWithGoogle = () => {
    return(
        <div style={styles.wrapper} onClick={signInWithGoogle}>
            <p style={styles.text}>Sign in with Google</p> 
            <ion-icon style={styles.icon} name="logo-google"></ion-icon>
        </div>
    )
}

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        margin: '0 5px',
    },
    icon: {
        height: '1.5rem',
        width: '1.2rem',
        margin: '0 5px',
    }

}

export default SignInWithGoogle