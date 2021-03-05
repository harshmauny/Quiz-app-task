import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from "react-router-dom";


const Quiz = () => {

    const isLogged = useSelector(state => state.isLogged)


    return (
        <div>
            {isLogged ?
                <>
                    <div className="container">
                        Quiz
                    </div>
                </>
                : <Redirect to='/login' />
            }
        </div>
    )
}

export default Quiz;