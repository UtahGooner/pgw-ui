import React from 'react';
import {useAppDispatch} from "../app/configureStore";
import {toggleDrawerOpen} from "../features/drawer";

export const TopBar = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = false;

    const clickHandler = () => {
        dispatch(toggleDrawerOpen())
    }
    return (
        <div className="top-bar">
            <header>
                <div className="navbar navbar-dark navbar-dirt bg-dirt">
                    <button className="navbar-toggler" onClick={clickHandler}>
                        <span className="navbar-toggler-icon"/>
                    </button>
                </div>
            </header>
        </div>
    )
}

export default TopBar;
