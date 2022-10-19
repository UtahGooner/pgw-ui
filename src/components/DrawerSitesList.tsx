import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import SiteLink from "./SiteLink";
import Collapse from "react-bootstrap/Collapse";
import ListToggleIcon from "./ListToggleIcon";
import ListGroupHeader from "./ListGroupHeader";
import {useAppDispatch} from "../app/configureStore";
import {selectSites} from "../features/sites";
import {selectShowSites, toggleShowSites} from "../features/drawer";


const DrawerSitesList = () => {
    const dispatch = useAppDispatch();
    const {site} = useParams<'site'>();
    const sites = useSelector(selectSites);
    const showSites = useSelector(selectShowSites);

    const clickHandler = () => dispatch(toggleShowSites());

    return (
        <Fragment>
            <ListGroupHeader open={showSites}>
                <ListToggleIcon onClick={clickHandler} open={showSites} controls="drawer-sites-list">
                    Sites
                </ListToggleIcon>
            </ListGroupHeader>
            <Collapse in={showSites}>
                <li>
                    <div id="drawer-sites-list" className="collapsible-list">
                        <ul>
                            {sites.map(_site => {
                                return (
                                    <SiteLink key={_site.id} active={_site.path === site} site={_site}/>
                                )
                            })}
                        </ul>
                    </div>
                </li>
            </Collapse>
        </Fragment>
    );
}

export default DrawerSitesList
