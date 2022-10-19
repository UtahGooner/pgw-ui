import React from 'react';

const SiteHeaderImage = ({path, header}) => {
    const sizes = [2000, 800, 400];
    const imagePaths = sizes.map(size =>`/images/${path}/${size}/${header} ${size}w`);
    return (
        <img src={imagePaths[0]} className="site-header img-fluid"
             srcSet={imagePaths.join(',')}
             sizes="(max-width: 400px) 400px,(max-width: 800px) 800px, 2000px"/>
    );
};

export default SiteHeaderImage;