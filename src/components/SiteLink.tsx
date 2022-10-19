import React from 'react';
import {NavLink} from 'react-router-dom';
import {SiteHeader} from "../types/sites";

function SiteLink({site, active}:{
    site:SiteHeader;
    active:boolean;
}) {
    if (active) {
        return (
            <li className="list-group-item active">
                <div>{site.name}</div>
                <div><small>{site.location}</small></div>
            </li>
        )
    }
    const path = `/sites/${encodeURIComponent(site.path)}`;
    return (
        <li className="list-group-item">
            <NavLink to={path}><div>{site.name}</div></NavLink>
            <NavLink to={path}><div><small>{site.location}</small></div></NavLink>
        </li>
    );
}

export default SiteLink;
