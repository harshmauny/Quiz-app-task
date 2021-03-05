import React, { useState } from 'react';
import { SIGN_IN } from '../store/actions/actions';
import '../component_style/register.css';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

function Register() {

    //state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDOB] = useState("");
    const [hobbies, setHobbies] = useState([]);
    const [gender, setGender] = useState("");

    //Redux hooks
    const isLogged = useSelector(state => state.isLogged);
    const Dispatch = useDispatch();



    const onChangeHandler = (e) => {
        const { name, value } = e.currentTarget;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        } else if (name === "mobile") {
            setMobile(value);
        } else if (name === "city") {
            setCity(value);
        } else if (name === "gender") {
            setGender(value);
        } else if (name === "hobbies") {
            setHobbies([...hobbies, value]);
        } else if (name === "dob") {
            setDOB(value);
        }
    }

    const selectCountry = (val) => {
        setCountry(val)
    }

    const selectState = (val) => {
        setState(val)
    }


    const onSubmitHandler = (e, firstName, lastName, password, email, country, state, city, mobile, dob, hobbies, gender) => {
        e.preventDefault();
        const UserDetails = { firstName, lastName, email, password, country, state, city, mobile, dob, hobbies, gender }
        axios.post('/users/register', UserDetails)
            .then(UserInfo => {
                console.log(UserInfo);
                Dispatch(SIGN_IN(UserInfo.data.user_data))
            })
            .catch(err => {
                console.log(err);
            })

    }



    return (
        <div >
            <div className="container">
                {isLogged ?
                    <Redirect to='/' />
                    :
                    <div className="card registerPage">
                        <h3 className="title">Register</h3>
                        <form onSubmit={(e) => onSubmitHandler(e, firstName, lastName, password, email, password, country, state, city, mobile, dob, hobbies, gender)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="firstName" className="form-control" placeholder="First Name" onChange={e => onChangeHandler(e)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="lastName" className="form-control" placeholder="Last Name" onChange={e => onChangeHandler(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={e => onChangeHandler(e)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" onChange={e => onChangeHandler(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="email" name="email" className="form-control" placeholder="Email" onChange={e => onChangeHandler(e)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="mobile" className="form-control" placeholder="Mobile" onChange={e => onChangeHandler(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Gender</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gender" value="Male" id="male" onChange={e => onChangeHandler(e)} />
                                                    <label class="form-check-label" for="male">
                                                        Male
													</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gender" value="Female" id="female" onChange={e => onChangeHandler(e)} />
                                                    <label class="form-check-label" for="female">
                                                        Female
													</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Hobbies</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" name="hobbies" type="checkbox" value="Playing Cricket" id="cricket" onChange={e => onChangeHandler(e)} />
                                                    <label class="form-check-label" for="cricket">
                                                        Playing Cricket
													</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" name="hobbies" type="checkbox" value="Swimming" id="Swimming" onChange={e => onChangeHandler(e)} />
                                                    <label class="form-check-label" for="Swimming">
                                                        Swimming
													</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" name="hobbies" type="checkbox" value="Travelling" id="Travelling" onChange={e => onChangeHandler(e)} />
                                                    <label class="form-check-label" for="Travelling">
                                                        Travelling
													</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date Of Birth</label>
                                        <input type="date" name="dob" className="form-control" onChange={event => onChangeHandler(event)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Display Picture</label>
                                        <input type="file" name="photo" className="form-control" onChange={event => onChangeHandler(event)} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <CountryDropdown className="form-control" value={country} onChange={(val) => selectCountry(val)} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <RegionDropdown className="form-control" country={country} value={state} onChange={(val) => selectState(val)} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input type="text" name="city" className="form-control" placeholder="City" onChange={e => onChangeHandler(e)} />
                                    </div>
                                </div>

                            </div>


                            <div className="register-bottom-text">
                                <small class="form-text "><Link to='/login'>Sign In</Link> or sign up</small>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <button type="reset" class="btn btn-danger" style={{ marginLeft: '1rem' }}>Reset</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    )


}



export default Register;