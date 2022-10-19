import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {selectDrawerIsOpen} from "../features/drawer";
import DrawerBlogEntryList from "./DrawerBlogEntryList";
import DrawerSitesList from "./DrawerSitesList";


const Drawer = () => {
    const isOpen = useSelector(selectDrawerIsOpen);
    const [timer, setTimer] = useState(0);
    const [inTransition, setInTransition] = useState(false);

    useEffect(() => {
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        setInTransition(true);
        const timeout = window.setTimeout(() => {
            setInTransition(false);
        }, 450);
        setTimer(() => timeout);
    }, [isOpen]);

    return (
        <aside className={classNames("drawer", {'drawer--open': isOpen, 'drawer--in-transition': inTransition})}>
            <div className="drawer-content">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <DrawerBlogEntryList />
                    <DrawerSitesList />
                </ul>
            </div>
        </aside>
    )
}
export default Drawer;
