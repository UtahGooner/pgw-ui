import React from 'react';
import {compile} from 'path-to-regexp';
import {URL_SITE_IMAGES} from "../constants/sites";
import useWindowDimensions from "../hooks/windowDimensions";

const ResponsiveImage = ({path, filename, sizes = [125, 400, 800, 2000], imagesPerRow = 4}: {
    path: string;
    filename: string;
    sizes?: number[];
    imagesPerRow: number
}) => {
    const imgSize = sizes[sizes.length - 1];
    const windowDimensions = useWindowDimensions();
    const pathCompiler = compile(URL_SITE_IMAGES);
    return (
        <picture className="img-fluid" data-width={windowDimensions.width} data-height={windowDimensions.height}>
            {sizes
                .map((size, index) => {
                    const media = index < sizes.length - 1
                        ? `(max-width: ${size * imagesPerRow}px)`
                        : `(min-width: ${(size * imagesPerRow) + 1}px`;
                    const srcSet = pathCompiler({path, size, filename});
                    return (
                        <source key={index} media={media} srcSet={srcSet}/>
                    )
                })}
            <img src={pathCompiler({path, size: imgSize, filename})} loading="lazy"/>
        </picture>
    )
}

export default ResponsiveImage;

