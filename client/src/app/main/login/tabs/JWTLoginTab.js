import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, InputAdornment, Icon } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import auth0Service from 'app/services/auth0Service';
import { Link } from 'react-router-dom';

function JWTLoginTab(props) {
    const dispatch = useDispatch();
    const login = useSelector(({ auth }) => auth.login);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {

        showDialog();

        auth0Service.onAuthenticated(() => {

            dispatch(Actions.showMessage({ message: 'Logging in with Auth0' }));

            auth0Service.getUserData().then(tokenData => {

                dispatch(authActions.setUserDataAuth0(tokenData));

                dispatch(Actions.showMessage({ message: 'Logged in with Auth0' }));
            });
        });
    }, [dispatch]);

    function showDialog() {
        auth0Service.login();
    }

    useEffect(() => {
        if (login.error && (login.error.email || login.error.password)) {
            formRef.current.updateInputsWithError({
                ...login.error
            });
            disableButton();
        }
    }, [login.error]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        dispatch(authActions.submitLogin(model));
    }

    return (
        <div className="w-full">
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Username/Email"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />


                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="LOG IN"
                    disabled={!isFormValid}
                    value="legacy"
                >
                    Login
                </Button>

                <Divider className="mb-16 w-256" />

                <Button
                    className="w-full my-24"
                    color="primary"
                    variant="contained"
                    onClick={showDialog}
                >
                    Log In/Sign Up with Auth0
            </Button>


            </Formsy>

            <div className="flex flex-col items-center justify-center pt-32">
                <span className="font-medium">Don't have an account?</span>
                <Link className="font-medium" to="/register">Create an account</Link>
            </div>
        </div>
    );
}

export default JWTLoginTab;
