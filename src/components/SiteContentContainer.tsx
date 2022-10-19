import React from 'react';
import useWindowDimensions from "../hooks/windowDimensions";
import classNames from "classnames";

const getOptimizedBGWidth = (width: number) => {
    if (width < 400) {
        return 400;
    } else if (width < 800) {
        return 800;
    }
    return 2000;
}
const SiteContentContainer = ({path, header, children}: {
    path: string;
    header?: string;
    children: React.ReactNode;
}) => {
    const windowDimensions = useWindowDimensions();
    const size = getOptimizedBGWidth(windowDimensions.width);
    const bgImage = `/images/${path}/${size}/${header}`;
    const bgStyle = !!header ? {backgroundImage: `url(${bgImage})`} : {};

    return (
        <div className={classNames("site", {'site--has-bg-image': !!header})} style={bgStyle}>
            {children}
        </div>
    );
};

export default SiteContentContainer;
