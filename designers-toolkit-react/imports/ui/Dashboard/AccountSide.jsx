import React, {useState, useEffect, Fragment} from 'react';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {UsernameTextField} from './UsernameTextField';
import {PasswordTextField} from './PasswordTextField';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TeamsCollection } from '/imports/api/TeamsCollection';

export const AccountSide = () => {
  
    const [createAccountForm, setCreateForm] = useState(false);

    //createAccount.func(login);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageLogin, setErrorMessageLogin] = useState('');

    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password, function(error){
            setErrorMessageLogin(error.reason);
        });
    };
    
    const submitNewAccount = e => {
        e.preventDefault();

        if(newPassword === confirmNewPassword) {
            Accounts.createUser({
                username: newUsername,
                password: newPassword
            }, function(error){
                console.log(error.reason);
                setErrorMessage(error.reason);  
            })
        }
        else{
            setErrorMessage("Password didn't match");
        }
    }

    return(
        
    <div>
        <Container>
            <div className="row d-flex justify-content-center flex-nowrap">
                <Col md="auto">
                    <p className ="dashboardHeader">Create or select a project</p>
                </Col>
            </div>
            {!createAccountForm &&
                <Fragment>
                    <form onSubmit={submit} className="login-form">
                    <div className="row d-flex justify-content-center flex-nowrap dashboardDivMargin">
                        <Col md="auto">
                            <p className ='dashboardStandardText'>You are not signed in, if you want to create projects, please sign in or create a new account</p>
                        </Col>
                    </div>
                    <div className="row d-flex justify-content-center flex-nowrap">
                        <Col md="auto">
                            <p className ='dashboardStandardText error'>{errorMessageLogin}</p>
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
                            <button className="dashboardCreateAccountButton" onClick={() => setCreateForm(true)}><p className="buttonText">Create New Account</p></button>
                        </Col>
                    </div>
                    </form>
                </Fragment>
            }

            {createAccountForm &&
                <Fragment>
                    <form onSubmit={submitNewAccount} className="login-form">
                    <div className="row d-flex justify-content-center flex-nowrap dashboardDivMargin">
                        <Col md="auto">
                            <p className ='dashboardStandardText'>You are not signed in, if you want to create projects, please sign in or create a new account</p>
                        </Col>
                    </div>

                    <div className="row d-flex justify-content-center flex-nowrap">
                        <Col md="auto">
                            <p className ='dashboardStandardText error'>{errorMessage}</p>
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
                                <TextField id="outlined-basic" label="Enter new username" variant="outlined" onChange={e => setNewUsername(e.target.value)}/>
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
                                <TextField type="password" id="outlined-basic" label="Enter new password" variant="outlined" onChange={e => setNewPassword(e.target.value)}/>
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
                                <TextField type="password" id="outlined-basic" label="Confirm new password" variant="outlined" onChange={e => setConfirmNewPassword(e.target.value)}/>
                            </Box>
                        </Col>
                    </Row>

                    <div className="row d-flex justify-content-center flex-nowrap dashboardDivMargin">
                        <Col md='auto'>
                            <button className="dashboardSignInButton"><p className="buttonText">Create</p></button>
                        </Col>
                        <Col md='auto'>
                            <button className="dashboardSignInButton cancel" type="button" onClick={() => setCreateForm(false)}><p className="buttonText cancel">Cancel</p></button>
                        </Col>
                    </div>
                    </form>
                </Fragment>
            }   
        </Container>
        
    </div>
    )
}; 