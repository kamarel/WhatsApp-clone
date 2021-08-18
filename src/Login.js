import React, {useStateValue} from './StateProvider'
import "./Login.css"
import {Button} from "@material-ui/core"
import {auth, provider} from "./Firebase"
import { actionTypes } from './reducer'


const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {

        auth.signInWithPopup(provider)
        .then((result)=> {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error)=> alert(error.message))
    }

    return (
        <div className="login">
            <div className="login-container">
            <img
                src="http://lofrev.net/wp-content/photos/2016/06/whatsApp-logo-1.png " style={{height:"200px", width:"200px"}} alt=""
            />
            <div className="login-text">
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button  onClick={signIn}>
                Sign In With Google
            </Button>
            </div>
        </div>
    )
}

export default Login
