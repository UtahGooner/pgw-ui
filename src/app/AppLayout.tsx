import React from "react";
import {Helmet} from "react-helmet";
import {siteTitle} from "../utils/helmet";
import TopBar from "../components/TopBar";
import classNames from "classnames";
import Drawer from "../components/Drawer";
import {useSelector} from "react-redux";
import {selectDrawerIsOpen} from "../features/drawer";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
    const isDrawerOpen = useSelector(selectDrawerIsOpen);

    return (
        <div>
            <Helmet>
                <title>{siteTitle('Home')}</title>
            </Helmet>
            <TopBar/>
            <div className={classNames("main", {'drawer--open': isDrawerOpen})}>
                <Drawer/>
                <Outlet/>
            </div>
            <footer id="main-footer">
                @copyright {new Date().getFullYear()} PetroglyphWatch.com
            </footer>
        </div>
    )
}
export default AppLayout;
