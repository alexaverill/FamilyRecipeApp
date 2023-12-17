import classes from './Login.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {signIn } from 'aws-amplify/auth'
import { TextField } from '@mui/material';
import {Button} from '@mui/material';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username)
        signIn({
            username,
            password,
            options: {
                authFlowType: 'USER_PASSWORD_AUTH' 
            }
          }).then((result) => {
            console.log(result);
            navigate("/");
            
        }).catch((err) => {
            setLoginError(true);
            console.log(err);
            // Something is Wrong
        })
    }
    return( 
        <div className='content'>
            <div className={classes.loginForm}>
            <div className={classes.loginRow}><span>Username:</span> <TextField onChange={(e)=>setUsername(e.target.value)} size='small'/></div>
            <div className={classes.loginRow}><span>Password:</span><TextField onChange={(e)=>setPassword(e.target.value)} size='small' type="password"/></div>
            <Button variant="contained" onClick={handleSubmit} className='recipeLinkButton'>Login</Button>
            {loginError? <h1>Invalid Login, please try again</h1>:<></>}
            </div>
        </div>
    )
}