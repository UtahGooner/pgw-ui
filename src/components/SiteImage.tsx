import React from 'react';
import ResponsiveImage from "./ResponsiveImage";
import classNames from 'classnames';
import {SiteImage} from "../types/sites";


const noop = () => {
};

const SiteImageContainer = ({image, path, imagesPerRow}: {
    image: SiteImage;
    path: string;
    imagesPerRow: number;
}) => {
    const {id, filename, description, attributes, parentImageId, siteId} = image;
    return (
        <div className={classNames("site-image", {'site-image--selected': false})}>
            {/*<div className="hover-selector">*/}
            {/*    <button className="btn btn-sm btn-outline-dark" onClick={() => this.props.onClick(id)}>*/}
            {/*        {selected ? 'zoom out' : 'zoom in'}*/}
            {/*    </button>*/}
            {/*</div>*/}
            <ResponsiveImage path={path} filename={filename} sizes={[400, 800, 2000]}
                             imagesPerRow={imagesPerRow}/>
        </div>
    );
}

export default SiteImageContainer;
