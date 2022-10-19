import React from 'react';
import {useSelector} from 'react-redux';
import SiteTitle from "./SiteTitle";
import classNames from 'classnames';
import {selectCurrentSite} from "../features/sites";

const SiteHeader = () => {
    const currentSite = useSelector(selectCurrentSite);

    if (!currentSite) {
        return null;
    }

    return (
        <div className={classNames("site-header__container", {'has-image': !!currentSite.header})}>
            <SiteTitle name={currentSite.name} location={currentSite.location}/>
        </div>
    )
}

export default SiteHeader;
