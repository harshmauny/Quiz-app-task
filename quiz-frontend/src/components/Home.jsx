import React, { useEffect, useState } from 'react'
import { SIGN_IN, SIGN_OUT } from '../store/actions/actions';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import '../component_style/Home.css';


const Home = () => {
    //state
    const [Name, setName] = useState('');

    // //redux hooks
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)

    useEffect(() => {
        console.log(isLogged)
        if (isLogged === null) {
            console.log("hello")
            var userdata = localStorage.getItem("user");

            dispatch(SIGN_IN(JSON.parse(userdata)))
        }
        console.log(isLogged)
        getName()
    }, [])

    const signOut = () => {
        localStorage.removeItem("user");
        dispatch(SIGN_OUT())
        // console.log("signed out")
        console.log(isLogged)
    }

    const getName = () => {
        if (Name === '') {
            const username = isLogged.payload.firstName + " " + isLogged.payload.lastName;
            console.log(username)
            setName(username)
        }

    }

    return (
        <div >
            { isLogged ?
                <>
                    <div >

                        <nav class="navbar sticky-top navbar-dark bg-dark">
                            <div class="container-fluid">
                                <a class="navbar-brand">Quiz</a>
                                <Link to="/"><button class="btn btn-outline-success" onClick={() => signOut()}>Logout</button></Link>
                            </div>
                        </nav>
                    </div>
                    <div className="container homePage">
                        <div className="card">
                            <h3>Welcome,{Name} </h3>
                            <Link to='/quiz'><button type="button" class="btn btn-secondary">Start Quiz</button></Link>
                        </div>
                    </div>
                </>
                :
                <Redirect to='/login' />
            }
        </div>
    )


}
export default Home;