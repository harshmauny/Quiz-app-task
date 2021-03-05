import React, { useEffect, useState } from 'react';
import { SIGN_IN } from '../store/actions/actions';
import '../component_style/login.css';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

function Login() {
    //Redux hooks
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    //state
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();


    const onChangeHandler = (e) => {
        const { name, value } = e.currentTarget;
        if (name === "mobile") {
            setMobile(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    useEffect(() => {
        console.log(isLogged)
    })

    const onSubmitHandler = (e, mobile, password) => {
        e.preventDefault();
        const info = { mobile, password }

        axios.post('/users/login', info)
            .then(userDetails => {
                if (userDetails.data.auth === true) {
                    dispatch(SIGN_IN(userDetails.data.user_data))
                    console.log(isLogged)
                    localStorage.setItem("user", JSON.stringify(userDetails.data.user_data));
                }
            })
            .catch(err => {
                console.log(err);
            })

    }


    return (
        <div className="LoginPage">
            { isLogged ?
                <Redirect to='/' />
                :
                <div className="container">
                    <div className="card">
                        <h3 className="title">Login</h3>
                        <form onSubmit={e => onSubmitHandler(e, mobile, password)}>
                            <div class="form-group">
                                <label for="mobileInput">Mobile</label>
                                <input name="mobile" type="text" class="form-control" id="InputMobile" placeholder="Enter mobile" onChange={e => onChangeHandler(e)} />

                            </div>
                            <div class="form-group">
                                <label for="InputPassword">Password</label>
                                <input name="password" type="password" class="form-control" id="InputPassword" placeholder="Enter Password" onChange={e => onChangeHandler(e)} />
                            </div>
                            <div className="login-bottom-text">
                                <small id="login-bottom-text" class="form-text ">Sign In or <Link to='/register'>sign up</Link></small>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <button type="reset" class="btn btn-danger" style={{ marginLeft: '1rem' }}>Reset</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )


}



export default Login;