import React, { Component } from 'react'

import { signInWithGoogle } from '../firebase/firebase.utils'

import { Form, Input, Button, Container, Label, Row } from 'reactstrap'

export default class SignIn extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        return (
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: 30,
                }}
            >
                <h4>Personal Income Tax Calculator</h4>


                <Row
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}
                    onClick={signInWithGoogle}>
                    <p style={styles.text}>Sign in with Google</p>
                    <ion-icon style={styles.icon} name="logo-google"></ion-icon>
                </Row>
            </Container>

        )
    }
}

const styles = {
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