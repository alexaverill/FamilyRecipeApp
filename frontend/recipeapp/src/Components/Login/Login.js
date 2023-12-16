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
            <div>Username: <TextField onChange={(e)=>setUsername(e.target.value)} size='small'/></div>
            <div>Password: <TextField onChange={(e)=>setPassword(e.target.value)} size='small' type="password"/></div>
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    )
}