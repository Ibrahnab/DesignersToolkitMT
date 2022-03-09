import React, {useState, useEffect} from 'react';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {UsernameTextField} from './UsernameTextField';
import {PasswordTextField} from './PasswordTextField';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Meteor } from 'meteor/meteor';

export const AccountSide = () => {
  
    const [login, setState] = useState(false);

    //createAccount.func(login);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
    };

    return(
        <form onSubmit={submit} className="login-form">
    <div>
        <Container>
            <div className="row d-flex justify-content-center flex-nowrap">
                <Col md="auto">
                    <p className ="dashboardHeader">Create or select a project</p>
                </Col>
            </div>
            <div className="row d-flex justify-content-center flex-nowrap dashboardDivMargin">
                <Col md="auto">
                    <p className ='dashboardStandardText'>You are not signed in, if you want to create projects, please sign in or create a new account</p>
                </Col>
            </div>
            
            <Row>
                <Col>
                
                <Box
                 
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                margin="auto"
                width="240px"
                >
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e => setUsername(e.target.value)}/>
                </Box>

                </Col>
            </Row>
            <Row>
                <Col>
                    
                    <Box
                   
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    width="240px"
                    margin="auto"
                    >
                        <TextField type="password" id="outlined-basic" label="Password" variant="outlined" onChange={e => setPassword(e.target.value)}/>
                    </Box>

                </Col>
            </Row>
            
            <div className="row d-flex justify-content-center flex-nowrap">
                <Col md='auto'>
                <button className="dashboardSignInButton"><p className="buttonText">Sign In</p></button>
                </Col>
            </div>
            <div className="dashboardHL"></div>
            <div className="row d-flex justify-content-center flex-nowrap textTopMargin">
                <Col>
                    <p className="dashboardStandardText paragraph">Don’t have an account? Create a new one here</p>
                </Col>
            </div>
            <div className="row d-flex justify-content-center flex-nowrap">
                <Col md='auto'>
                    <button className="dashboardCreateAccountButton"><p className="buttonText">Create New Account</p></button>
                </Col>
            </div>
        </Container>
        
    </div>
    </form>
    )
}; 