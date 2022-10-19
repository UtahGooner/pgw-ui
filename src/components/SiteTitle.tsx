import React from 'react';

const SiteTitle = ({name, location}:{
    name: string;
    location: string;
}) => {
    return (
        <div className="site-title">
            <h1>{name}</h1>
            <div className="site-location">{location}</div>
        </div>
    );
};

export default SiteTitle;
