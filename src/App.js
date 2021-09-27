import React, { Component } from "react";
import "./styles.css";

import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

import { auth } from './firebase/firebase.utils'

import SignIn from './pages/Signin'
import Main from "./pages/Main";


class App extends Component {

  componentDidMount() {
    const { setCurrentUser } = this.props

    auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      console.log(user)
    })
  }

  render() {
    return (
      <div className="App">
        {this.props.currentUser ?
          <Main currentUser={this.props.currentUser} />
          :
          <SignIn />
        }

      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)